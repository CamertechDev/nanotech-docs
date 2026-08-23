---
sidebar_position: 5
title: Factures (acompte et solde)
description: Parcours Devis accepté → Chantier terminé → Facture PDF → Partage client. Validé PO août 2026.
---

# Factures — acompte et solde

> **Statut :** MVP livré (août 2026) · **PO :** Emmanuel · **Spec code :** dépôt ArtDevis `docs/USECASE-FACTURES.md`

## En une phrase

Depuis un **devis accepté**, l'artisan émet une **facture d'acompte** (si demandée à l'acceptation) puis une **facture de solde** une fois le **chantier terminé**. Les PDF se partagent comme un devis (WhatsApp, email…).

## Parcours métier

```
Devis accepté (+ acompte encaissé hors app, si applicable)
        ↓
Chantier planifié → En cours → Terminé
        ↓
Facture PDF générée depuis le devis accepté
  · Facture d'acompte (si acompte demandé sur le devis)
  · Facture de solde (reste TTC − acompte)
        ↓
Partage client (share natif — comme le devis)
```

:::info Encaissement hors app
L'acompte est **mentionné sur le devis** (R3) et peut être **encaissé en dehors d'ArtDevis** (virement, chèque, espèces). La facture d'acompte formalise la demande ; l'app ne gère pas encore le paiement en ligne.
:::

## Où agir dans l'app

| Écran | Action |
| --- | --- |
| **Fiche client** → historique, devis **Accepté** | **Facture acompte** / **Facture solde** → puis **Partager** |
| **Mes Chantiers** → statut **Terminé** | Bottom sheet **Facturer le chantier** (acompte + solde) |

## Règles métier

| Type | Conditions | Montant |
| --- | --- | --- |
| **Acompte** | Devis `accepte` + `acompteInclus` + montant acompte > 0 | `montantAcompteTtc` du devis |
| **Solde** | Devis accepté + chantier existant + statut **Terminé** | `totalTtc − acompte` |
| **Idempotence** | 1 facture acompte + 1 facture solde max par devis | Regénération → retourne l'existant |

## Technique (résumé)

| Élément | Détail |
| --- | --- |
| Table | `factures` (migration `20260835_factures.sql`) |
| Storage | Bucket `factures-pdf` |
| Edge Function | `generer-pdf-facture` |
| Feature Flutter | `lib/features/factures/` (repository + `FactureListCubit`) |
| Mock | `USE_MOCK=true` — PDF fictif `https://example.com/facture-{id}.pdf` |

## Test rapide (mock, 5 min)

1. `flutter run -d chrome --dart-define=USE_MOCK=true`
2. Compte **Pro** : `pro@plomberie.fr` / `password123`
3. Fiche **Mme Claire Dubois** → devis **Accepté** (avec acompte si seed)
4. **Facture acompte** → snackbar succès → **Partager**
5. Mes Chantiers → Dubois → **Terminé** → bottom sheet facturation → **Facture solde** → partage

## Hors périmètre MVP

| Item | Phase |
| --- | --- |
| Factur-X / e-facturation | Phase 3 |
| Paiement en ligne (Stripe…) | Phase 3 |
| Relance impayés automatique | Phase 2 |
| Comptabilité / export FEC | Phase 3 |

## Documents liés

* [Chantiers et veille](./chantiers-et-veille)
* [Relation client](./relation-client)
* [Campagne QA R2b](../qa/campagnes/2026-08-release-r2b) — phases Veille et Factures
