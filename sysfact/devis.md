---
sidebar_position: 9
title: Devis (Cycle de vie & Archivage)
---

### 8.1 Présentation & Gains

**Objectif** : Permettre la création, le suivi, et l'archivage de devis (offres commerciales) indépendamment des factures. Un devis suit un cycle de vie complet de Brouillon jusqu'à Accepté/Refusé/Expiré, et peut être archivé pour désencombrer la liste active sans suppression.

| Gain | Détail |
| --- | --- |
| Cycle de vie traçable | 6 statuts distincts avec transitions contrôlées — aucune transition invalide possible |
| Archivage non destructif | Masquage des devis anciens sans perte de données — restaurable à tout moment |
| Conversion vers facture | Un devis Accepté peut être converti en facture (lien traçable) |
| Séparation Brouillon / Actifs / Archives | Trois vues distinctes dans l'interface — liste propre, navigation rapide |

### 8.2 Cycle de vie des Devis

> **Statuts** : `15001` Brouillon · `15002` Envoyé · `15003` Accepté · `15004` Refusé · `15005` Expiré  
> `IsArchive = true` = Archivé (flag orthogonal au statut, sur tout statut non-supprimé)

```mermaid
stateDiagram-v2
    direction LR

    [*] --> Brouillon : POST /operations/devis\n(numéro auto-généré)

    Brouillon --> Envoyé : PUT /operations/devis/{id}/envoyer
    Envoyé --> Accepté : PUT /operations/devis/{id}/accepter
    Envoyé --> Refusé  : PUT /operations/devis/{id}/refuser
    Envoyé --> Expiré  : PUT /operations/devis/{id}/expirer
    Brouillon --> Expiré : PUT /operations/devis/{id}/expirer

    Accepté --> [*] : (terminal — converti en facture)
    Refusé  --> [*]
    Expiré  --> [*]

    state Archivage <<fork>>
    Brouillon --> Archivage
    Envoyé    --> Archivage
    Refusé    --> Archivage
    Expiré    --> Archivage

    Archivage --> Archivé : PUT /operations/devis/{id}/archiver\n(IsArchive = true)
    Archivé --> Brouillon : PUT /operations/devis/{id}/restaurer\n(IsArchive = false)

    note right of Accepté
        Seul statut non archivable.
        Transition vers facture possible.
    end note
```

### 8.3 Cas d'utilisation

```mermaid
flowchart TD
    Commercial(["👤 Commercial"])
    Comptable(["👤 Comptable"])

    UC1["Créer un devis"]
    UC2["Modifier un devis\n(brouillon uniquement)"]
    UC3["Envoyer un devis"]
    UC4["Marquer Accepté / Refusé"]
    UC5["Marquer Expiré"]
    UC6["Archiver un devis"]
    UC7["Restaurer un devis archivé"]
    UC8["Consulter la liste des devis\n(Actifs / Archives)"]
    UC9["Supprimer (soft-delete)"]

    INC1(["✦ Vérifier statut éligible\nà la transition"])
    INC2(["✦ Recalculer montants\n(HT · TVA · TTC)"])

    Commercial --> UC1
    Commercial --> UC2
    Commercial --> UC3
    Comptable  --> UC4
    Comptable  --> UC5
    Commercial --> UC6
    Commercial --> UC7
    Commercial --> UC8
    Comptable  --> UC9

    UC1 -.->|«include»| INC2
    UC2 -.->|«include»| INC2
    UC3 & UC4 & UC5 & UC6 & UC7 -.->|«include»| INC1

    style INC1 fill:#f0f0f0,stroke:#999
    style INC2 fill:#f0f0f0,stroke:#999
```

### 8.4 Diagramme de séquence — Archivage / Restauration

```mermaid
sequenceDiagram
    actor U as Commercial
    participant FE as Frontend (DevisListPage)
    participant API as Backend API
    participant DB as Base de données

    U->>FE: Clic "Archiver" sur devis D-2025-007
    FE->>API: PUT /operations/devis/{id}/archiver
    API->>DB: SELECT Devis WHERE Id = {id}
    DB-->>API: Devis (statut=Envoyé, IsArchive=false, EstSupprime=false)
    API->>API: Devis.Archiver(userUpdate)\n→ IsArchive = true
    API->>DB: UPDATE Devis SET IsArchive=1
    DB-->>API: OK
    API-->>FE: 204 No Content
    FE-->>U: Devis disparaît de l'onglet "Actifs"\n→ visible dans "Archives"

    U->>FE: Onglet "Archives" → clic "Restaurer"
    FE->>API: PUT /operations/devis/{id}/restaurer
    API->>DB: SELECT Devis WHERE Id = {id}
    DB-->>API: Devis (IsArchive=true)
    API->>API: Devis.Restaurer(userUpdate)\n→ IsArchive = false
    API->>DB: UPDATE Devis SET IsArchive=0
    API-->>FE: 204 No Content
    FE-->>U: Devis revient dans l'onglet "Actifs"
```

### 8.5 Scénarios de test

#### ✅ SC-DEV-01 — Création et cycle de vie nominal

| | |
| --- | --- |
| **Étapes** | 1. `POST /operations/devis` → statut=Brouillon (15001) 2. `PUT /{id}/envoyer` → Envoyé (15002) 3. `PUT /{id}/accepter` → Accepté (15003) |
| **Résultats attendus** | HTTP 201 puis 204×2 · Chaque statut enregistré en DB · `DateModification` mis à jour |

#### ✅ SC-DEV-02 — Archivage et filtrage

| | |
| --- | --- |
| **Pré-condition** | Devis D-001, statut=Envoyé, `IsArchive=false` |
| **Étapes** | 1. `PUT /operations/devis/{id}/archiver` 2. `GET /operations/devis?isArchive=false` 3. `GET /operations/devis?isArchive=true` |
| **Résultats attendus** | Étape 1 : HTTP 204 · Étape 2 : D-001 absent · Étape 3 : D-001 présent |

#### ❌ SC-DEV-03 — Archivage d'un devis Accepté

| | |
| --- | --- |
| **Pré-condition** | Devis statut=Accepté (15003) |
| **Étapes** | `PUT /operations/devis/{id}/archiver` |
| **Résultats attendus** | HTTP 400 — `"Un devis accepté ne peut pas être archivé."` |

#### ✅ SC-DEV-04 — Idempotence archivage

| | |
| --- | --- |
| **Étapes** | Appeler `archiver` deux fois sur le même devis |
| **Résultats attendus** | HTTP 204 les deux fois — pas d'erreur |

#### ❌ SC-DEV-05 — Transition invalide

| | |
| --- | --- |
| **Pré-condition** | Devis statut=Brouillon (15001) |
| **Étapes** | `PUT /operations/devis/{id}/accepter` (Brouillon → Accepté sans passer par Envoyé) |
| **Résultats attendus** | HTTP 400 — transition non autorisée |

---