---
sidebar_position: 5
title: Tarifs fournisseurs
description: Configurer les prix négociés par produit et fournisseur (plan Pro, par artisan).
---

## Objectif

L'artisan enregistre **ses remises négociées** (CEDEO, Point.P, etc.) sur des **produits du catalogue plateforme**. L'IA du devis vocal applique ces tarifs lors de la dictée.

:::warning Plan requis et périmètre
* Plan **Professionnel (Pro)** obligatoire
* Tarifs **par artisan**, pas par client
* Catalogue produits/fournisseurs **tenu par le Super Admin** (CSV) — l'artisan **choisit** dans la liste, il ne la crée pas
:::

## Accès

| Entrée | Chemin |
| --- | --- |
| Depuis Clients | Icône **tarifs** (🏷️) dans l'en-tête |
| Depuis Profil | **Mes tarifs fournisseurs** |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/tarifs-liste.png`
:::


## Liste Mes tarifs

* Recherche par nom produit ou fournisseur
* Carte : produit, fournisseur, prix public HT, prix négocié HT, étoile favori
* Actions : modifier, basculer favori, supprimer

## Formulaire tarif (ajout / édition)

| Champ | Obligatoire | Règle |
| --- | --- | --- |
| **Produit** | Oui | Sélection dans la liste (`materiaux_catalogue`) |
| **Fournisseur** | Oui | Sélection dans la liste (`fournisseurs`) |
| **Prix public HT (€)** | Oui | ≥ 0 |
| **Prix négocié HT (€)** | Oui | ≥ 0 et **≤ prix public** |
| **Fournisseur favori** | Non | Priorité pour l'IA devis vocal |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/tarifs-form.png`
:::


## Exemple de saisie QA

| Champ | Valeur |
| --- | --- |
| Produit | `Chauffe-eau 200L vertical` (selon catalogue) |
| Fournisseur | `CEDEO` ou `Point.P` |
| Prix public HT | `450.00` |
| Prix négocié HT | `380.00` |
| Favori | Oui |

## Lien avec le devis vocal

1. L'artisan configure ses tarifs ici
2. Lors d'une dictée, l'Edge Function `devis-vocal` injecte jusqu'à **20 tarifs**
3. Sans tarif configuré : **prix indicatif** catalogue si renseigné, sinon **0**

Voir aussi : [Catalogue et tarifs fournisseurs](/artdevis/fonctionnel/catalogue-fournisseurs) · [Catalogue Super Admin](/artdevis/qa/guides/catalogue-admin)

## Limites MVP (ne pas tester comme bug)

| Besoin terrain | État |
| --- | --- |
| Ajouter un fournisseur / produit **perso** (privé) | Non disponible |
| Enrichir le catalogue **national** | Super Admin — [guide](/artdevis/qa/guides/catalogue-admin) |
| Importer **sa** grille Excel de tarifs négociés | Phase 2 |
| Tarif différent par client | Non, toujours par artisan |

## Cas de test liés

Campagne : [TC-TAR-001 à TC-TAR-005](/artdevis/qa/campagnes/2026-08-release-r2b#phase-4--tarifs-fournisseurs)

## Erreurs fréquentes

| Symptôme | Cause probable |
| --- | --- |
| Produit absent de la liste | Demander au Super Admin d'enrichir le catalogue (CSV) |
| Prix négocié refusé | Supérieur au prix public |
| Tarifs non appliqués au devis | Mock vocal, ou produit non reconnu par l'IA |
