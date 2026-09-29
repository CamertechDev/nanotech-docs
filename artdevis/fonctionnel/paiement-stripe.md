---
sidebar_position: 8
title: Paiement Stripe (abonnements)
description: Checkout web simulé, HTTPS Vercel, retours /success et /cancel, webhook Phase 2. Aucun achat in-app iOS/Android.
---

# Paiement Stripe — abonnements SaaS

> **Statut :** Phase 1 simulée (sept. 2026) · **Stripe réel :** Phase 2 · **Spec code :** dépôt ArtDevis `docs/USECASE-PAIEMENT-STRIPE.md` · **PO :** `docs/USECASE-PO-PAIEMENT-STRIPE.md`

## En une phrase

Les formules **Base (49 €)** et **Professionnel (99 €)** se règlent **sur le web**. iPhone et Android n'affichent **aucun** prix ni bouton d'achat. Stripe n'est **pas branché** : la page Checkout est une **maquette** ; le support active la formule à la main.

## Parcours aujourd'hui

```
Web : Profil → Mon abonnement → Choisir Base / Pro
        ↓
/checkout?plan=starter|pro  (page type Stripe)
        ↓
Payer → « Stripe non disponible » (aucun débit, formule inchangée)
        ↓
Contacter le support → email du cockpit Super Admin
        ↓
Support / Super Admin active Base ou Pro
```

Sur **iOS / Android** : feuille « formule actuelle » — **Contacter le support** ouvre un brouillon Mail vers l'adresse configurée dans le cockpit (défaut `contact@artdevis.fr`), sans prix ni bouton Payer.

## Prérequis Vercel

| Prérequis | Statut |
| --- | --- |
| HTTPS (`https://artdevis.vercel.app`) | ✅ SSL Vercel — Stripe refuse le `http://` |
| URLs `#/success` et `#/cancel` | ❌ **Incorrect** : l'app utilise des **chemins**, pas le hash |

Quand Stripe sera branché :

| Rôle | URL |
| --- | --- |
| Paiement OK | `https://artdevis.vercel.app/success` |
| Annulation | `https://artdevis.vercel.app/cancel` |

Ces deux **pages Flutter n'existent pas encore**.

## Après un vrai paiement (Phase 2)

| Acteur | Rôle |
| --- | --- |
| **Artisan** | Paie sur **Stripe Checkout**, puis revient sur `/success` (ou `/cancel`). Rien d'autre à faire. |
| **Stripe** | Envoie un **webhook** signé à ArtDevis. |
| **Application / backend** | Seul le webhook écrit `plan_abonnement`. `/success` recharge le profil, elle **n'active pas** l'abo (évite la fraude). |
| **App mobile** | Lit le plan déjà à jour en base — toujours **sans** bouton d'achat. |

:::warning Ne pas activer le plan depuis l'URL de retour
Un artisan (ou un reviewer) qui ouvrirait `/success` à la main ne doit **pas** passer Pro. Seul l'événement Stripe fait foi.
:::

## Support

Adresse **configurable** dans le cockpit Super Admin (`platform_settings.email_support`, défaut `contact@artdevis.fr`). Visible sur `/checkout` + bouton **Contacter le support** (mail prérempli : formule + compte).

Les reviewers **App Store / Play Store** ne voient pas cette page (rejet 3.1.1 si Payer + mailto d'achat dans l'app native).

## Test rapide (mock, 3 min)

1. `flutter run -d chrome --dart-define=USE_MOCK=true`
2. `julien@plomberie.fr` / `password123`
3. Profil → **Mon abonnement** → **Choisir Base** (compte déjà Pro)
4. Vérifier le bandeau, l'email, **Payer** → simulation, formule inchangée

## Hors périmètre Phase 1

| Item | Phase |
| --- | --- |
| Compte Stripe, Checkout réel, webhook | Phase 2 |
| Pages `/success` et `/cancel` | Phase 2 |
| Portail client (résiliation, CB) | Phase 2 |
| IAP / Play Billing | Hors scope (abos web) |

## Documents liés

* [Conformité App Store / Play Store](../exploitation/conformite-app-stores)
* [Profil et compte](../guide-utilisateur/profil-et-compte)
* [Inscription et plans](../qa/guides/inscription-et-plans)
* [Cockpit Super Admin](./cockpit-admin) (activation manuelle du plan)
