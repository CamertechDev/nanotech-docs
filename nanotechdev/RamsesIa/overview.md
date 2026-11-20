---
sidebar_position: 1
---

# RAMSES IA — Vue d'ensemble

## Statut : 🟡 Produit Public en cours de mise en service Cloud Run

**RAMSES IA** (marque produit **Ramsess-AI**) est l'offre **grand public**. Ce n'est pas RAMSES RAG.

Le visiteur ouvre un chat dans le navigateur, s'inscrit, consomme un forfait de messages par jour,
et parle à un modèle **open source** hébergé sur une VM GPU NaNo-IA. Il n'y a **pas** de notebook,
**pas** de bibliothèque documentaire, **pas** de RLS tenant.

Sources internes : `docs/pUBLIC/*`, `AGENT-PUBLIC-INSTRUCTIONS.MD`, `src/ApiPublic`,
`src/BlazorWasmRag.Public`.

## Frontière avec RAMSES RAG

| | RAMSES RAG | RAMSES IA (Ramsess-AI) |
|---|---|---|
| Client | Entreprise, installé chez le client ou SaaS B2B | Grand public, SaaS |
| Code | `ApiRag` + `BlazorWasmRag.Enterprise` | `ApiPublic` + `BlazorWasmRag.Public` |
| Données | Postgres du client / Neon Entreprise (`neondb`, rôle `nanoia_app`) | Neon Public (base `nanoia`, rôle `apipublic_app`) |
| Chat | Direct **ou** vase RAG (sources + citations) | Chat seulement |
| Inférence | `ollama-gpu-vm` (souvent Qwen 14B) | Même VM GPU, modèles Public (chat, vision) |
| Déploiement | Compose sur VM RAG, ou Cloud Run Entreprise | Cloud Run `nanoia-public` + `nanoia-public-web` |
| Admin | Operator ApiRag + Admin tenant | Console `/operator` ApiPublic, propriétaire distinct |
| Paiement | Licence JWT | Forfaits + CinetPay (sandbox / stub selon env) |

Un même GPU peut servir les deux. Les bases, cookies, comptes et buckets d'export **ne se mélangent pas**.

## Ce qui est déjà livré (code)

- Chat streamé, historique local, langue par défaut français.
- Composeur multimodal : texte, image, caméra, dictée Whisper, pièces jointes Office.
- Compte visiteur : e-mail, Google, Microsoft, téléphone.
- Forfaits, quotas, Fair Use, console opérateur, invitations, reset mot de passe admin.
- Exports Word / PowerPoint / PDF vers un bucket GCS **Public**.
- Pipelines `migrate-neon-public.yaml` et `deploy-public.yaml`.

Ce qui reste **à valider sur l'environnement cible** (Cloud Run + Neon + GPU) porte le statut
`PARTIEL` dans les journaux de prompts. Un build local ne suffit pas à écrire `VALIDE`.

## Pages de cette section

| Page | Contenu |
|---|---|
| [Architecture](architecture.md) | Cloud Run, Neon, GPU, Whisper, GCS |
| [Chat et modèles](concepts-chat.md) | Concepts du chat, modèles open source |
| [Fonctionnalités](fonctionnalites.md) | Ce que les prompts Public ont réellement livré |
| [Gouvernance](gouvernance.md) | Isolation, rôles, quotas, secrets |
| [Déploiement](deploiement.md) | Neon, Cloud Run, bucket, pièges déjà vus |
| [Cas QA](cas-qa.md) | Recettes Public, pas la campagne RAG |
| [Travail effectué](travail-effectue.md) | Registre des prompts et journaux |

## Légende des statuts

Même convention que le reste de NanoTechDev :

| Statut | Signification |
|---|---|
| ✅ Confirmé | Vérifié dans le code ou sur l'environnement cible |
| 🟡 Proposé / PARTIEL | Livré en code, preuve cible incomplète |
| 🔴 Lacune | Manquant ou bloqué (secret, GPU, marchand) |
