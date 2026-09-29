---
sidebar_position: 7
title: Cockpit Super Admin
description: KPI SaaS, parc artisans, et catalogue produits (CRUD + CSV).
---

# Cockpit Super Admin

> **Statut :** livré · **Accès :** `artisan.role = super_admin` (mock : `admin@artdevis.fr` / `admin123`)

## En une phrase

Le Super Admin pilote le **parc artisans** (plans, suspension) et le **catalogue national** (produits, fournisseurs, prix indicatif, CSV) — **sans** voir les tarifs négociés privés des artisans.

## Accès

Après connexion Super Admin, l'app ouvre le cockpit (pas l'accueil artisan).

| Entrée | Action |
| --- | --- |
| En-tête | Icône inventaire → **Catalogue** |
| Corps du dashboard | Carte **Catalogue produits** |
| Déconnexion | Icône logout (inchangée) |

## Parc artisans (existant)

* KPI SaaS (MRR, artisans payants, essais, usage IA)
* Configuration durée d'essai, tarifs d'abonnement, **email support** (mailto artisans)
* Liste filtrable (plan, suspendus, recherche)
* Suspendre / réactiver, changer de plan, inspection support
* Purge des essais inactifs

## Configuration SaaS

Carte **⚙️ Configuration SaaS** sur le dashboard :

| Champ | Effet |
| --- | --- |
| Essai (jours) | Durée offerte aux nouvelles inscriptions |
| Base / Pro (€/mois) | Prix affichés sur le web (pas sur iOS/Android) |
| **Email support (mailto artisans)** | Adresse utilisée par **Contacter le support** (Checkout web + feuille stores). Défaut : `contact@artdevis.fr`. |

Sans la migration `20260909_platform_settings_email_support.sql`, lecture/écriture de cet email échoue en prod.

:::warning Déploiement
Appliquer `supabase db push` (ou la migration SQL) avant de changer l'email en production.
:::

## Catalogue produits (sept. 2026)

Écran groupé **par fournisseur** (ex. CEDEO (n)), plus un groupe **Sans fournisseur**.

| Action | Détail |
| --- | --- |
| **+ Fournisseur** | Nom unique (insensible à la casse) |
| **+ Produit** | Nom, catégorie, prix indicatif HT optionnel, fournisseur optionnel (lien) |
| Modifier | Nom, catégorie, prix indicatif |
| Retirer le lien | Le produit reste au catalogue (groupe Sans fournisseur si plus aucun lien) |
| Supprimer produit / fournisseur | Bloqué s'il est utilisé dans un **`tarifs_artisan`** |
| **Exporter CSV** | Catalogue actuel (une ligne par lien + orphelins) |
| **Importer CSV** | Upsert uniquement — rapport : créés, mis à jour, liens, erreurs (n° de ligne) |
| **Modèle vide** | Fichier d'exemple à remplir |

Règles CSV et chaîne de prix : [Catalogue et tarifs fournisseurs](./catalogue-fournisseurs).

:::warning Déploiement
Sans `supabase db push` (migration `20260908_admin_catalogue.sql`), l'écran ne peut pas écrire en prod. Sans redéploiement de `devis-vocal`, le prix indicatif n'est pas injecté dans le prompt.
:::

## Ce que le Super Admin ne fait pas

| Item | Pourquoi |
| --- | --- |
| Voir / éditer les **tarifs négociés** d'un artisan | Données privées (RLS) |
| Lancer SerpApi depuis le vocal | Toujours le bouton **Voir les prix en ligne** côté artisan |
| Supprimer des produits via l'import CSV | Éviter d'effacer un référentiel par erreur |

## Technique (résumé)

| Élément | Détail |
| --- | --- |
| Pages | `AdminDashboardPage`, `AdminCataloguePage` |
| Contrats | `AdminRepository`, `AdminCatalogueRepository` (Supabase + mock) |
| RLS écriture catalogue | `public.is_super_admin()` |
| Feature Flutter | `lib/features/admin/` |

## Test rapide (mock, 5 min)

1. `flutter run -d chrome --dart-define=USE_MOCK=true`
2. `admin@artdevis.fr` / `admin123`
3. Ouvrir **Catalogue produits**
4. Ajouter un produit « Tube PER 20 mm », catégorie Canalisation, prix 14, fournisseur CEDEO
5. Exporter CSV → vérifier la ligne
6. Tenter de supprimer le chauffe-eau seedé (mock : bloqué, tarifs artisan)

Guide pas à pas : [Catalogue admin (QA)](/artdevis/qa/guides/catalogue-admin).
