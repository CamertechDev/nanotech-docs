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
| 1ʳᵉ visite | Écran **Comment dicter un devis** → *J'ai compris* |
| Rappel | Sous le micro : **Nouveau devis** … **Génère devis** |
| Démarrer | Appuyer sur le bouton micro / enregistrer |
| Pendant | Timer visible, possibilité d'annuler |
| Terminer | **Inactif avant 3 secondes**, puis actif |

**Mode mock :** pas de vrai micro ; après **Terminer** (≥ 3 s), scénario **selon le client ouvert** (pas toujours un chauffe-eau). Voir tableau plus bas.

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
| Protocole manquant (prod) | **ProtocolVocalRefuse** : message « Dites Nouveau devis … Génère devis » — **pas** Réessayer réseau, **pas** de brouillon |

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/devis-processing.png`
:::

## Écran 5a — Contrôle (langue dictée)

Relecture du brouillon dans la **langue détectée** (fr, pt, ar, etc.).

| Action | Effet |
| --- | --- |
| Modifier une ligne | Prix, quantité, description (TVA par ligne) |
| **Ajouter une ligne manuelle** | Catalogue ou saisie libre |
| **Compléter par la voix** | 2ᵉ dictée, **mêmes** lignes (pas un 2ᵉ devis). Mock : +3 lignes cuisine |
| **Photos du chantier (0/2)** | Caméra ou galerie, miniatures, plein écran. **Hors PDF client.** Patron uniquement |
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

Les **photos du chantier** ne sont **pas** dans le PDF (contrôle interne uniquement).

:::info Capture d'écran
Fichier à déposer : `static/img/artdevis/qa/devis-pdf.png`
:::

## Après le flux

Sur la **fiche client**, section **Historique devis** :

* Nouveau devis en statut **Brouillon**
* Montant TTC affiché
* **Seul le devis le plus récent** a le bloc d'actions ouvert (Partager PDF, etc.) ; les plus anciens sont repliés (chevron 56×56)
* Actions : ouvrir (tap sur le titre), Partager PDF, Marquer envoyé (phase 6 R2b)

Pour tester **Accepté** et **Chantiers** : marquer le devis Accepté depuis l'historique (phase 6 ou 7).

## Modes de test

| Mode | Commande | Usage QA |
| --- | --- | --- |
| **Mock** | `USE_MOCK=true` | Campagne standard, pas d'OpenAI |
| **Prod web** | Vercel ou `USE_MOCK=false` | PDF réel, Edge Functions |
| **Mobile** | Émulateur Android | Vraie dictée (prod) |

## Données mock attendues

Le scénario dépend du **client** (plus un cycle de langues global) :

| Client | Lignes types | Langue |
| --- | --- | --- |
| Mme Claire Dubois | Siphon évier, PER 16, MO fuite | fr-FR |
| Mme Sophie Dupont | Chauffe-eau Thermor 200 L | fr-FR |
| M. Bernard Luc | Mitigeur thermostatique (FR, pas EN) | fr-FR |
| SARL Plomberie Pro | WC suspendu, TVA **20 %** | fr-FR |

Vérifier :

* Au moins 1 ligne matériel
* Total TTC > 0
* Statut **Brouillon** à la fin
* Transcription contient **Nouveau devis** et **Génère devis** (mock)

## Lien avec les tarifs (Pro)

Si des tarifs fournisseurs sont configurés (phase 5) et que la dictée mentionne un produit du catalogue, l'IA peut appliquer le **prix négocié**. Sans tarif : devis produit quand même (prix génériques).

## Erreurs fréquentes

| Symptôme | Cause probable |
| --- | --- |
| Micro bloqué sur Chrome | Utiliser mock ou Android |
| NetworkError persistant | Backend down, relancer avec Réessayer |
| Message protocole (pas réseau) | Dictée sans `Nouveau devis` / `Génère devis` — **attendu** en prod |
| Terminer grisé | Attendre 3 secondes |
| PDF vide ou erreur | Edge Function non déployée, devis sans lignes |
| Pas de traduction FR | Dictée déjà en français, flux normal |
| Mauvais chantier mock | Vérifier le client ouvert (Dubois ≠ Dupont) |
| 3ᵉ photo refusée | Attendu : plafond **2** par devis |
| Photos dans le PDF | Bug : elles ne doivent **jamais** y figurer |

## Cas de test liés

Campagne : [TC-VOC-001 à TC-VOC-015](/artdevis/qa/campagnes/2026-08-release-r2b#phase-3--devis-vocal)

Spec complète : [Devis vocal (fonctionnel)](/artdevis/fonctionnel/devis-vocal)
