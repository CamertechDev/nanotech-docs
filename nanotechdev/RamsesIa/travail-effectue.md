---
sidebar_position: 8
---

# Travail déjà effectué

## Statut : ✅ Registre fidèle à `AGENT-PUBLIC-INSTRUCTIONS.MD` (2026-10-30 → 2026-11-04)

Index compact. Le détail reste dans le dépôt applicatif. Dates = journaux agent, pas une
recette Cloud Run.

## Prompts Public livrés

| Prompt | Titre | Livraison code |
|---|---|---|
| 18 | Langues | Défaut français, politique serveur, tests |
| 19 / 19A / 19B | Sidebar | Chats locaux, projets, URL sans GUID à vide |
| 20 / 20A / 20B | Composeur | Fichiers, caméra, dictée Whisper |
| 21 | Office | Extraction DOCX/PPTX/TXT/MD |
| 22 / 22B | Lecture | Split view, Markdown, follow-ups |
| 23 | Fair Use | Limites avant quota, `num_predict` |
| 24 | Exports | Word / PPTX / PDF + GCS Public |
| 25 | Aperçu fidèle | Optionnel, pas dans l'image Cloud Run |
| 26 | Relance | Reprise 5xx / timeout |

Autour : operator (invitations, reset, profils), billing (schema, CinetPay stub), OAuth,
pipelines Neon / Cloud Run, isolation cookies.

## Infra déjà posée

- Terraform Cloud Run prod : services Public + bucket `…-nanoia-public-exports`.
- `deploy-public.yaml` : garde-fou `apipublic_app`, bucket 403 = warning.
- `migrate-neon-public.yaml` : `schema.sql` idempotent.
- GPU partagé `ollama-gpu-vm` ; Whisper / Speaches configurables.

## Corrections récentes (chat)

- Verrou de langue (plus de swahili sur « hello » / dictée courte).
- Repli si DeepSeek ne sort que du `<think>`.
- Salutation exacte sans GPU.

Ces correctifs sont dans le **repo**. Ils n'apparaissent en prod qu'après `deploy-public`.

## Pages proposées ensuite (pas encore rédigées ici)

À créer quand le besoin opérateur se précise — **pas** avant d'avoir un secret Neon correct :

| Page | Pourquoi |
|---|---|
| Runbook incidents | GPU timeout, 402/429, cookie croisé, OAuth 400 |
| Facturation marchande | Conversion `amount_cents` → CFA, webhook, remboursement |
| Catalogue modèles | Procédure `ollama pull` + publication `/operator` |
| Speech server | Speaches vs Ollama, modèles déjà disque, HTTPS micro |
| Matrice cookies | Visiteur / owner / RAG, domaines Cloud Run |
| Changelog révisions | Lier un tag git à une révision Cloud Run |

Ne pas documenter ici : notebooks RAG, pgvector, Calebasse, plugins IoT — c'est
[RAMSES RAG](../RamsesRag/overview.md).
