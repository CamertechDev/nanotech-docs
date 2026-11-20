---
sidebar_position: 8
---

# Calebasse, vase, chat et Studio

## Valeur pour le dirigeant

Le chat direct répond à une question ponctuelle. Le vase répond à partir des pièces
choisies et les cite : une décision peut être vérifiée. Le Studio transforme ces mêmes
pièces en rapport, carte ou tableau. La bibliothèque garde les fichiers ; retirer un vase
ne les efface pas.

Le catalogue est sur [Fonctionnalités et valeur](./pour-le-dirigeant.md). Les pages liées :

- [Compétences](./competences.md) — Admin et Membre, hors de Paramètres et de Compte ;
- [Paramètres](./parametres.md) — console Admin ;
- [Compte](./compte.md) — identité du membre ;
- [Tâches](./taches.md) et [Mémoire](./memoire.md).

## Statut : ✅ Confirmé pour ce qui est déjà en production Enterprise

Vocabulaire produit (prompts 9 et 14, `SPEC-NOTEBOOK.MD`) :

| Mot | Signification |
|---|---|
| **Calebasse** | Barre latérale : liste des vases, création, vases récents. |
| **Vase** | Espace personnel à trois zones : Sources, Chat, Studio. Un notebook. |
| **Source** | Document déjà indexé **et** visible, choisi pour ce vase. |
| **Chat direct** | Écran `/`. Pas de `notebookId`. Pas de citations RAG. |
| **Studio** | Livrables générés depuis les sources du vase (rapport, carte, tableau, notes). |

Un vase est une **couche de curation au-dessus de la RLS**. L'ajouter à une source ne crée
aucun droit. Si l'accès au document disparaît, il disparaît des réponses.

```text
Chat direct (/)          Vase (/notebooks/{id})
  message + jointures      sources indexées seulement
  pas d'indexation         RAG + citations
  historique navigateur    vase, sources et artefacts côté serveur
```

Règle dite à l'utilisateur : *question ponctuelle sur un fichier → joindre dans le chat.
Plusieurs documents, retrouver plus tard, citer → ouvrir un vase.*

## Formats de fichiers

Les lecteurs existent pour ces formats (prompts 13 et 21). Un format **implémenté** n'est
accepté que s'il est **coché** pour le tenant par le Support NaNo-IA
([Gouvernance — intervention Support](./gouvernance.md#intervention-support)). Sinon **415**.

| Format | Extensions | Lecture |
|---|---|---|
| Texte | `.txt` | UTF-8, repli Windows-1252 |
| Markdown | `.md` | Texte tel quel |
| PDF | `.pdf` | Couche texte ; PDF scanné : transcription vision si une image de page existe |
| Image | `.png`, `.jpg`, … | Transcription vision (pas Tesseract) |
| Word | `.docx`, `.docm` | Titres → Markdown `#` ; tableaux → tables Markdown ; macros jamais exécutées |
| PowerPoint | `.pptx`, `.pptm` | Sections `## Diapositive N` |
| Excel | `.xlsx`, `.xlsm` | Feuilles visibles en tables Markdown ; formules **non calculées** |
| HTML | `.html`, `.htm` | Texte ; `<script>` ignoré ; rien n'est téléchargé |
| CSV | `.csv` | Colonnes en texte |

Refus explicites :

- anciens binaires `.doc` / `.xls` / `.ppt` (OLE) : enregistrer en Open XML ;
- fichier chiffré ou protégé par mot de passe ;
- fichier sans texte extractible ;
- image interne d'un document Office : **pas** envoyée au modèle vision (seuls PDF scanné et
  fichier image le sont) ;
- plafond import RAG : **20 Mo** (`Rag:MaxUploadBytes`).

On indexe le **texte extrait**, pas le fichier original. Pas de visionneuse Word/Excel dans
cette v1. L'aperçu LibreOffice (prompt 25) est un profil Compose `preview` **hors Cloud Run**.

Trois visibilités à l'import :

| Niveau | Qui le voit | Qui le dépose |
|---|---|---|
| Personnel | Propriétaire (+ Admin) | Tout utilisateur autorisé à importer |
| Département | Membres du département (+ Admin) | Connecteur lecteur réseau, ou dépôt département |
| Organisation | Tout le tenant **côté Admin** | Admin. Un **Membre ne liste pas** les documents Organisation |

## Calebasse

Présente sur `/` et `/notebooks/{id}`.

- **Nouveau vase** : titre obligatoire, puis redirection vers le vase vide.
- Liste des vases de **l'utilisateur courant**. Le vase de A n'apparaît pas chez M
  (même tenant). Coller l'URL → 404, pas de fuite de titre.
- **Vases récents** : fils de **chat direct**. Ils n'ouvrent pas un notebook.
- Lien **Bibliothèque** distinct : indexation, pas un vase.
- Le Support ne voit pas les vases d'un utilisateur (404).

Hors v1 : partage de vase, menu Projet séparé.

## Vase (écran)

Desktop ≥ 1200 px : trois colonnes **Sources | Chat | Studio**. En dessous : onglets,
Chat par défaut. Sources et Studio se replient ; l'état survit au rechargement.

| Action | Effet |
|---|---|
| Renommer | Titre sauvé, Calebasse à jour |
| Supprimer | Confirmation. Les **fichiers restent** en Bibliothèque. Vase, liens et artefacts partent. |
| URL artefact | `/notebooks/{id}/artifacts/{artifactId}` rouvre le détail |

Plafond : 200 sources. Historique du **chat du vase** : `localStorage` du navigateur (perdu
dans un autre profil). Les artefacts Studio, eux, sont en base.

## Sources du vase

- Ajouter depuis la Bibliothèque (documents déjà visibles).
- Importer un fichier (visibilité personnelle, CSRF, page ouverte jusqu'à la fin).
- Coller du texte → document personnel + source.
- Retirer une source : le lien part, le fichier reste en Bibliothèque.
- Chunks à 0 : source listée, chat et Studio bloqués (« découpage n'est pas terminé »).
- Cases du panneau Sources : **lot Studio**, pas une exclusion du chat.

Pas de bouton pièce jointe / image dans le chat du vase : on ajoute une **source**.

## Chat

### Chat direct (`/`)

- Pas de `notebookId`. Pas de sélecteur de vase dans le composeur.
- Images vers le modèle vision.
- Pièces jointes documentaires (prompt 18) : contexte **de la discussion seulement**,
  extract `POST /chat/attachments/extract`, rien stocké côté serveur.
- Max 3 pièces, 10 Mo, ~24 000 caractères. Au-delà : proposer de **créer un vase**.
- Joindre un fichier **dans un vase** → 400 (« ajoute le fichier comme source »).
- Vue **Lecture** à côté du fil (prompt 22) : relire un message déjà produit, sans générer.
- Export d'un message assistant déjà écrit (prompt 24) : `docx`, `pptx` (plafond 30
  diapos), `pdf`. Pas de second appel au modèle. Téléchargement authentifié, pas d'URL
  publique.
- Transcription vocale locale si le paquet Speech est installé chez le client. Pas de
  Web Speech, pas d'Azure, pas de téléchargement de modèle à l'exécution.
- Ligne « Question N jetons · Réponse M jetons » : **budget de fenêtre**, pas une facture.

### Chat du vase

- Composeur inactif tant qu'aucune source n'est indexée.
- SSE, cartes de citations si des extraits existent.
- Hors corpus : le modèle doit le dire, sans inventer un fait documentaire.
- Épingler une réponse → note dans Studio.
- Effacer la discussion : messages locaux seulement.
- `POST /chat/stream` porte le `notebookId`.

Garde-fous GPU (identiques partout) : 5 appels modèle / minute / utilisateur (429 au-delà) ;
texte coupé à 8 000 jetons extraits ; fenêtre 32 768.

## Studio

Génération **depuis les sources du vase**, schéma JSON contraint (prompt 15).

| Livrable | État |
|---|---|
| **Rapport** | Livré et **vendu** (plan commercial). Titre, sections, points clés. |
| **Carte mentale** | Livrée. Arbre HTML `<details>`, pas un canvas graphique. |
| **Tableau** | Livré. Si rien de tabulaire : 200 + « Aucune donnée tabulaire trouvée », pas une bannière d'erreur. |
| **Note manuelle** | Texte utilisateur, pas généré. |
| Présentation, infographie, audio, vidéo, recherche Web | Hors v1. Pas de bouton. |

Lot : cocher N sources → N rapports, plafond 20, progression `i/N`. **Arrêter** ou **quitter
la page** coupe la suite ; les artefacts déjà écrits restent. Pas de file de fond.

Isolation : M ne lit pas un artefact de A (404). Vase trop volumineux : génération possible,
contenu sources tronqué (8 000 jetons).

Le Studio **n'exporte pas** de fichier Office. L'export part d'un **message de conversation**
(prompts 23–24).
