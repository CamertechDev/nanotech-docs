---
sidebar_position: 1
title: Flux devis France
---

## Objectif

Permettre à un artisan de **dicter dans sa langue**, de **contrôler le brouillon**, puis de **produire un devis PDF en français** conforme aux attentes du marché français (TVA, acompte, validité).

## Parcours cible (releases R1 à R3)

```
Dictée (fr, pt, ar, pl…)
        ↓
Écran CONTRÔLE — langue de dictée, prix € et TVA FR appliqués
        ↓
« Valider pour le client » → traduction automatique → français
        ↓
Écran APERÇU CLIENT (français) — relecture optionnelle
        ↓
PDF + partage manuel au client (+ mention acompte si seuil dépassé)
        ↓
Option : email auto si Resend configuré (sinon : Marquer envoyé)
        ↓
Client répond (mail, tel, WhatsApp) → artisan marque Accepté → Mes Chantiers
```

## Décisions produit validées

| Sujet | Décision |
| --- | --- |
| Langue client | Devis **toujours en français** |
| Contrôle artisan | Relecture dans la **langue de dictée** avant traduction |
| Canal | **Partage manuel** par défaut, email auto en option |
| Acompte | Seuil et taux paramétrables, bloc PDF automatique |
| International | France d'abord, Espagne et Royaume-Uni ensuite |

## Évolution par rapport au MVP initial

| Avant | Production août 2026 |
| --- | --- |
| Partage PDF uniquement depuis l'Écran 6 | Partage PDF aussi depuis l'**historique client** |
| Statut `envoye` rarement persisté | **Marquer envoyé** + date visible |
| Devis accepté/refusé non ouvrable | Consultation seule + **Remettre en brouillon** |
| Pas d'acompte | Bloc acompte si TTC supérieur au seuil artisan |
| Pas de photo chantier | **2 photos** techniques internes (hors PDF), patron |

## Paramètres artisan (profil / onboarding)

| Paramètre | Valeur par défaut suggérée |
| --- | --- |
| Seuil acompte | 500 € TTC |
| Taux acompte | 30 % |
| Validité devis | 30 jours |
| IBAN / BIC | Optionnel (requis si acompte activé) |
| Mention acompte | Texte personnalisable |

## Releases

| Release | Contenu | Statut |
| --- | --- | --- |
| **R1** | Écran contrôle + traduction FR + aperçu client | Livré |
| **R2** | Email auto PDF + statut `envoye` + trace envoi | Code livré, email désactivé en prod |
| **R3** | Paramètres acompte + bloc PDF/email | Livré |
| **R2b** | Historique : Partager PDF, Marquer envoyé, consultation verrouillée | Livré |

## Activation email automatique (optionnelle)

Le code R2 est livré mais **désactivé par défaut** en production.

Prérequis :

* Secret Supabase `RESEND_API_KEY`
* Build avec `--dart-define=DEVIS_EMAIL_AUTO=true`

Sans cette configuration, l'artisan utilise le **partage manuel** (WhatsApp, Gmail) puis **Marquer envoyé** si besoin.

## Décisions produit encore ouvertes

* Expéditeur email : adresse plateforme ou email de l'artisan ?
* Écran aperçu FR : obligatoire si dictée déjà en français ?
* Validation des défauts 500 € et 30 % pour l'acompte
* IBAN obligatoire à l'onboarding ou seulement si acompte activé

## Scénario de test (5 minutes)

1. Connexion mock : `julien@plomberie.fr` / `password123` avec `USE_MOCK=true`
2. Dictée (ou scénario chauffe-eau mock) → écran contrôle
3. Valider pour le client → aperçu français → PDF
4. Vérifier mention acompte si montant supérieur au seuil
5. Fiche client → Accepté → onglet Mes Chantiers (compte Pro)

Production : [artdevis.vercel.app](https://artdevis.vercel.app)
