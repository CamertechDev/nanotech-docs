---
sidebar_position: 4
title: Mon équipe
description: Gérer les membres rattachés au patron artisan (plan Pro).
---

## Objectif

Permettre au **patron** de gérer ses futurs techniciens : fiche membre, compétences, activation/désactivation, invitation par email.

:::warning Plan requis
Fonctionnalité **Professionnel (Pro)** uniquement. Compte Essai ou Base : message d'upgrade à l'ouverture.
:::

## Accès

| Entrée | Chemin |
| --- | --- |
| Depuis Clients | Icône **équipe** (👥) dans l'en-tête (patron uniquement) |
| Depuis Profil | **Mon équipe** |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/equipe-liste.png`
:::


## Liste Mon équipe

* Filtres : **Tous**, **Actifs**, **Inactifs**
* Carte membre : nom, email, statut, puces compétences
* Interrupteur : activer / désactiver (soft delete, pas de suppression définitive)

## Formulaire membre (ajout / édition)

| Champ | Création | Édition | Règle |
| --- | --- | --- | --- |
| Prénom et nom | Oui | Oui | Non vide |
| Email professionnel | Oui | Oui | Format email |
| Téléphone | Non | Oui | Optionnel |
| Compétences | Non | Oui | Séparées par des virgules (ex. `Chauffe-eau, PAC, Dépannage`) |
| Envoyer invitation par email | Oui | Non | Coché par défaut à la création |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/equipe-form.png`
:::


### Invitation par email

| Option | Comportement |
| --- | --- |
| **Cochée** | Edge Function `invite-membre` : email avec lien `/accept-invite` |
| **Décochée** | Fiche créée sans compte auth (membre inactif côté connexion) |

Le membre invité définit son mot de passe via **SetPasswordPage** puis se connecte en rôle **opérateur**.

## Données de test suggérées

| Champ | Valeur |
| --- | --- |
| Nom | `Marc Technicien` |
| Email | `marc.tech+qa@test.fr` |
| Téléphone | `0698765432` |
| Compétences | `Plomberie, Chauffe-eau` |

## Ce qui n'est pas encore en MVP

* Assignation technicien sur un chantier (Phase 2)
* Coordonnées GPS base technicien persistées
* Table `techniciens` dédiée (aujourd'hui : lignes `artisans` avec `role=operateur`)

## Cas de test liés

Campagne : [TC-EQP-001 à TC-EQP-005](/artdevis/qa/campagnes/2026-08-release-r2b#phase-3--mon-équipe)

## Erreurs fréquentes

| Symptôme | Cause probable |
| --- | --- |
| Écran bloqué upgrade | Compte non Pro |
| Invitation non reçue | Edge Function non déployée, email spam |
| Membre invisible | Filtre « Actifs » alors que membre désactivé |
