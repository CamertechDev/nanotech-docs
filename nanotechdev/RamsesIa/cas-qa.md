---
sidebar_position: 7
---

# Cas QA Ramsess-AI

## Statut : 🟡 Campagnes rédigées ; exécution Docker/VM + Cloud Run encore partielle

Les fichiers complets restent dans le dépôt applicatif (`docs/pUBLIC/USE-CASE-QA-*`).
Cette page est l'index **opérateur** : quoi jouer, dans quel ordre, sans données personnelles.

Ne jamais coller un e-mail réel, un secret Neon, un document client ou une carte bancaire
dans une campagne.

## Campagnes déjà spécifiées

| Fichier | Sujet | IDs types |
|---|---|---|
| `USE-CASE-QA-INTERFACE-OPERATEUR.md` | Console `/operator`, profils, isolation chat | OP-01 … |
| `USE-CASE-QA-PROMPT-18-LANGUES.md` | Français par défaut, changement de langue | L-… |
| `USE-CASE-QA-PROMPT-19-SIDEBAR-CHAT.md` | Historique local, projets | SB-… |
| `USE-CASE-QA-PROMPT-20-COMPOSER-MULTIMODAL.md` | Fichiers, caméra, dictée, suggestions | CM-… |
| `USE-CASE-QA-PROMPT-21-OFFICE.md` | DOCX/PPTX OK, PDF/XLSX refusés | OF-… |
| `USE-CASE-QA-PROMPT-22-LECTURE.md` | Volet lecture, Markdown, follow-ups | RD-… |
| `USE-CASE-QA-PROMPT-23-FAIR-USE.md` | Plafonds avant quota | FU-… |
| `USE-CASE-QA-PROMPT-24-EXPORTS.md` | Word / PPTX / PDF GCS | EX-… |
| Spec reset / invitations | Mot de passe oublié, invitations owner | AUTH-… |

## Fumée Cloud Run (à jouer après chaque deploy-public)

| ID | Priorité | Cas | Attendu |
|---|---|---|---|
| CR-01 | Critique | `GET /api/health` via le site Public | 200, sans secret |
| CR-02 | Critique | `/operator` anonyme | Formulaire login, zéro donnée admin |
| CR-03 | Critique | Login owner (`public_platform_operators`) | Console, pas le chat visiteur |
| CR-04 | Critique | Message `bonjour` | Français figé, pas d'appel GPU long |
| CR-05 | Critique | Question française courte | Réponse **française** visible (pas swahili, pas bulle vide) |
| CR-06 | Haute | Image livre / photo | Modèle vision Instruct, texte utile |
| CR-07 | Haute | Export PDF | Objet dans `…-nanoia-public-exports` |
| CR-08 | Haute | Compte visiteur Découverte | 10 messages puis 429 |
| CR-09 | Haute | Visiteur → `/operator` | Refus. Cookie visiteur ≠ cookie owner |
| CR-10 | Moyenne | Dictée | Texte dans le composeur si Speaches est up |

## Isolation (non négociable)

| ID | Cas | Attendu |
|---|---|---|
| ISO-01 | Connexion Neon Public | `Database=nanoia`, `Username=apipublic_app` |
| ISO-02 | Tables operator | `public_platform_operators`, pas `users.role` |
| ISO-03 | Bucket | Public-exports, pas `nanoia-exports` |
| ISO-04 | Appel API RAG depuis le WASM Public | Aucun |

## Profils operator (extrait)

| Profil | Portée |
|---|---|
| `owner` | Tout : forfaits, modèles, invitations, Fair Use |
| `admin` | Exploitation, sans utilisateurs / profils / réglages owner |
| `user` | Finances / analytique selon matrice |
| `partner` | Catalogue des plans |
| Session Public | Zéro |

Le menu UI n'est pas une preuve : rejouer l'API avec le cookie du profil.

## Bloquants connus avant `VALIDE`

- Secret Cloud Run Public encore vu avec un login owner → corriger puis redéployer.
- UI Cloud Run ancienne : pas de lien mot de passe oublié (le code local l'a).
- CinetPay : sandbox / marchand non recetté → rester sur Stub en prod tant que ce n'est pas signé.
- Fair Use et dictée : `PARTIEL` tant que Docker/VM + GPU réel n'ont pas tourné la campagne.
