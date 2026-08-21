---
sidebar_position: 2
title: Devis vocal
---

## En une phrase

L'artisan **dicte** l'intervention, l'IA produit un **devis brouillon** (avec ses tarifs négociés si configurés), il **relit**, **génère un PDF** et le **partage** au client.

## Parcours applicatif

```
Client sélectionné → Dictée → Analyse IA → Édition brouillon → PDF → Partage
                                                      ↓
                              Fiche client : Accepté / Refusé → Mes Chantiers
```

**Deux points d'entrée identiques** : fiche client (bouton dictée) ou onglet **Assistant IA**.

:::info Règle métier
L'IA ne choisit jamais le client. L'artisan le sélectionne avant de lancer la dictée.
:::

## Écrans du flux (3 à 6)

| Écran | Page | Rôle |
| --- | --- | --- |
| 3 | Enregistrement | Capture audio, timer, contrôle micro |
| 4 | Traitement | Upload, transcription, analyse, barre de progression |
| 5 | Éditeur brouillon | Lignes, TVA, totaux temps réel, validation client |
| 6 | Aperçu PDF | Génération, partage, fin de flux |

La navigation entre ces écrans utilise `Navigator.push` avec transmission du `VoiceDevisBloc` via `BlocProvider.value`.

## Machine à états (VoiceDevisBloc)

États principaux :

* `Recording`, `Uploading`, `Transcribing`, `Analyzing`, `BuildingPrices`
* `DraftReadyControle`, `DraftReadyClient`
* `GeneratingPdf`, `SendingEmail`, `PdfReady`
* `NetworkError` (avec relance possible)

Toute erreur du pipeline aboutit à **NetworkError** avec message en français. L'audio uploadé est conservé pour permettre une relance.

## Backend (Edge Function `devis-vocal`)

| Étape | Technologie |
| --- | --- |
| Transcription | OpenAI Whisper |
| Analyse et structuration | GPT-4o-mini, JSON strict |
| Catalogue | Matching sur ~40 produits seedés |
| Tarifs B2B | Injection des tarifs artisan (20 max) |

**Fallback** : sans tarif configuré, le devis est produit quand même avec des prix génériques. Le flux n'est jamais bloquant.

## PDF (Edge Function `generer-pdf-devis`)

* Génération du document avec totaux, validité, bloc acompte si applicable
* Upload dans le bucket `devis-pdf`
* Retour de l'URL publique au client Flutter

## Livré (MVP 1.3)

| Zone | Détail |
| --- | --- |
| Application | 6 écrans, retry réseau, réouverture brouillon, historique |
| Backend | Pipeline Whisper + GPT complet |
| Intelligence | Nettoyage dictée, matching catalogue, injection tarifs |
| Tests | Bloc, pages, assistant + banc QA HTML |
| Mock | Scénario plomberie en 3 secondes sans OpenAI |

## Reste à faire

| Priorité | Item |
| --- | --- |
| P0 | Sélecteur TVA contraint (20 / 10 / 5,5), aujourd'hui saisie libre |
| P0 | Validation production bout en bout (dictée mobile réelle) |
| P1 | Stepper quantité, déploiement PDF prod validé |
| P2 | Waveform micro, pgvector catalogue, re-dictée sur brouillon |

## Modes de test

| Mode | Public | Méthode |
| --- | --- | --- |
| **Mock** | PO, testeur web | `USE_MOCK=true`, micro simulé |
| **Mobile réel** | Artisan, PO | Application Android/iOS, vraie dictée |
| **Banc QA** | Technique | `qa-test-bench.html`, backend seul |

:::warning Limitation web
Sur Chrome sans mock, le micro peut échouer (`_Namespace`). Comportement attendu, utiliser le mock ou un appareil mobile pour les tests vocaux.
:::

## Démo rapide (mock, 5 minutes)

1. Connexion `julien@plomberie.fr` / `password123`
2. Client → Dictée → Terminer → brouillon
3. Modifier un prix, vérifier le total TTC
4. PDF → Partager → Fiche client → Accepté

## Promt de teste

### 🟢 CATEGORIE 1 : Prompts Simples (Courants & Rapides)
1.1. Changement de Robinet de Cuisine (Le classique 10 secondes)
- **Objectif** : Tester la création simple 1 Matériel + 1 Main d'œuvre.
- 🎙️ **Texte à dicter** :
`Remplacement d'un mitigeur d'évier de cuisine à 85 euros, avec deux flexibles de raccordement à 12 euros et une heure de main d'œuvre à 60 euros.`
- 🔍**Résultat attendu** : 2 Lignes matériel (85€ + 12€) + 1 Ligne main d'œuvre (1h x 60€). Urgence = faible ou moyen.
- 
1.2 **Réparation Mécanisme de Chasse d'Eau**
- **Objectif** : Tester la précision d'une marque et d'un temps en minutes.
- 🎙️ **Texte à dicter** :
`Changement du mécanisme complet de chasse d'eau Geberit à 38 euros, avec joint de cuvette à 6 euros et 45 minutes de main d'œuvre.`
- 🔍 **Résultat attendu** : Quantité main d'œuvre = 0.75 heure (ou 45 min), désignation explicite Geberit.
- 
### 🟡 CATEGORIE 2 : Prompts Complexes & Urgences (Multi-lignes)
2.1 **Remplacement Chauffe-eau en Urgence (Fuite d'eau)**
- **Objectif** : Tester la détection d'urgence critique et la décomposition de plusieurs fournitures.
- 🎙️ **Texte à dicter** :
`Intervention d'urgence pour fuite sur ballon percé. Remplacement complet : ballon Thermor blindé 200 litres vertical mural à 450 euros HT, groupe de sécurité SFR neuf à 28 euros, siphon à 10 euros, 3 mètres de tube cuivre 14mm à 9 euros le mètre, et 3 heures et demi de main d'œuvre comprenant la vidange, dépose et mise en décharge de l'ancien.`
- 🔍 **Résultat attendu** :
  - niveau_urgence: "critique"
  - 4 Lignes Matériel (450€ + 28€ + 10€ + 27€ [3m x 9€])
  - 1 Ligne Main d'œuvre (3.5 heures x 60€).
  - 
2.2 **Rénovation Salle de Bain (Multi-matériaux & TVA 10%)**
- **Objectif** : Tester un gros chantier de rénovation.
- 🎙️ **Texte à dicter** :
`Chantier rénovation salle de bain. Fourniture et pose d'un receveur de douche 120 par 80 à 280 euros, une paroi de douche vitrée à 320 euros, un ensemble de robinetterie encastrée Grohe à 210 euros, 10 mètres de tuyau PER en 16 à 3 euros le mètre. Compte 8 heures de main d'œuvre réparties sur deux jours.`
- 🔍 **Résultat attendu** : TVA appliquée = 10% (Rénovation), Main d'œuvre = 8 heures.
  
### 🔴 CATEGORIE 3 : Prompts "Brut de Terrain" (Jargon, Hésitations & Argot)
3.1 **Langage parlé avec hésitations ("Euh", "Genre", "Balles")**
- **Objectif** : Tester la capacité de Whisper et GPT-4o-mini à filtrer les bruits de langage et convertir l'argot en euros.
- 🎙️ **Texte à dicter** :
`Euh ouais salut... alors je sors de chez le client là... c'est bouché sévère sous la baignoire. Euh du coup faut prévoir un dégorgement au furet électrique, mettons 1h30 de boulot. J'ai aussi dû changer le siphon PVC en 40 qui était fendu, genre 15 balles le siphon, et ajoute le forfait déplacement à 45 euros.`
- 🔍 **Résultat attendu** : L'IA ignore les "euh/genre", convertit "15 balles" en 15.00 € HT, crée la ligne "Dégorgement furet (1.5h)" et "Forfait déplacement (45€)".
### 🌍 CATEGORIE 4 : Prompts Multi-Langues (Traduction automatique en Français)
4.1 **Dictée en Portugais**
- **Objectif** : Vérifier que la dictée en Portugais génère un devis 100% rédigé en Français.
- 🎙️ **Texte à dicter** :
`Substituição de torneira de cozinha e reparação de fuga de água sob o lava-loiça. Materiais: torneira nova 75 euros, tubos 15 euros e duas horas de trabalho a 50 euros.`
- 🔍 **Résultat attendu** :
   - langue_orale_detectee: "pt"
   - Lignes rédigées en Français : "Mitigeur de cuisine (75€)", "Tuyauterie et raccords (15€)", "Main d'œuvre (2h x 50€)".
4.2 **Dictée en Arabe**
- **Objectif** : Traduction de l'Arabe vers le Français.
- 🎙️ **Texte à dicter** :
`تبديل سخان الماء القديم بآخر جديد سعة 150 ليتر، مع تغيير صمام الأمان وتثبيته. المواد 380 يورو وساعتين عمل.`
- 🔍 **Résultat attendu** :
  - langue_orale_detectee: "ar"
  - Lignes rédigées en Français : "Chauffe-eau 150L (380€)", "Groupe de sécurité", "Main d'œuvre (2h)".
### 🎯 CATEGORIE 5 : Prompts "Pièges" (Incomplets / Sans Prix)
5.1 **L'artisan oublie de donner les prix (IA Chasseuse de Prix)**
- **Objectif** : L'artisan ne donne aucun prix. L'IA doit utiliser ses prix de marché publics ou tarifs B2B.
- 🎙️ **Texte à dicter** :
`Pose d'un réducteur de pression après le compteur et remplacement du clapet anti-retour. Compte une heure de main d'œuvre.`
- 🔍 **Résultat attendu** : L'IA invente des prix cohérents du marché français (ex: Réducteur ~45€ HT, Clapet ~20€ HT, MO 1h ~60€ HT).
5.2 **L'artisan donne juste du matériel sans temps de main d'œuvre**
- O**bjectif** : L'IA doit estimer le temps de pose métier.
- 🎙️ **Texte à dicter** :
`Changement d'un groupe de sécurité sur un ballon existant.`
- 🔍 **Résultat attendu** : L'IA ajoute automatiquement la fourniture du groupe de sécurité (~25€) ET estime 1h de main d'œuvre pour la pose/vidange   partielle !