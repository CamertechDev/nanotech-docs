---
sidebar_position: 1
title: Campagne R2b (août 2026)
description: Tests manuels relation client R2b, chantiers et logging Niveau 1.
---

# Campagne QA — Release R2b (août 2026)

| Champ | Valeur |
| --- | --- |
| **Périmètre** | Relation client R2b, planification chantiers, logging Niveau 1 |
| **Release** | R2b + planification manuelle + AppLogger |
| **Environnement principal** | Mock (`USE_MOCK=true`), puis prod si indiqué |
| **Durée estimée** | 2 h (mock) + 1 h (prod optionnel) |
| **Exécuteur** | |
| **Date d'exécution** | |
| **Version testée** | Commit / build : |
| **Résultat global** | Pass / Fail / Pass avec réserves |

:::tip Avant de commencer
Lire le [Guide QA](/artdevis/exploitation/guide-qa) pour les environnements, comptes et processus de remontée de bugs.

Remonter un échec via le template **Bug QA** sur GitHub (dépôt ArtDevis).
:::

## Prérequis généraux


* Compte **Pro** pour les cas chantiers : `pro@plomberie.fr` / `password123`
* Compte standard pour R2b : `julien@plomberie.fr` / `password123`
* Console développeur ouverte (F12) pour les cas logging
* Au moins **un client** avec **un devis en brouillon** et **un devis accepté** (créer via parcours mock si besoin)

## Légende

| Colonne | Signification |
| --- | --- |
| **P / F / N / B** | Pass, Fail, N/A, Blocked (noter une seule valeur) |
| **Remarques** | Capture, message d'erreur, lien Issue GitHub `[QA]` |

---

## Bloc A — Relation client R2b

Référence : [Relation client](/artdevis/fonctionnel/relation-client)

### TC-R2B-001 — Partager PDF depuis l'historique (brouillon)

| | |
| --- | --- |
| **Prérequis** | Client avec au moins un devis en statut **Brouillon** |
| **Étapes** | 1. Ouvrir la fiche client<br/>2. Repérer un devis brouillon dans l'historique<br/>3. Appuyer sur **Partager PDF** |
| **Résultat attendu** | Génération du PDF sans erreur, ouverture de la feuille de partage OS (WhatsApp, Gmail, etc.) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-002 — Partager PDF depuis l'historique (devis accepté)

| | |
| --- | --- |
| **Prérequis** | Client avec un devis **Accepté** |
| **Étapes** | 1. Fiche client → devis accepté<br/>2. Appuyer sur **Partager PDF** |
| **Résultat attendu** | PDF généré et partage proposé, statut du devis inchangé (reste Accepté) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-003 — Marquer envoyé (brouillon uniquement)

| | |
| --- | --- |
| **Prérequis** | Devis en **Brouillon** |
| **Étapes** | 1. Fiche client → devis brouillon<br/>2. Appuyer sur **Marquer envoyé** |
| **Résultat attendu** | Statut passe à **Envoyé**, date affichée (« Envoyé le JJ/MM/AAAA »), bouton Marquer envoyé disparaît ou est désactivé |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-004 — Marquer envoyé indisponible (devis déjà envoyé)

| | |
| --- | --- |
| **Prérequis** | Devis déjà **Envoyé** ou **Accepté** |
| **Étapes** | 1. Ouvrir l'historique<br/>2. Vérifier la présence du bouton **Marquer envoyé** |
| **Résultat attendu** | Bouton **absent** ou non cliquable pour les statuts autres que Brouillon |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-005 — Ouvrir un devis accepté (consultation seule)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté** |
| **Étapes** | 1. Tap sur la ligne du devis dans l'historique<br/>2. Tenter de modifier une ligne ou un prix |
| **Résultat attendu** | Éditeur en **lecture seule**, totaux visibles, pas de modification possible sans action explicite |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-006 — Ouvrir un devis refusé (consultation seule)

| | |
| --- | --- |
| **Prérequis** | Devis **Refusé** |
| **Étapes** | 1. Tap sur la ligne du devis refusé<br/>2. Vérifier l'absence d'édition libre |
| **Résultat attendu** | Consultation seule, même comportement que TC-R2B-005 |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-007 — Remettre en brouillon (depuis accepté)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté**, ouvert en consultation seule |
| **Étapes** | 1. Appuyer sur **Remettre en brouillon**<br/>2. Confirmer dans la boîte de dialogue<br/>3. Modifier une ligne |
| **Résultat attendu** | Statut repasse **Brouillon**, édition à nouveau possible, total TTC recalculé |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-008 — Marquer Accepté puis message planification

| | |
| --- | --- |
| **Prérequis** | Compte **Pro**, devis **Brouillon** ou **Envoyé**, client avec adresse renseignée |
| **Étapes** | 1. Fiche client → **Accepté** sur un devis<br/>2. Observer le retour utilisateur (SnackBar ou message) |
| **Résultat attendu** | Devis passe **Accepté**, pas de crash, planification chantier tentée (succès silencieux ou avertissement explicite si échec) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-009 — Renvoi client (Partager PDF deux fois)

| | |
| --- | --- |
| **Prérequis** | Devis **Envoyé** |
| **Étapes** | 1. **Partager PDF** une première fois (annuler le partage)<br/>2. **Partager PDF** une seconde fois |
| **Résultat attendu** | PDF régénéré à chaque fois, pas d'erreur réseau bloquante, statut inchangé |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-010 — Édition libre d'un devis brouillon (régression)

| | |
| --- | --- |
| **Prérequis** | Devis **Brouillon** |
| **Étapes** | 1. Tap sur le devis → éditeur<br/>2. Modifier le prix d'une ligne<br/>3. Revenir à la fiche client |
| **Résultat attendu** | Total TTC mis à jour, statut reste Brouillon |
| **P / F / N / B** | |
| **Remarques** | |

---

## Bloc B — Chantiers et planification

Référence : [Chantiers et veille](/artdevis/fonctionnel/chantiers-et-veille)

**Compte requis :** `pro@plomberie.fr` / `password123` (plan Pro).

### TC-CHA-001 — Affichage Mes Chantiers (jour J)

| | |
| --- | --- |
| **Prérequis** | Compte Pro, au moins un chantier planifié **aujourd'hui** (voir TC-CHA-002) |
| **Étapes** | 1. Onglet **Mes Chantiers**<br/>2. Lister les cartes affichées |
| **Résultat attendu** | Au moins une carte client visible, horaire et description présents, pas d'écran vide si chantier du jour existe |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CHA-002 — Planification auto à l'acceptation

| | |
| --- | --- |
| **Prérequis** | Compte Pro, nouveau devis ou devis Envoyé |
| **Étapes** | 1. Fiche client → **Accepté**<br/>2. Onglet **Mes Chantiers** |
| **Résultat attendu** | Nouveau chantier visible pour le **jour courant**, lié au client du devis |
| **P / F / N / B** | |
| **Remarques** | En prod, vérifier migrations `agenda` appliquées |

### TC-CHA-003 — Planifier le chantier (bouton manuel)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté** sans chantier visible (ex. acceptation avant déploiement module) |
| **Étapes** | 1. Fiche client → devis accepté<br/>2. Appuyer sur **Planifier le chantier**<br/>3. Onglet Mes Chantiers |
| **Résultat attendu** | Message de succès ou absence d'erreur, chantier créé ou retrouvé, visible dans Mes Chantiers (jour J) |
| **P / F / N / B** | |
| **Remarques** | Cas type « Madonna » : devis accepté sans chantier |

### TC-CHA-004 — Planifier le chantier (devis non accepté)

| | |
| --- | --- |
| **Prérequis** | Devis **Brouillon** ou **Envoyé** |
| **Étapes** | 1. Vérifier la présence du bouton **Planifier le chantier** |
| **Résultat attendu** | Bouton **absent** ou action refusée avec message explicite |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CHA-005 — Idempotence (double planification)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté** déjà planifié |
| **Étapes** | 1. **Planifier le chantier** une seconde fois<br/>2. Vérifier Mes Chantiers |
| **Résultat attendu** | Pas de doublon, un seul chantier par devis, pas d'erreur bloquante |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CHA-006 — Optimiser la journée

| | |
| --- | --- |
| **Prérequis** | Au moins **2 chantiers** le même jour |
| **Étapes** | 1. Mes Chantiers → **Optimiser la journée**<br/>2. Observer l'ordre des cartes |
| **Résultat attendu** | Réorganisation visible ou message de confirmation, pas de crash |
| **P / F / N / B** | |
| **Remarques** | Trajets simulés, pas de Google Maps |

### TC-CHA-007 — Changer le statut d'un chantier

| | |
| --- | --- |
| **Prérequis** | Chantier du jour affiché |
| **Étapes** | 1. Changer le statut (ex. En cours → Terminé)<br/>2. Rafraîchir ou revenir sur l'onglet |
| **Résultat attendu** | Statut persisté, affichage cohérent |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CHA-008 — Compte Starter sans onglet Chantiers

| | |
| --- | --- |
| **Prérequis** | Compte **non Pro** (Starter), si disponible |
| **Étapes** | 1. Se connecter<br/>2. Vérifier la barre de navigation |
| **Résultat attendu** | Onglet Chantiers masqué ou message upgrade, acceptation devis possible mais onglet inaccessible |
| **P / F / N / B** | |
| **Remarques** | N/A si seul compte Pro disponible |

---

## Bloc C — Logging et diagnostic (Niveau 1)

Référence : [Logging et diagnostic](/artdevis/exploitation/logging-et-diagnostic)

**Prérequis :** application en **mode debug** (pas release), console visible.

### TC-LOG-001 — Log planification manuelle (info)

| | |
| --- | --- |
| **Prérequis** | Mode debug, compte Pro, devis accepté |
| **Étapes** | 1. Fiche client → **Planifier le chantier**<br/>2. Filtrer la console sur `[ArtDevis]` |
| **Résultat attendu** | Ligne JSON avec `"action":"planifierChantier"` ou `"planifierChantierDepuisDevis"`, `"level":"info"`, contexte `devisId` et `clientId` |
| **P / F / N / B** | |
| **Remarques** | |

### TC-LOG-002 — Log planification auto après Accepté

| | |
| --- | --- |
| **Prérequis** | Mode debug, compte Pro |
| **Étapes** | 1. Marquer un devis **Accepté**<br/>2. Observer la console |
| **Résultat attendu** | Log `"action":"planifierChantierAuto"` en info (succès) ou error/failure (échec avec message) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-LOG-003 — Log échec PDF (Partager PDF)

| | |
| --- | --- |
| **Prérequis** | Mode debug, **prod** recommandé (`USE_MOCK=false`) ou mock |
| **Étapes** | 1. **Partager PDF** depuis l'historique<br/>2. Si succès, noter log info `generatePdf` ; simuler échec si possible (déconnexion réseau) |
| **Résultat attendu** | Succès : `"action":"generatePdf"`, `"level":"info"`. Échec : `"level":"error"` avec `failureType` |
| **P / F / N / B** | |
| **Remarques** | Échec réseau optionnel |

### TC-LOG-004 — Silence en release (contrôle)

| | |
| --- | --- |
| **Prérequis** | Build release ou `kReleaseMode` |
| **Étapes** | 1. Lancer build release web ou APK<br/>2. Répéter une action planification |
| **Résultat attendu** | **Aucune** ligne `[ArtDevis]` dans la console utilisateur |
| **P / F / N / B** | |
| **Remarques** | N/A si QA n'a pas accès build release |

### TC-LOG-005 — Scénario diagnostic Madonna

| | |
| --- | --- |
| **Prérequis** | Client test « Madonna » (ou équivalent) avec devis **Accepté** sans chantier visible |
| **Étapes** | 1. Planifier le chantier manuellement<br/>2. Copier le log JSON complet en cas d'échec<br/>3. Vérifier Mes Chantiers |
| **Résultat attendu** | Succès : chantier du jour visible. Échec : log `ServerFailure` avec message explicite (ex. RLS, table absente) |
| **P / F / N / B** | |
| **Remarques** | Joindre extrait log à l'Issue GitHub si Fail |

---

## Bloc D — Smoke prod (optionnel)

Exécuter sur [artdevis.vercel.app](https://artdevis.vercel.app) après validation mock.

| ID | Cas | P / F / N / B | Remarques |
| --- | --- | --- | --- |
| TC-PROD-01 | Login compte réel | | |
| TC-PROD-02 | Partager PDF historique | | |
| TC-PROD-03 | Accepté → Mes Chantiers (Pro) | | |

---

## Synthèse de campagne

| Bloc | Total cas | Pass | Fail | N/A | Blocked |
| --- | --- | --- | --- | --- | --- |
| A — R2b | 10 | | | | |
| B — Chantiers | 8 | | | | |
| C — Logging | 5 | | | | |
| D — Smoke prod | 3 | | | | |
| **Total** | **26** | | | | |

### Bugs ouverts

| ID cas | Issue GitHub (`[QA] …`) | Gravité | Statut |
| --- | --- | --- | --- |
| | | | |

### Commentaire QA

```
[Rédiger ici le compte rendu : blocages, réserves, recommandation go/no-go release]
```

### Validation

| Rôle | Nom | Date | Décision |
| --- | --- | --- | --- |
| QA | | | Go / No-go / Go avec réserves |
| PO | | | Go / No-go / Go avec réserves |

---

:::info Copie dans le dépôt ArtDevis
Ce document est également versionné dans le code source :

`artdevis/docs/qa/campagnes/2026-08-release-r2b.md`
:::
