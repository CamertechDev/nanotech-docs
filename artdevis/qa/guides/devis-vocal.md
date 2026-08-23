---
sidebar_position: 3
title: Devis vocal
description: Dictée, brouillon, traduction FR, PDF, depuis la fiche client ou l'assistant IA.
---

## Objectif

Créer un **devis brouillon** à partir d'une dictée (ou du scénario mock), le contrôler, le valider en français pour le client, puis générer le PDF.

:::info Prérequis
* Au moins **un client** créé (phase 2)
* Mode mock recommandé : `flutter run -d chrome --dart-define=USE_MOCK=true`
* Optionnel : tarifs fournisseurs configurés en **phase 5** pour tester l'injection prix B2B en prod
:::

## Points d'entrée

| Entrée | Chemin |
| --- | --- |
| **Fiche client** | Ouvrir un client → bouton micro **Devis vocal** |
| **Assistant IA** | Onglet ou menu Assistant → choisir le client → dictée |

Les deux chemins lancent le **même flux** (Écrans 3 à 6).

:::warning Règle métier
L'IA **ne choisit jamais** le client. L'artisan doit ouvrir la fiche client (ou le sélectionner dans l'assistant) **avant** de dicter.
:::

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/devis-recording.png`
:::

## Écran 3 — Enregistrement

| Action | Détail |
| --- | --- |
| Démarrer | Appuyer sur le bouton micro / enregistrer |
| Pendant | Timer visible, possibilité d'annuler |
| Terminer | Bouton **Terminer** ou équivalent pour lancer le traitement |

**Mode mock :** pas de vrai micro, scénario chauffe-eau simulé en ~3 secondes.

**Mode web sans mock :** le micro peut échouer, comportement attendu. Utiliser mock ou Android.

## Écran 4 — Traitement

Barre de progression avec étapes :

1. Upload audio
2. Transcription
3. Analyse IA
4. Construction des prix

| Résultat | Suite |
| --- | --- |
| Succès | Écran **contrôle** (langue de dictée) |
| Erreur réseau | Écran **NetworkError** + bouton **Réessayer** |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/devis-processing.png`
:::

## Écran 5a — Contrôle (langue dictée)

Relecture du brouillon dans la **langue détectée** (fr, pt, ar, etc.).

| Action | Effet |
| --- | --- |
| Modifier une ligne | Prix, quantité, description (TVA par ligne) |
| **Valider pour le client** | Traduction automatique → français |

Totaux HT, TVA et TTC recalculés **en temps réel**.

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/devis-controle.png`
:::

## Écran 5b — Aperçu client (français)

Devis affiché en **français** pour le client.

| Action | Effet |
| --- | --- |
| Relire les lignes | Vérification finale |
| Continuer vers PDF | Lance la génération (Écran 6) |

Si la dictée était déjà en français, cet écran peut suivre directement le contrôle.

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/devis-apercu-fr.png`
:::

## Écran 6 — PDF et partage

| Action | Effet |
| --- | --- |
| Générer PDF | Appel Edge Function `generer-pdf-devis` (ou mock) |
| **Partager** | Feuille OS (WhatsApp, Gmail, etc.) |
| **Terminer** | Retour à la fiche client |

En production sans email auto : bannière indiquant le **partage manuel** du PDF.

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/devis-pdf.png`
:::

## Après le flux

Sur la **fiche client**, section **Historique devis** :

* Nouveau devis en statut **Brouillon**
* Montant TTC affiché
* Actions disponibles : ouvrir, Partager PDF, Marquer envoyé (phase 6 R2b)

Pour tester **Accepté** et **Chantiers** : marquer le devis Accepté depuis l'historique (phase 6 ou 7).

## Modes de test

| Mode | Commande | Usage QA |
| --- | --- | --- |
| **Mock** | `USE_MOCK=true` | Campagne standard, pas d'OpenAI |
| **Prod web** | Vercel ou `USE_MOCK=false` | PDF réel, Edge Functions |
| **Mobile** | Émulateur Android | Vraie dictée (prod) |

## Données mock attendues

Le scénario mock produit typiquement un devis **plomberie / chauffe-eau** avec plusieurs lignes et un total TTC cohérent. Vérifier :

* Au moins 1 ligne matériel
* Total TTC > 0
* Statut **Brouillon** à la fin

## Lien avec les tarifs (Pro)

Si des tarifs fournisseurs sont configurés (phase 5) et que la dictée mentionne un produit du catalogue, l'IA peut appliquer le **prix négocié**. Sans tarif : devis produit quand même (prix génériques).

## Erreurs fréquentes

| Symptôme | Cause probable |
| --- | --- |
| Micro bloqué sur Chrome | Utiliser mock ou Android |
| NetworkError persistant | Backend down, relancer avec Réessayer |
| PDF vide ou erreur | Edge Function non déployée, devis sans lignes |
| Pas de traduction FR | Dictée déjà en français, flux normal |

## Cas de test liés

Campagne : [TC-VOC-001 à TC-VOC-008](/artdevis/qa/campagnes/2026-08-release-r2b#phase-3--devis-vocal)

Spec complète : [Devis vocal (fonctionnel)](/artdevis/fonctionnel/devis-vocal)
