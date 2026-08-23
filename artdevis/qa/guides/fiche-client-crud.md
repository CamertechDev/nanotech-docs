---
sidebar_position: 2
title: Fiche client (CRUD)
description: Créer, lire, modifier, archiver et supprimer un client particulier ou professionnel.
---

## Accès

* Onglet **Clients** (accueil)
* **Nouveau client** : bouton flottant « + » en bas à droite
* **Fiche client** : tap sur une ligne de la liste
* **Modifier** : icône crayon sur la fiche client

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/clients-liste.png`
:::


## Types de client

| Type | Usage | Champs spécifiques |
| --- | --- | --- |
| **Particulier** | Client final, maison, appartement | Nom, téléphone, adresse suffisent en express |
| **Pro** | Entreprise, syndic, artisan | **Email obligatoire**, **SIRET obligatoire** (14 chiffres) |

## Saisie express (création)

Champs visibles par défaut :

| Champ | Particulier | Pro |
| --- | --- | --- |
| Type (Particulier / Pro) | Oui | Oui |
| Nom ou raison sociale | Oui | Oui |
| Téléphone | Oui | Oui |
| Adresse postale | Oui | Oui |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/client-form-express.png`
:::


## Détails optionnels (section repliable)

Appuyer sur **Ajouter des détails** pour déplier :

| Champ | Particulier | Pro |
| --- | --- | --- |
| Email | Optionnel | **Obligatoire** |
| SIRET | Non | **Obligatoire** (14 chiffres) |
| Code postal, Ville | Optionnel | Optionnel |
| Digicode, Étage, Bâtiment | Optionnel | Optionnel |
| Présence chien | Optionnel | Optionnel |
| Client actif | Édition seule | Édition seule |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/client-form-details.png`
:::


## Fiche client (lecture)

La fiche affiche :

* Identité (type, nom, contacts)
* Adresse (+ ouverture GPS si disponible)
* SIRET si client Pro
* Accès chantier (digicode, étage, etc.)
* **Historique des devis** (actions Partager PDF, Marquer envoyé, etc.)
* Bouton **Devis vocal** (micro)

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/client-fiche.png`
:::


## Opérations CRUD

| Action | Comment | Effet |
| --- | --- | --- |
| **Create** | FAB Nouveau client | Client en tête de liste |
| **Read** | Tap sur la ligne | Ouvre la fiche |
| **Update** | Crayon sur la fiche | Modifie les champs |
| **Archive** | Édition → Client actif = off | Client conservé, marqué inactif |
| **Delete** | Menu supprimer sur la fiche | Suppression définitive (confirmation) |

## Recherche

Barre de recherche en haut de la liste : filtre en temps réel sur nom, ville, code postal, adresse, téléphone.

## Données de test suggérées

**Particulier :**

| Champ | Valeur |
| --- | --- |
| Nom | `Madonna Dupont` |
| Téléphone | `0612345678` |
| Adresse | `12 rue des Lilas, 75011 Paris` |

**Professionnel :**

| Champ | Valeur |
| --- | --- |
| Type | Pro |
| Nom | `Syndic Les Oliviers` |
| Téléphone | `0145678901` |
| Email | `contact@syndic-oliviers.fr` |
| SIRET | `55210055400034` |
| Adresse | `5 avenue de la République, 69001 Lyon` |

:::info Doublons
L'application refuse un **même téléphone ou email** déjà utilisé par un autre client du même artisan.
:::

## Prérequis pour la suite

Avant les tests **Relation client R2b** et **Chantiers**, créer au moins :

* 1 client avec un devis **Brouillon**
* 1 client avec un devis **Accepté** (via parcours devis vocal mock)

## Cas de test liés

Campagne : [TC-CLI-001 à TC-CLI-008](/artdevis/qa/campagnes/2026-08-release-r2b#phase-2--fiche-client-crud)

## Erreurs fréquentes

| Symptôme | Cause probable |
| --- | --- |
| Impossible d'enregistrer un Pro | Email ou SIRET manquant |
| Client absent après création mock | Rafraîchir, vérifier `USE_MOCK=true` |
| Planification chantier échoue | Adresse client vide sur la fiche |
