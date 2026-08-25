---
sidebar_position: 1
title: Inscription et plans
description: Créer un compte artisan, comprendre le SIRET et les formules Essai, Base, Pro.
---

## Accès

1. Ouvrir l'application → écran **Connexion**
2. Appuyer sur **Créer un compte**

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/auth-login.png` (voir [Captures d'écran](/artdevis/qa/guides/captures-ecran))
:::

## Formulaire d'inscription (patron)

| Champ | Obligatoire | Règle | Exemple QA |
| --- | --- | --- | --- |
| **Nom de l'entreprise** | Oui | Texte non vide | `Plomberie QA Test` |
| **SIRET** | Oui | **14 chiffres** exactement | `12345678901234` ou `00000000000000` (reviewer stores) |
| **Email** | Oui | Format email valide | `qa+001@test.fr` |
| **Mot de passe** | Oui | Minimum **6 caractères** | `password123` |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/auth-signup.png`
:::


### Qu'est-ce que le SIRET ?

Le **SIRET** (Système d'identification du répertoire des établissements) est l'identifiant à **14 chiffres** d'un établissement en France (9 chiffres SIREN + 5 chiffres NIC).

Dans ArtDevis :

* **Inscription artisan** : SIRET obligatoire, 14 chiffres
* **Client professionnel** : SIRET obligatoire également (voir [Fiche client](/artdevis/qa/guides/fiche-client-crud))

:::tip Tests négatifs SIRET
* 13 ou 15 chiffres → message d'erreur, inscription refusée
* Lettres ou espaces → refusé
:::

:::info Reviewer App Store / Play Store
SIRET fictif accepté : **`00000000000000`** (14 chiffres, pas de contrôle Luhn). Voir [Conformité stores](/artdevis/exploitation/conformite-app-stores).
:::

## Après inscription

* Message de succès, retour à l'écran **Connexion**
* Le compte est créé en plan **Essai gratuit** (14 jours par défaut)
* **Pas de wizard** d'onboarding : l'artisan se connecte puis complète son profil si besoin

## Les trois formules (plans)

| Plan | Libellé UI | Prix affiché | Fonctionnalités clés |
| --- | --- | --- | --- |
| **essai** | Essai gratuit | 0 € | Clients, devis vocal, profil |
| **starter** | Base | 49 €/mois | Idem essai (après fin d'essai) |
| **pro** | Professionnel | 99 €/mois | + Équipe, Chantiers, Tarifs fournisseurs, Veille |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/plans-comparatif.png`
:::


### Consulter les plans à l'inscription

Sur l'écran inscription, lien **Voir les formules…** → ouvre une feuille comparatif **Base / Professionnel**.

:::warning iOS (App Store)
Sur **iPhone/iPad (build natif)**, ce lien est **masqué** (règle Apple 3.1.1 — pas de prix abonnement in-app). Tester sur Web ou Android pour TC-AUTH plans, ou voir [Checklist TC-STORE](/artdevis/qa/conformite-stores-checklist).
:::

:::warning MVP août 2026
Le changement de plan depuis cette feuille est une **simulation** (pas de paiement Stripe). Pour tester le plan **Pro** sans payer : utiliser `pro@plomberie.fr` ou simuler l'upgrade depuis **Profil → Mon abonnement**.
:::

## Connexion

| Champ | Valeur test |
| --- | --- |
| Email | celui créé à l'inscription |
| Mot de passe | celui défini à l'inscription |

Compte reviewer documenté : `julien@plomberie.fr` / `password123` (saisie manuelle en **release**, pré-rempli en debug uniquement).

Suppression de compte : **Profil → Supprimer mon compte et mes données** ([détail](/artdevis/exploitation/conformite-app-stores)).

Après connexion : onglet **Clients** (accueil).

## Cas de test liés

Campagne : [TC-AUTH-001 à TC-AUTH-006](/artdevis/qa/campagnes/2026-08-release-r2b#phase-1--inscription-et-plans)

## Erreurs fréquentes

| Symptôme | Cause probable |
| --- | --- |
| « Email déjà utilisé » | Réutiliser un email existant en prod |
| SIRET refusé | Longueur ≠ 14 |
| Équipe / Tarifs inaccessibles | Compte Essai ou Base, upgrade Pro requis |
