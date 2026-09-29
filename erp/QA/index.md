---
sidebar_position: 1
title: Pack recette IFO — vue d'ensemble
---

# Pack recette IFO — inventaire et forêt

Ce pack s’adresse aux **testeurs QA** qui n’ont pas d’expérience en exploitation forestière. L’objectif n’est pas de « jouer au forestier », mais de **valider l’expérience utilisateur** : navigation, filtres, messages, grilles, feuilles de terrain, droits par profil.

## Ce que vous testez

| Couche | Contenu | Fiches |
|--------|---------|--------|
| **0 — Environnement** | API, Angular, PostgreSQL, seeds | [Environnement et comptes](./environnement-comptes) |
| **1 — Référentiel** | Catalogues partagés (essences, opérateurs, parcs…) | [Référentiel et jeux de données](./referentiel-donnees) |
| **2 — Inventaire EB1–EB5** | Chaîne Ngoko 2026 (pistage, GTG, états) | [Scénarios inventaire](./inventaire-scenarios) |
| **3 — Forêt EB6–EB11** | Feuilles FOR0002→FOR0008 sur le même VMA | [Scénarios exploitation forêt](./foret-scenarios) |

## Repère unique (à retenir)

Toute la recette forêt s’appuie sur **une même histoire géographique** :

```text
Société IFO → UFP NGOKO (Nord) → AAC AAC2026 → permis VMA-NG01
```

Ne mélangez pas avec **Interholco AG** ni avec le groupe **MKD** sauf scénarios **tenancy** (isolation des données).

## Deux parcours par module

| Parcours | Qui | But |
|----------|-----|-----|
| **Lecture (A)** | Tous | Données déjà seedées visibles, filtres, grilles vides quand il manque un prérequis |
| **Écriture limitée (B)** | Chef de bureau (`admin.teste`) | 1–2 actions guidées (doublon, import GTG sur AAC2025, nouvelle feuille…) |

**Interdit en recette standard** : supprimer le jeu démo, ré-importer GTG sur **AAC2026**, vider la base.

## Glossaire rapide

Voir [Glossaire QA forêt](./glossaire-qa) (10 termes suffisent pour tenir une semaine de recette). Définitions métier complètes : [Glossaire Business](../Business/glossary).

## Rapport de recette

Modèle de compte-rendu : [Checklist et rapport](./rapport-checklist).

## Sources techniques (repo développement)

Les seeds SQL et guides PO détaillés vivent dans le repo **GestionBois** (backend) :

- `docs/USECASE-FORET-INVENTAIRE.md`
- `docs/USECASE-FORET-EXPLOITATION-EB6-EB8.md`
- `docs/USECAS-SECURITY/P2-tenancy-seed-qa.md`
- Scripts `src/GestionBois.Database/Scripts/Seed/010` … `023`

Ce site Docusaurus reste la **vue QA** ; le repo code reste la **source des jeux de données**.
