---
sidebar_position: 3
title: Relation client
description: Flux devis, partage PDF, acceptation, planification chantier et facturation.
---

## Principe

L'artisan **crée et transmet** le devis. Le **client n'utilise pas l'application**. La relation se déroule via PDF, téléphone, WhatsApp ou email.

## Parcours complet (MVP août 2026)

```
Fiche client / Assistant IA → Devis vocal → PDF
        ↓
Partager PDF · Marquer envoyé
        ↓
Accepté / Refusé (réponse client hors app)
        ↓
Si Accepté → Mes Chantiers → Terminé → Factures → Partager
```

| Étape | Dans l'app | Hors app |
| --- | --- | --- |
| 1 | Dictée → contrôle → aperçu FR → PDF | — |
| 2 | **Partager le PDF** (Écran 6 ou historique) | Client **reçoit** le devis |
| 3 | **Marquer envoyé** → statut `envoye` + date | — |
| 4 | — | Client **répond** (tel, WhatsApp, mail) |
| 5 | **Accepté** ou **Refusé** sur la fiche client | — |
| 6 | Mes Chantiers → clôture → **Factures** acompte/solde | Encaissement manuel |

## Actions sur l'historique (fiche client)

| Action | Condition | Effet |
| --- | --- | --- |
| **Partager PDF** | Tous statuts | Régénère le PDF, ouvre la feuille de partage |
| **Marquer envoyé** | Brouillon uniquement | Statut `envoye`, affichage « Envoyé le JJ/MM/AAAA » |
| **Ouvrir le devis** (tap ligne) | Tous statuts | Édition si brouillon, consultation seule si accepté/refusé |
| **Remettre en brouillon** | Depuis accepté/refusé | Déverrouille l'édition des lignes |
| **Planifier le chantier** | Devis accepté | Crée ou retrouve l'entrée **Mes Chantiers** (relance manuelle) |
| **Client a annulé** | Devis accepté | Statut `annule`, retrait du chantier dans l'agenda |
| **Facture acompte / solde** | Devis accepté | Voir [Factures](./factures) |
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

## Test rapide (5 minutes)

1. Connexion mock ou prod avec compte Pro
2. Client → Devis vocal → PDF → Partager
3. Fiche client → Marquer envoyé → vérifier la date
4. Accepté → Mes Chantiers → Terminé → facture solde → Partager
5. Rouvrir un devis accepté → consultation seule

Production : [artdevis.vercel.app](https://artdevis.vercel.app)

## Documents liés

* [Factures](./factures)
* [Chantiers et veille](./chantiers-et-veille)
* [Campagne QA](../qa/campagnes/2026-08-release-r2b) — phases 6, 9
