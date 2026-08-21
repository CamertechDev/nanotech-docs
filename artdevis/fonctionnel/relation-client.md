---
sidebar_position: 3
title: Relation client
---

## Principe

L'artisan **crée et transmet** le devis. Le **client n'utilise pas l'application**. La relation se déroule via PDF, téléphone, WhatsApp ou email.

## Parcours complet

| Étape | Dans l'app | Hors app |
| --- | --- | --- |
| 1 | Dictée → contrôle → aperçu FR → PDF | — |
| 2 | **Partager le PDF** (Écran 6 ou historique) | Client **reçoit** le devis |
| 3 | **Marquer envoyé** → statut `envoye` + date | — |
| 4 | — | Client **répond** (tel, WhatsApp, mail) |
| 5 | **Accepté** ou **Refusé** sur la fiche client | — |
| 6 | Si accepté → **Mes Chantiers** (planification auto) | — |

## Actions sur l'historique (fiche client)

| Action | Condition | Effet |
| --- | --- | --- |
| **Partager PDF** | Tous statuts | Régénère le PDF, ouvre la feuille de partage |
| **Marquer envoyé** | Brouillon uniquement | Statut `envoye`, affichage « Envoyé le JJ/MM/AAAA » |
| **Ouvrir le devis** (tap ligne) | Tous statuts | Édition si brouillon, consultation seule si accepté/refusé |
| **Remettre en brouillon** | Depuis accepté/refusé | Déverrouille l'édition des lignes |
| **Planifier le chantier** | Devis accepté | Crée ou retrouve l'entrée **Mes Chantiers** (relance manuelle) |
| **Accepté / Refusé** | Brouillon ou envoyé | Décision artisan après retour client |

## Renvoi et relance client

| Situation | Procédure |
| --- | --- |
| Mail perdu, client à relancer | Historique → **Partager PDF** sans rouvrir l'éditeur |
| Nouvelle adresse email | Modifier la fiche client → **Partager PDF** via Gmail |
| Client qui tarde | Après premier envoi → **Marquer envoyé**, puis **Partager PDF** à J+2 ou J+7 |

## Canal d'envoi (décision production)

| Mode | Statut | Détail |
| --- | --- | --- |
| **Partage manuel** (WhatsApp, Gmail…) | **Actif par défaut** | Pas d'appel Resend, statut `brouillon` tant que non marqué |
| **Email auto Resend** | Code livré, **désactivé** | Activer via `RESEND_API_KEY` + `DEVIS_EMAIL_AUTO=true` |

:::tip Décision PO août 2026
Le partage manuel est retenu en production tant que Resend n'est pas configuré. L'email automatique reste activable sans refonte.
:::

## Consultation des devis verrouillés

Un devis **accepté** ou **refusé** s'ouvre en **lecture seule**. L'artisan peut consulter les lignes et le total, puis choisir **Remettre en brouillon** pour modifier à nouveau.

## Planification chantier manuelle

Si la planification automatique a échoué (migration absente, erreur réseau, devis accepté avant déploiement du module Chantiers), le bouton **Planifier le chantier** sur un devis accepté relance la création dans la table `agenda`.

## Test rapide (5 minutes)

1. Connexion mock ou prod avec compte Pro
2. Client → Devis vocal → PDF → Partager
3. Fiche client → Marquer envoyé → vérifier la date
4. Partager PDF depuis l'historique (simulation renvoi)
5. Accepté → onglet Mes Chantiers
6. Rouvrir un devis accepté → consultation seule → Remettre en brouillon si besoin

Production : [artdevis.vercel.app](https://artdevis.vercel.app)
