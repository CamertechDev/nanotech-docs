---
sidebar_position: 1
---

# RAMSES RAG — Vue d'ensemble

RAMSES RAG est l'assistant documentaire installé chez le client. Cette section décrit
l'installation réelle : une VM pour l'application, un moteur d'inférence séparé pour les
modèles, puis les trois accès (installateur, activation Admin, application).

## Deux dépôts, deux rôles

| Dépôt | Rôle | Publié |
|---|---|---|
| Dépôt privé du produit | Scripts, Compose, Terraform, licence, clés | Non |
| Ce site (`nanotechdocs.vercel.app`) | Ordre des opérations, décisions, pièges | Oui |

Les scripts restent dans le dépôt privé, dossier `deploy/compose/`. Ce site ne les recopie
pas : une page Vercel est lisible par toute personne qui a l'adresse. Pour installer, il
faut le dépôt privé **et** cette procédure.

## Ce qui est en place à cette étape

- VM Ubuntu 24.04, Docker et Compose v2, pile dans `/opt/nanoia`.
- Conteneurs : Postgres, API, worker, entrée Caddy. Aucun modèle sur cette VM.
- Modèles sur le moteur d'inférence déjà en place (`INFERENCE_PROFILE=external`).
- Console installateur : `https://<hôte>/operator`.
- Application RAMSES : `https://<hôte>/`.
- Premier Admin du client créé via `https://<hôte>/activation-email`.

## Trois accès, trois rôles

| Qui | Adresse | Compte |
|---|---|---|
| Installateur NaNo-IA | `/operator` | `OPERATOR_SEED_EMAIL` + mot de passe temporaire |
| Futur Admin du client | `/activation-email` | Son courriel + code à 12 caractères + mot de passe choisi |
| Utilisateur RAMSES | `/login` | Le compte activé |

`demo-admin@nanoia.local` est un compte de développement local. L'installateur Compose ne
le charge pas. Un échec « Email ou mot de passe incorrect » avec cet identifiant est attendu.

## Pages

| Page | Usage |
|---|---|
| `architecture.md` | Où vont l'application, les modèles, les ports |
| `proxmox.md` | Deux Ubuntu sur le serveur physique du client, avant l'installation |
| `installation.md` | Check-list avant et pendant l'installation |
| `premier-acces.md` | Operator, code d'activation, premier Admin |
| `exploitation.md` | Commandes du dépôt privé, sauvegarde, pannes déjà vues |
| `travail-technique.md` | Pipeline RAG : chunking, embeddings, pgvector, reranking, décodage contraint |
| `pour-le-dirigeant.md` | Catalogue des fonctions et leur valeur pour un chef d'entreprise |
| `fonctionnalites.md` | Calebasse, vase, formats, chat, Studio — le détail déjà livré |
| `competences.md` | Consignes réutilisables : créer, importer, joindre à une tâche. Admin et Membre |
| `parametres.md` | Console Admin : utilisateurs, départements, sessions, politiques, contrat, analytique |
| `compte.md` | Page du membre : identité en lecture, département s'il est responsable |
| `taches.md` | Question lancée une fois, résultat plus tard, lisible seulement par son auteur |
| `memoire.md` | Fiche durable du membre, relue à chaque question |
| `cas-qa.md` | Recettes QA Enterprise (Calebasse, import, Admin, Support, GPU) |
| `gouvernance.md` | Rôles, licence, RLS, équipe NaNo-IA, ce qui sort de l'instance |

L'offre grand public (chat sans RAG) est documentée à part : [RAMSES IA](../RamsesIa/overview.md).
