---
sidebar_position: 4
---

# Fonctionnalités livrées

## Statut : 🟡 Code livré selon les prompts Public ; recette Cloud Run incomplète

Cette page résume **ce que le code fait**, d'après `docs/pUBLIC/prompt-*` et le registre
`AGENT-PUBLIC-INSTRUCTIONS.MD`. Ce n'est pas un backlog. Ce qui n'est pas dans le tableau
n'est pas un produit Public.

## Chat visiteur

| Fonction | Prompt / spec | Comportement |
|---|---|---|
| Chat streamé | socle ApiPublic | Cookie + CSRF, SSE, historique borné |
| Langue | prompt 18 | Défaut français ; bouton langue ; pas de `navigator.language` comme vérité |
| Sidebar | 19 / 19A / 19B | Conversations **locales** (IndexedDB), projets, recherche, archive, export JSON, sans GUID dans l'URL vide |
| Composeur | 20 / 20A | Bouton `+`, fichiers, caméra, brouillon conservé |
| Dictée | 20B | Whisper local / Speaches, texte dans le composeur |
| Pièces Office | 21 | DOCX, PPTX, TXT, MD extraits côté API. PDF/XLSX refusés |
| Lecture | 22 / 22B | Volet droit, Markdown, budget jetons, follow-ups, copie, régénérer |
| Export | 24 | Word, PowerPoint, PDF ; PDF via bucket GCS Public |
| Aperçu fidèle | 25 | Service LibreOffice **séparé**, facultatif ; Cloud Run sans soffice |
| Relance | 26 | Reprise après 5xx / timeout, même conversation |
| Auth | spec Google / Microsoft / téléphone | Cookie visiteur, distinct de l'opérateur |

## Quotas et commerce

| Fonction | Où | Comportement |
|---|---|---|
| Forfait Découverte | schéma + `GrantDefaultFreePlanAsync` | 10 messages / jour, gratuit |
| Forfaits payants | `/operator` puis `/billing` | Essentiel / Plus, régions `ouest` (XOF) et `centre` (XAF) |
| 402 / 429 | `/chat/stream` | Pas d'abonnement / quota du jour (minuit UTC) |
| Fair Use | prompt 23 | Limites GPU **avant** le quota commercial |
| Checkout | CinetPay ou Stub | Stub par défaut. Encaissement réel **non validé** marchand |
| Webhooks | `POST /billing/webhook/cinetpay` | Signature + montant ; Flutterwave pas en première recette |

Le client achète des **messages**, jamais des tokens. Les tokens restent un capteur interne.

## Console `/operator`

Pas dans le menu du chat. Cookie opérateur distinct. Dernière connexion (visiteur ou opérateur)
remplace l'autre — voulu.

| Bloc | Qui | Notes |
|---|---|---|
| Forfaits, utilisateurs, insights | `owner` | Création / désactivation |
| Modèles IA, Whisper | `owner` | IDs déjà présents sur la VM |
| Finances | `owner` / `user` | Lecture selon matrice |
| Invitations, profils | `owner` | Jamais un mot de passe affiché durablement |
| Reset mot de passe | e-mail signé | Dans le code actuel ; **ancienne** UI Cloud Run peut ne pas montrer le lien |
| Partenaire | `partner` | Catalogue des plans seulement |

Le propriétaire Public n'est **pas** `users.role = Admin` (table visiteur) ni l'Operator ApiRag.
Table : `public_platform_operators`.

## Hors périmètre Public (volontaire)

- Notebooks, citations, pgvector, import PDF RAG.
- Plugins métier IoT / SQL industriels.
- Téléchargement de poids au runtime.
- Une VM GPU dédiée Public (prévue plus tard, pas livrée).
- Helical Insight dans ce dépôt (URL enregistrée, produit séparé).
