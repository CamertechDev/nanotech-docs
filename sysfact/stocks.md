---
sidebar_position: 10
title: Module Stocks
---

### 9.1 Présentation & Gains

**Objectif** : Gérer un catalogue d'articles physiques (distinct des Produits de facturation), suivre les entrées/sorties manuelles de stock, et réaliser des inventaires périodiques avec régularisation automatique.

| Gain | Détail |
| --- | --- |
| Séparation Articles / Produits | Articles = stock physique géré manuellement. Produits = catalogue facturation. Deux référentiels indépendants. |
| Stock en temps réel | `StockActuel` mis à jour atomiquement à chaque mouvement — lecture instantanée sans agrégation |
| Alerte stock minimum | Indicateur visuel `TrendingDown` quand `StockActuel ≤ StockMinimum` |
| Inventaire avec régularisation | Validation de l'inventaire crée automatiquement les mouvements de régularisation pour chaque écart |
| Traçabilité complète | Tout changement de stock passe par un `MouvementStock` — historique immuable |

### 9.2 Entités du module

```mermaid
erDiagram
    ARTICLE {
        int Id PK
        int CompanyId
        string Reference UK
        string Libelle
        string UniteMesure
        decimal PrixAchat
        decimal PrixVente
        decimal StockActuel
        decimal StockMinimum
        bool IsActif
        bool EstSupprime
    }

    MOUVEMENT_STOCK {
        int Id PK
        int CompanyId
        int ArticleId FK
        string ArticleLabel
        int TypeMouvement "1=Entrée 2=Sortie"
        decimal Quantite
        decimal PrixUnitaire
        decimal MontantTotal
        datetime DateMouvement
        string Reference
        string Motif
    }

    INVENTAIRE {
        int Id PK
        int CompanyId
        int StatutId "18001=Brouillon 18002=Validé"
        date DateInventaire
        string Notes
    }

    LIGNE_INVENTAIRE {
        int Id PK
        int InventaireId FK
        int ArticleId FK
        string ArticleLabel
        string ArticleRef
        decimal StockTheorique "snapshot au moment de l'ajout"
        decimal StockReel "saisi manuellement"
        decimal Ecart "computed: StockReel - StockTheorique"
    }

    ARTICLE ||--o{ MOUVEMENT_STOCK : "génère"
    INVENTAIRE ||--o{ LIGNE_INVENTAIRE : "contient"
    ARTICLE ||--o{ LIGNE_INVENTAIRE : "référencé dans"
```

### 9.3 Cycle de vie de l'Inventaire

```mermaid
stateDiagram-v2
    direction LR

    [*] --> Brouillon : POST /stocks/inventaires\n(dateInventaire = today)

    Brouillon --> Brouillon : POST /{id}/lignes\n(ajout articles)\nPUT /{id}/lignes/{lid}\n(saisie StockReel)

    Brouillon --> Validé : POST /stocks/inventaires/{id}/valider\n→ crée MouvementStock de régularisation\npour chaque ligne avec Ecart ≠ 0

    Validé --> [*]

    note right of Validé
        Pour chaque ligne avec Ecart ≠ 0 :
        - Ecart > 0 → MouvementStock Entrée
        - Ecart < 0 → MouvementStock Sortie
        StockActuel de l'article mis à jour.
    end note
```

### 9.4 Diagramme de séquence — Inventaire complet

```mermaid
sequenceDiagram
    actor G as Gestionnaire stock
    participant FE as Frontend
    participant API as Backend API
    participant DB as Base de données

    G->>FE: Clic "Nouvel inventaire"
    FE->>API: POST /stocks/inventaires\n{ dateInventaire: "2025-06-01" }
    API->>DB: INSERT Inventaire (statut=18001)
    DB-->>API: { id: 42 }
    API-->>FE: 201 Created
    FE-->>G: Navigue vers InventaireFormPage (id=42)

    loop Pour chaque article à compter
        G->>FE: Sélectionne article dans le Select
        FE->>API: POST /stocks/inventaires/42/lignes\n{ inventaireId:42, articleId:7 }
        API->>DB: SELECT Article WHERE id=7\n→ snapshot StockActuel → StockTheorique
        API->>DB: INSERT LigneInventaire\n(StockTheorique=X, StockReel=X, Ecart=0)
        DB-->>API: { id: ligne }
        API-->>FE: 201 Created
        FE-->>G: Ligne apparaît dans le tableau

        G->>FE: Saisit StockReel dans la cellule
        FE->>API: PUT /stocks/inventaires/42/lignes/{lid}\n{ stockReel: 47.5 } (onBlur)
        API->>DB: UPDATE LigneInventaire SET StockReel=47.5
        API-->>FE: 204 No Content
        FE-->>G: Écart mis à jour (rouge ou vert)
    end

    G->>FE: Clic "Valider l'inventaire"
    FE->>API: POST /stocks/inventaires/42/valider
    API->>DB: SELECT LignesInventaire WHERE InventaireId=42
    loop Pour chaque ligne avec Ecart ≠ 0
        API->>DB: INSERT MouvementStock\n(type=Entrée si ecart>0, Sortie sinon)
        API->>DB: UPDATE Article SET StockActuel = StockActuel + Ecart
    end
    API->>DB: UPDATE Inventaire SET StatutId=18002
    DB-->>API: OK
    API-->>FE: 204 No Content
    FE-->>G: Navigue vers liste inventaires\n✅ "Mouvements de régularisation créés"
```

### 9.5 Cas d'utilisation

```mermaid
flowchart TD
    Gestionnaire(["👤 Gestionnaire stock"])
    Admin(["👤 Administrateur"])

    UC1["Créer / modifier un article"]
    UC2["Consulter le stock actuel\n(liste articles)"]
    UC3["Enregistrer une entrée de stock"]
    UC4["Enregistrer une sortie de stock"]
    UC5["Consulter l'historique\ndes mouvements"]
    UC6["Créer un inventaire"]
    UC7["Ajouter des articles\nà l'inventaire"]
    UC8["Saisir les stocks réels"]
    UC9["Valider l'inventaire\n(régularisation auto)"]
    UC10["Supprimer un article\n(soft-delete)"]

    INC1(["✦ Vérifier stock suffisant\n(Sortie : StockActuel ≥ Quantité)"])
    INC2(["✦ Mettre à jour StockActuel\nde manière atomique"])
    INC3(["✦ Créer MouvementStock\nde régularisation"])

    Gestionnaire --> UC1
    Gestionnaire --> UC2
    Gestionnaire --> UC3
    Gestionnaire --> UC4
    Gestionnaire --> UC5
    Gestionnaire --> UC6
    Gestionnaire --> UC7
    Gestionnaire --> UC8
    Gestionnaire --> UC9
    Admin --> UC10

    UC3 & UC4 -.->|«include»| INC1
    UC3 & UC4 -.->|«include»| INC2
    UC9 -.->|«include»| INC3
    INC3 -.->|«include»| INC2

    style INC1 fill:#f0f0f0,stroke:#999
    style INC2 fill:#f0f0f0,stroke:#999
    style INC3 fill:#f0f0f0,stroke:#999
```

### 9.6 Scénarios de test

#### ✅ SC-STK-01 — Entrée de stock nominale

| | |
| --- | --- |
| **Pré-condition** | Article A-001 existe, `StockActuel = 10.00` |
| **Étapes** | `POST /stocks/mouvements` `{ articleId: 1, typeMouvement: 1, quantite: 5, prixUnitaire: 100 }` |
| **Résultats attendus** | HTTP 201 · `MontantTotal = 500` · `StockActuel(A-001) = 15.00` |

#### ❌ SC-STK-02 — Sortie stock insuffisant

| | |
| --- | --- |
| **Pré-condition** | Article A-001, `StockActuel = 3.00` |
| **Étapes** | `POST /stocks/mouvements` `{ typeMouvement: 2, quantite: 5 }` |
| **Résultats attendus** | HTTP 400 — `"Stock insuffisant : stock actuel 3, demandé 5"` |

#### ✅ SC-STK-03 — Inventaire avec régularisation

| | |
| --- | --- |
| **Pré-condition** | Article A-001 `StockActuel=10`, Article A-002 `StockActuel=20` |
| **Étapes** | 1. Créer inventaire 2. Ajouter A-001 (StockTheorique snap=10) et A-002 (snap=20) 3. Saisir StockReel=8 pour A-001, StockReel=20 pour A-002 4. Valider |
| **Résultats attendus** | 1 mouvement Sortie créé pour A-001 (quantite=2) · Aucun mouvement pour A-002 · `StockActuel(A-001)=8` · Inventaire statut=18002 |

#### ❌ SC-STK-04 — Valider un inventaire déjà validé

| | |
| --- | --- |
| **Pré-condition** | Inventaire `StatutId=18002` (Validé) |
| **Étapes** | `POST /stocks/inventaires/{id}/valider` |
| **Résultats attendus** | HTTP 400 — `"L'inventaire est déjà validé."` |

#### ✅ SC-STK-05 — Alerte stock minimum

| | |
| --- | --- |
| **Pré-condition** | Article A-001, `StockActuel=5`, `StockMinimum=10` |
| **Étapes** | `GET /stocks/articles?companyId=1` |
| **Résultats attendus** | HTTP 200 · Article retourné avec `stockActuel=5`, `stockMinimum=10` · Frontend affiche indicateur rouge `TrendingDown` |

#### ✅ SC-STK-06 — Article unique par référence dans la company

| | |
| --- | --- |
| **Étapes** | Créer deux articles avec la même `reference` pour le même `companyId` |
| **Résultats attendus** | HTTP 400 sur le second — contrainte d'unicité (CompanyId, Reference) |

---

---