---
sidebar_position: 3
---

# Hôte Proxmox chez le client

## Statut : 🟡 Proposé

Cette page prépare les deux machines Ubuntu du scénario **B2B chez le client**, quand le
client a un serveur physique et pas encore d'hyperviseur. Les tailles viennent de
`architecture.md`. L'installation de Proxmox et le passage de la carte graphique n'ont
pas été rejoués sur un serveur client : suivre les guides officiels cités plus bas, puis
reprendre `installation.md` dès que les deux Ubuntu répondent en SSH.

Le SaaS et le labo GCP n'utilisent pas Proxmox. Si le client a déjà VMware ou Hyper-V,
créer les deux mêmes Ubuntu là-bas et passer directement à `installation.md`.

## Ce que Proxmox porte

Un nœud Proxmox VE, deux VM :

| VM | Rôle | GPU |
|---|---|---|
| `ramses-rag` | Application, comptes, documents | Aucun |
| `ramses-inference` | `qwen2.5:14b` et `nomic-embed-text` | La carte NVIDIA du serveur, en passthrough |

RAMSES s'installe dans ces Ubuntu. Il ne s'installe pas sur l'hôte Proxmox.

Le serveur physique additionne les deux VM et garde environ 8 Go pour Proxmox.

| | Minimal | Recommandé |
|---|---|---|
| Processeur | 8 cœurs | 16 cœurs |
| Mémoire | 64 Go | 128 Go |
| Disque | 500 Go NVMe | 1 To NVMe |
| Carte graphique | NVIDIA avec au moins 12 Go de VRAM | NVIDIA L4, T4 ou RTX avec 16 Go de VRAM |

Sans carte graphique sur ce serveur, garder la VM RAG chez le client et placer
l'inférence dans le SaaS (scénario hybride de `architecture.md`).

## Installer Proxmox

1. Télécharger l'ISO Proxmox VE 8 depuis [proxmox.com/downloads](https://www.proxmox.com/en/downloads).
2. Démarrer le serveur dessus. Choisir le disque système, un mot de passe root, un
   nom d'hôte et une adresse fixe sur le réseau du client (`vmbr0`).
3. Retirer la clé USB. Ouvrir `https://<ip-du-serveur>:8006`.

Le guide d'installation officiel :
[Install Proxmox VE](https://pve.proxmox.com/wiki/Installation).

Prévoir une demi-heure, plus le temps BIOS. Ce n'est pas l'étape de 15 minutes.

## Créer la VM RAMSES RAG

Une fois Proxmox ouvert, cette VM Ubuntu se crée en un quart d'heure.

1. Télécharger l'ISO Ubuntu 24.04 LTS Server (`ubuntu-24.04-live-server-amd64.iso`) et
   la déposer dans le stockage local, dossier **ISO Images**.
2. **Create VM**.

| Réglage | Valeur |
|---|---|
| Nom | `ramses-rag` |
| ISO | Ubuntu 24.04 LTS Server |
| Type invité | Linux, noyau 6.x |
| Disque | VirtIO SCSI, 100 Go (50 Go au minimum) |
| Processeur | 8 cœurs, type `host` (4 au minimum) |
| Mémoire | 32 Go, fixe, sans ballooning (16 Go au minimum) |
| Réseau | VirtIO sur `vmbr0` |
| Agent QEMU | Activé |

3. Installer Ubuntu Server. Activer OpenSSH. Ne pas installer Docker depuis l'installeur
   Ubuntu : le bloc Docker du dépôt privé le fait ensuite.
4. Noter l'adresse IP. Vérifier `ssh <utilisateur>@<ip-rag>` depuis le poste
   d'installation.

## Créer la VM d'inférence

Même ISO, deuxième VM.

| Réglage | Valeur |
|---|---|
| Nom | `ramses-inference` |
| Machine | `q35`, BIOS OVMF (UEFI) |
| Disque | VirtIO SCSI, 100 Go (50 Go au minimum) |
| Processeur | 8 cœurs, type `host` (4 au minimum) |
| Mémoire | 32 Go, fixe (16 Go au minimum) |
| Réseau | VirtIO sur `vmbr0` |
| PCI | La carte NVIDIA, en passthrough |

Le passthrough PCI se prépare sur l'hôte (IOMMU dans le BIOS, noyau Proxmox, pilote
`nouveau` écarté) avant d'ajouter le périphérique à la VM. Procédure officielle :
[PCI Passthrough](https://pve.proxmox.com/wiki/PCI_Passthrough).

Dans l'Ubuntu d'inférence, la carte est en place quand `nvidia-smi` liste le GPU.
Ollama s'installe ensuite sur cette VM, et les deux modèles y sont chargés avant
`install.sh` sur la VM RAG. Le port `11434` n'accepte que l'adresse de `ramses-rag`.

## Réseau

| Flux | Règle |
|---|---|
| Postes du client vers `ramses-rag` | TCP 80 et 443 |
| Poste de l'installateur vers les deux VM | TCP 22 |
| `ramses-rag` vers `ramses-inference` | TCP 11434 |
| Internet vers `11434`, `5432` ou `8080` | Fermé |
| Interface Proxmox `:8006` | L'installateur seulement |

`INFERENCE_ENDPOINT` sur la VM RAG vaut `http://<ip-de-ramses-inference>:11434`.

## Ensuite

Les deux Ubuntu répondent en SSH. Reprendre `installation.md` : paquet offline, `.env`,
licence, `install.sh` sur `ramses-rag` seulement.
