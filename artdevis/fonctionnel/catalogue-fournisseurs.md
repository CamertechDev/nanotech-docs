---
sidebar_position: 6
title: Catalogue et tarifs fournisseurs
description: Référentiel partagé (Super Admin) + tarifs négociés privés (artisan). Prix indicatif pour le devis vocal.
---

# Catalogue et tarifs fournisseurs

> **Statut :** livré sept. 2026 (cockpit Super Admin + CSV) · **Spec code :** dépôt ArtDevis `docs/USECASE-CATALOGUE-FOURNISSEURS.md`

## En une phrase

Le **Super Admin** tient le **catalogue national** (produits, fournisseurs, prix indicatif HT, import CSV). Chaque **artisan Pro** saisit **ses remises négociées** sur ce catalogue. L'IA du devis vocal applique d'abord le tarif artisan, sinon le prix indicatif, sinon **0**. **Personne ne voit les prix d'un autre artisan.**

## Répartition des responsabilités

| Acteur | Fournisseurs et produits | Prix |
| --- | --- | --- |
| **Super Admin** (cockpit) | CRUD + export / import CSV | **Prix indicatif HT** plateforme (public, identique pour tous les fournisseurs) |
| **Artisan (patron, Pro)** | Lecture seule | CRUD **privé** : prix public / négocié / favori (`tarifs_artisan`) |
| **Client final** | — | — |

:::info Deux référentiels, pas un arbre
Un **produit** = un `nom_produit` unique (matching IA). Le même tube chez CEDEO et Point.P est **une** ligne catalogue, éventuellement liée à plusieurs fournisseurs. Ce n'est **pas** un catalogue perso artisan.
:::

## Fonctionnalités livrées

1. **Cockpit Super Admin → Catalogue** : ajout / édition / suppression, groupé par fournisseur, CSV unique
2. **Mes tarifs fournisseurs** (plan Pro) : l'artisan lie un produit du catalogue à un fournisseur et saisit **ses** prix
3. **Devis vocal** : chaîne de prix ci-dessous (jamais d'estimation marché GPT)
4. **Prix Web** (SerpApi) : comparaison au clic sur une ligne matériel, consultation seule — **pas** dans le pipeline vocal

## Chaîne de prix (devis vocal)

| Priorité | Source | Quand |
| --- | --- | --- |
| 1 | Prix **dicté** | « le mitigeur à 80 euros » |
| 2 | **Tarif artisan** B2B | Produit reconnu + tarif configuré (⭐ favori, sinon le plus bas) |
| 3 | **Prix indicatif HT** du produit catalogue | Saisi par le Super Admin, même montant pour tous les fournisseurs |
| 4 | **0 €** | Rien de tout ça — l'artisan complète dans le brouillon |

## CSV unique (Super Admin)

UTF-8, virgule, ligne d'en-tête obligatoire :

```text
fournisseur,nom_produit,categorie,prix_indicatif_ht
CEDEO,Tube PER 16 mm,Canalisation,12
Point.P,Tube PER 16 mm,Canalisation,12
CEDEO,Chauffe-eau électrique 200L,Chauffage,450
```

| Règle | Détail |
| --- | --- |
| Catégories | Chauffage, Robinetterie, Canalisation, Sanitaire |
| `fournisseur` vide | Upsert du **produit seul** (pas de lien) |
| Même produit, deux fournisseurs | **Une** ligne produit, deux liens |
| Prix indicatif différent sur le même nom | **Premier prix conservé** + avertissement (pas de doublon produit) |
| Import | **Upsert seulement** — jamais de suppression automatique |
| Export | Une ligne par lien + les produits sans fournisseur (colonne vide) |

## Où agir dans l'app

| Qui | Écran |
| --- | --- |
| Super Admin | Cockpit → carte **Catalogue produits** (ou icône inventaire) |
| Artisan Pro | Clients → 🏷️, ou Profil → **Mes tarifs fournisseurs** |

Voir le mode d'emploi cockpit : [Cockpit Super Admin](./cockpit-admin).

## Modèle de données

| Table | Rôle | Écriture |
| --- | --- | --- |
| `fournisseurs` | Référentiel global | Super Admin (`is_super_admin()`) |
| `materiaux_catalogue` | Produits + `prix_indicatif_ht` | Super Admin |
| `catalogue_fournisseur_produits` | Liens produit ↔ fournisseur | Super Admin |
| `tarifs_artisan` | Prix négociés privés | Artisan (RLS `artisan_id`) |

Migration : `supabase/migrations/20260908_admin_catalogue.sql`.

## Pain points encore ouverts

| Besoin artisan | État |
| --- | --- |
| Ajouter **son** fournisseur / produit perso (invisible des autres) | Non — scénario hybride Phase 2 |
| Importer **sa** grille Excel de tarifs négociés | Non (le CSV actuel est **admin / catalogue national**) |
| OCR PDF représentant | Phase 2 |
| Partager ses tarifs avec son technicien | Phase 2b |
| Enregistrer le prix Web sur la ligne de devis | Non |

## Test rapide

| Rôle | Compte mock | Parcours |
| --- | --- | --- |
| Super Admin | `admin@artdevis.fr` / `admin123` | Catalogue → exporter CSV → modifier un prix → réimporter → rapport (créés / maj / liens / erreurs) |
| Artisan Pro | `pro@plomberie.fr` / `password123` | Mes tarifs → lier un produit du catalogue → devis vocal → vérifier le prix |

## Documents liés

* [Cockpit Super Admin](./cockpit-admin)
* [Devis vocal](./devis-vocal)
* [Guide QA tarifs artisan](/artdevis/qa/guides/tarifs-fournisseurs)
* [Guide QA catalogue admin](/artdevis/qa/guides/catalogue-admin)
