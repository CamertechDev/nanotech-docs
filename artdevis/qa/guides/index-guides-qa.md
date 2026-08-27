---
sidebar_position: 0
title: Index des guides QA
---

## Objectif

Ces guides expliquent **comment remplir chaque écran** pour que le QA soit autonome sans demander au PO ou au dev à chaque étape.

:::tip Artisans et utilisateurs finaux
Pour un **mode d'emploi métier** (sans cas de test TC-xxx), voir la section [Guide utilisateur](/artdevis/guide-utilisateur/premiers-pas).
:::

Les **campagnes de tests** ([Campagne onboarding août 2026](/artdevis/qa/campagnes/2026-08-release-r2b)) suivent **le même ordre** que ces guides.

| Ordre | Guide | Campagne associée |
| --- | --- | --- |
| 1 | [Inscription et plans](/artdevis/qa/guides/inscription-et-plans) | TC-AUTH-xxx |
| 2 | [Fiche client (CRUD)](/artdevis/qa/guides/fiche-client-crud) | TC-CLI-xxx |
| 3 | [Devis vocal](/artdevis/qa/guides/devis-vocal) | TC-VOC-xxx |
| 4 | [Mon équipe](/artdevis/qa/guides/fiche-equipe) | TC-EQP-xxx |
| 5 | [Tarifs fournisseurs](/artdevis/qa/guides/tarifs-fournisseurs) | TC-TAR-xxx |
| 6 | [Relation client R2b](/artdevis/fonctionnel/relation-client) | TC-R2B-xxx |
| 7 | [Chantiers](/artdevis/fonctionnel/chantiers-et-veille) | TC-CHA-xxx |
| 8 | [Veille MVP](/artdevis/fonctionnel/chantiers-et-veille) | TC-VEI-xxx |
| 9 | [Factures](/artdevis/fonctionnel/factures) | TC-FAC-xxx |
| 10 | [Logging](/artdevis/exploitation/logging-et-diagnostic) | TC-LOG-xxx |
| 11 | [Conformité stores](/artdevis/qa/conformite-stores-checklist) | TC-STORE-xxx |

Avant soumission App Store / Play Store, exécuter en priorité le guide **Conformité stores** (build release iOS requis pour les cas abonnements).

## Captures d'écran

Les images d'aide sont stockées dans :

```
gestionbois-docs/static/img/artdevis/qa/
```

Voir [Ajouter des captures d'écran](/artdevis/qa/guides/captures-ecran) pour la convention de nommage.

## Comptes de référence

| Compte | Mot de passe | Plan | Usage |
| --- | --- | --- | --- |
| `julien@plomberie.fr` | `password123` | Essai / Base | Parcours général |
| `pro@plomberie.fr` | `password123` | Pro | Équipe, tarifs, chantiers |

Pour tester l'inscription, utiliser un **email jamais utilisé** (ex. `qa-test+001@votredomaine.fr`).

SIRET reviewer stores : **`00000000000000`**. Voir [Conformité App Store](/artdevis/exploitation/conformite-app-stores).
