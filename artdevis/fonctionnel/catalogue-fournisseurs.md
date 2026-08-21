---
sidebar_position: 5
title: Catalogue et tarifs fournisseurs
---

## En une phrase

Chaque artisan saisit **ses remises négociées** en choisissant un **produit** et un **fournisseur** dans des **listes prédéfinies**. L'IA les applique au devis vocal. **Personne d'autre ne voit ses prix.**

## Répartition des responsabilités (MVP)

| Acteur | Fournisseurs et produits | Prix négociés |
| --- | --- | --- |
| **Plateforme ArtDevis** | Liste fixe (seeds SQL : Point.P, CEDEO, ~8 produits) | — |
| **Super-admin** | Pas d'écran catalogue | — |
| **Artisan (patron)** | Lecture seule | CRUD privé (RLS) |
| **Client final** | — | — |

:::warning Conséquence terrain
Si le produit ou le fournisseur n'est **pas dans la liste**, l'artisan ne peut pas enregistrer de tarif négocié aujourd'hui.
:::

## Fonctionnalités livrées

1. **Mes tarifs fournisseurs** (plan Pro) : ajout prix public, prix négocié, fournisseur favori
2. **Devis vocal** : l'IA applique automatiquement les tarifs de l'artisan
3. **Prix Web** (SerpApi) : comparaison au clic sur une ligne matériel, consultation seule
4. **Sans tarif configuré** : l'application fonctionne avec des prix génériques

## Pain points terrain

| Besoin artisan | État |
| --- | --- |
| Ajouter son fournisseur local | Non disponible |
| Ajouter son produit absent du catalogue | Non disponible |
| Importer une grille PDF/Excel du représentant | Non disponible |
| Partager ses tarifs avec son technicien | Phase 2b |
| Enregistrer le prix Web sur la ligne de devis | Non disponible |

Aujourd'hui, une grille fournisseur PDF implique une **saisie manuelle** ligne par ligne, uniquement pour les produits déjà référencés.

## Scénarios d'évolution

### Scénario A — Centralisé (actuel)

Seule ArtDevis enrichit le catalogue. Les artisans gèrent uniquement leurs tarifs. Simple à maintenir, mais frustrant si produit ou fournisseur absent.

### Scénario B — Hybride (recommandé)

Catalogue national géré par la plateforme, plus **fournisseurs et produits personnels** par artisan, visibles uniquement par lui. Autonomie terrain sans pollution du référentiel global.

### Scénario C — Import grille

Import **Excel/CSV** (priorité P0), puis **OCR PDF** (Phase 2) pour remplir les tarifs en masse.

## Modèle de données

| Table | Rôle |
| --- | --- |
| `fournisseurs` | Référentiel global |
| `materiaux_catalogue` | Produits prédéfinis |
| `tarifs_artisan` | Prix public, prix négocié, favori, RLS par `artisan_id` |

## Lien avec le devis vocal

L'Edge Function `devis-vocal` reçoit jusqu'à **20 tarifs** de l'artisan et tente un matching sémantique avec la dictée. En cas d'échec de matching, un prix marché générique est proposé, le flux continue.

## Décisions produit suggérées

* Valider le scénario B (hybride) pour la prochaine itération ?
* Prioriser l'import CSV avant l'OCR PDF ?
* Étendre le catalogue national avec quels fournisseurs régionaux ?
