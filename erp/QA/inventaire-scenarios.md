---
sidebar_position: 5
title: Scénarios inventaire (EB1–EB5)
---

# Scénarios inventaire EB1–EB5

**Compte** : `admin.teste` / `123`  
**Société** : IFO  
**Chaîne de repère** : UFP **NGOKO** → AAC **AAC2026** → VMA **VMA-NG01**

Menu : **Exploitation forestière → Inventaire**.

## Carte des écrans

| ID | Écran | URL hash |
|----|--------|----------|
| INV-00 | Accueil | `/#/lumbering/inventory/database` |
| INV-01 | Situations | `/#/lumbering/inventory/situations` |
| INV-02 | UFP / AAC | `/#/lumbering/inventory/unites-forestieres` |
| INV-03 | VMA / Permis | `/#/lumbering/inventory/code-vma` |
| INV-04 | Parcelles | `/#/lumbering/inventory/plots` |
| INV-05 | Distances X/Y | `/#/lumbering/inventory/distances` |
| INV-06 | Import GTG | `/#/lumbering/inventory/import` |
| INV-07 | Pistage | `/#/lumbering/inventory/trees` |
| INV-08 | Déclassement | `/#/lumbering/inventory/declassement` |
| INV-09 | États | `/#/lumbering/inventory/etats` |

---

## Parcours A — Lecture (données déjà seedées)

Exécuter **dans l’ordre** une première fois.

| Étape | Action QA | Résultat attendu (UX) |
|-------|-----------|------------------------|
| A1 | INV-01 : ouvrir Situations | 9 situations visibles |
| A2 | INV-02 : UFP NGOKO | AAC2026 + AAC2025 listées |
| A3 | INV-03 : AAC2026 → VMA-NG01 | Quotas SAP/SIP/PAD visibles |
| A4 | INV-04 : parcelles AAC2026 | AA01, AA03, AB01 |
| A5 | INV-07 : pistage parcelle AA01 | Arbres 1, 2, 4 ; impasse 3 ; 5 code R ; 6 déclassé |
| A6 | INV-09 : états AAC2026 | Onglets qualités / parcelles / volumes / doublons / impasses |

**Grille vide** : tant que UFP/AAC/VMA ou parcelle non choisis → message d’aide (normal).

---

## Parcours B — Écriture limitée (règles métier)

| ID | Scénario | Étapes | Attendu |
|----|----------|--------|---------|
| **INV-B1** | Unicité situation | Nouveau → code `Nord` | Message rejet doublon |
| **INV-B2** | AAC sans UFP | INV-02 sans sélection UFP | Bouton AAC Nouveau **grisé** |
| **INV-B3** | Quota doublon | Même essence 2× sur VMA-NG01 | Rejet |
| **INV-B4** | Parcelle calculée | Layon `AA` + base `01` | N° parcelle **AA01** auto |
| **INV-B5** | Import GTG | AAC **2025** + fichier CSV démo | Lot → validation → arbres |
| **INV-B6** | Retrouvé pistage | Ajouter arbre R sur parcelle | Ligne visible, n° unique |

### Import GTG (INV-B5)

- **Ne pas** importer sur **AAC2026** (n° forêt déjà pris).
- Fichier : `gtg-demo-aac2025.csv` (repo GestionBois : `docs/USECAS-FORET/samples/`).
- Essences CSV : `SAP`, `SIP`, `PAD`, `OKU` uniquement.

Workflow lot : Importer → ouvrir lot → corriger lignes Erreur → **Valider** (désactivé si erreurs bloquantes).

---

## Données pistage — fiche mémo

| Parcelle | N° forêt | Note recette |
|----------|----------|--------------|
| AA01 | 1, 2, 4 | Impasse sur **3** |
| AA01 | 5 | Code retrouvé **R** |
| AA01 | 6 | Déjà déclassé |
| AB01 | 1, 2 | Doublon n° forêt avec AA01 (états doublons) |

---

## Hors scope inventaire (ne pas tester ici)

- Abattage, étêtage, usine, cubage m³ inventaire (états en **pieds** seulement).
- Chantier fournisseur (autre module).

---

## Lien exploitation

Une fois l’inventaire validé en **lecture**, enchaîner [Scénarios forêt EB6–EB11](./foret-scenarios) sur le **même VMA-NG01**.
