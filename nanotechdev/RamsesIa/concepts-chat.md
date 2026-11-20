---
sidebar_position: 3
---

# Chat et modèles open source

## Statut : ✅ Confirmé dans le code ; les IDs exacts se règlent dans `/operator`

Ramsess-AI n'appelle pas Azure OpenAI ni une API payante par token. Le texte sort d'**Ollama**
sur `ollama-gpu-vm`. La console `/operator > Modèles IA` publie le catalogue vu sous le composeur.

## Concepts du chat

| Concept | Ce que ça veut dire ici |
|---|---|
| **Chat direct** | Seul mode Public. Pas de vase, pas de citations `[Source N]`. |
| **Streaming SSE** | `POST /chat/stream`. La bulle se remplit au fil des fragments. |
| **Prompt serveur** | Le client n'envoie pas de rôle `system`. ApiPublic préfixe le prompt NaNo-IA. |
| **Verrou de langue** | `ChatResponseLanguagePolicy`. Français par défaut. Autre langue seulement si le message est clairement rédigé ainsi. Message court / mal transcrit → français. |
| **Raisonnement `<think>`** | DeepSeek R1 écrit souvent dans un bloc caché. L'UI affiche la réponse **après** `</think>`. S'il n'y a que du raisonnement, ce texte devient la bulle (évite « Réponse 0 jetons »). |
| **Salutation** | `bonjour`, `salut`, `hello`, `hi`, `hey` exacts → réponse française figée, 0 GPU. |
| **Quota** | Un **message utilisateur accepté** par jour, pas des tokens. « Et ensuite ? » consomme 1. |
| **Fair Use** | Plafonds techniques **avant** le quota : taille message, image, `num_predict`, fenêtre de contexte. Identiques entre forfaits au départ. |
| **Follow-ups** | Jusqu'à 3 questions dans un bloc `[FOLLOW_UPS]` (Public les lit encore dans le flux). |
| **Budget jetons** | Compteur visible (question / réponse). La réponse visible ignore le raisonnement masqué. |
| **Historique** | Conversations sidebar surtout **locales** (prompts 19 / 19A / 19B). L'API reçoit un historique borné, sans `system`. |

Un modèle multilingual (DeepSeek, Qwen) **dérive** si le verrou est trop faible. C'est le bug
« réponse en swahili » : français mal transcrit + R1 + historique `hello`. Le verrou et le
repli `<think>` sont dans le code ; Cloud Run ne les a qu'après déploiement de cette révision.

## Modèles open source utilisés

Les identifiants ci-dessous sont ceux **déjà vus** dans le dépôt et les journaux Public.
Le propriétaire peut en publier d'autres s'ils sont **déjà pullés** sur la VM.

| Rôle | Famille | Exemple d'ID Ollama / moteur | Où c'est tranché |
|---|---|---|---|
| Chat texte | DeepSeek R1 (raisonnement) | `deepseek-r1:14b` | Défaut `deploy-public.yaml` (`Ollama__ChatModelId`) |
| Chat texte | Qwen 2.5 | `qwen2.5:14b` | Même VM ; souvent le défaut RAG. Utilisable Public s'il est au catalogue |
| Vision | Qwen3-VL Instruct | `qwen3-vl:8b-instruct` | Journal 2026-11-03 : photo livre validée. **Référence Public** |
| Vision (ancien) | Qwen2.5-VL | `qwen2.5vl:7b` | Valeur historique ApiPublic, à remplacer par Instruct en console |
| Embeddings | nomic | `nomic-embed-text` | **RAG seulement.** Public n'indexe pas |
| Dictée | Faster-Whisper via Speaches | `Systran/faster-whisper-small` / `whisper-large-v3-turbo` | `SPEECH_ENDPOINT`, jamais `OLLAMA_VM_IP` |

Règles d'exploitation :

- **Aucun pull automatique** depuis Cloud Run ou Hugging Face au runtime.
- Chat texte et Vision sont deux modèles. Une image bascule sur `vision_model_id` si le modèle
  choisi ne lit pas les images.
- Instruct (VL) plutôt qu'un modèle « thinking » pour la caméra : moins de `<think>`, réponse visible.
- DeepSeek R1 : latence 30–60 s fréquente. D'où le raccourci salutation et le Fair Use `num_predict`.

## Chaîne Inference.Core

```text
Blazor Public  →  ApiPublic (gates)  →  Inference.Core
                                         Semantic Kernel
                                         connecteur Ollama
                                              ↓
                                      ollama-gpu-vm:11434
```

Même bibliothèque d'inférence que l'Entreprise. **Contrats et plugins métier RAG absents**
côté Public.

## Ce que le composeur envoie au modèle

| Entrée | Traitement |
|---|---|
| Texte | Validé (taille Fair Use) puis historique + prompt serveur |
| Image (fichier / caméra) | MIME + taille ; modèle vision ; pas d'URL d'image inventée rendue en `<img>` |
| Audio | MediaRecorder → `POST /speech/transcribe` → **texte dans le composeur**, pas d'envoi auto |
| DOCX / PPTX / TXT / MD | Extraction serveur, texte marqué « donnée non fiable », compte dans le budget |
| PDF / Excel | **Refusés** en Public (prompt 21) |

Les images Markdown émises par le modèle sont remplacées par un badge « Image non affichée »
(exfiltration + URL fictives).
