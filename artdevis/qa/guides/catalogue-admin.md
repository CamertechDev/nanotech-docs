---
sidebar_position: 12
title: Catalogue Super Admin
description: Enrichir le référentiel partagé (CRUD, export / import CSV) depuis le cockpit.
---

## Objectif

Le Super Admin **tient le catalogue national** (produits, fournisseurs, prix indicatif HT) pour que les artisans Pro puissent y accrocher **leurs** tarifs, et pour que le devis vocal ait un prix de repli.

:::info Compte
Mock : `admin@artdevis.fr` / `admin123`. En prod : un compte `role = super_admin`.
:::

## Accès

| Entrée | Chemin |
| --- | --- |
| Dashboard Super Admin | Carte **Catalogue produits** |
| En-tête navy | Icône inventaire (à gauche de la déconnexion) |

Spec : [Cockpit Super Admin](/artdevis/fonctionnel/cockpit-admin) · [Catalogue et tarifs](/artdevis/fonctionnel/catalogue-fournisseurs)

## Liste groupée

* Un panneau par fournisseur : `CEDEO (n)`
* Groupe **Sans fournisseur** pour les produits non liés
* Recherche : nom produit, catégorie, fournisseur

## Ajouter / modifier

| Action | Champs |
| --- | --- |
| Fournisseur | Nom |
| Produit | Nom, catégorie (liste), prix indicatif HT (optionnel), fournisseur (à la création) |

Catégories : **Chauffage**, **Robinetterie**, **Canalisation**, **Sanitaire**.

## CSV

Colonnes : `fournisseur,nom_produit,categorie,prix_indicatif_ht`

* UTF-8, **virgule** (pas le `;` d'Excel FR — enregistrer en CSV UTF-8 ou quoter les prix `12,5`)
* Import = **ajout / mise à jour**, jamais de suppression
* Rapport snackbar : N créés, M maj, liens, erreurs de ligne
* Deux lignes même produit / prix différents → **un** produit, premier prix, avertissement

Boutons : **Exporter CSV**, **Importer CSV**, **Modèle vide**.

## Suppressions (gardes)

| Cible | Si des `tarifs_artisan` existent | Sinon |
| --- | --- | --- |
| Produit | Message de blocage, pas de delete | Supprimé + liens |
| Fournisseur | Idem | Supprimé + liens |
| Lien seulement | Toujours OK | Le produit reste |

En mock, le chauffe-eau (`mat1`) et Point.P (`f1`) sont volontairement protégés.

## Cas de test suggérés

| Id | Étapes | Attendu |
| --- | --- | --- |
| TC-ADM-CAT-001 | Connexion Super Admin → carte Catalogue | Écran groupé, seeds visibles |
| TC-ADM-CAT-002 | + Produit lié à CEDEO | Apparaît sous CEDEO |
| TC-ADM-CAT-003 | Exporter → réimporter le même fichier | 0 créé (ou maj), pas de doublon Tube PER |
| TC-ADM-CAT-004 | CSV avec 2 prix pour le même nom | 1 produit, avertissement, premier prix |
| TC-ADM-CAT-005 | Supprimer un produit utilisé en tarif | Blocage + message |
| TC-ADM-CAT-006 | Artisan Pro : Mes tarifs → nouveau produit admin | Visible dans le sélecteur (après `db push` en prod) |

## Erreurs fréquentes

| Symptôme | Cause probable |
| --- | --- |
| Écriture refusée en prod | Migration `20260908_admin_catalogue.sql` non poussée, ou compte non super_admin |
| Prix vocal toujours à 0 | Edge Function `devis-vocal` non redéployée, ou pas de prix indicatif ni tarif |
| Import « en-tête invalide » | Mauvaises colonnes, ou séparateur `;` |
| Doublon produit | Noms différents (accents / espaces) — l'identité est le nom, insensible à la casse |
