---
sidebar_position: 4
---

# Installer chez le client


Cette page suffit pour refaire l'installation sans assistance, à condition d'avoir le
dépôt privé et une VM Ubuntu 24.04 déjà joignable en SSH. Les commandes ci-dessous
appellent les scripts. Elles ne les remplacent pas.

Si le client n'a qu'un serveur physique, créer d'abord les deux Ubuntu avec
`proxmox.md`, puis revenir ici.

## Avant de partir

1. Vérifier le moteur d'inférence : les modèles `INFERENCE_CHAT_MODEL` et
   `EMBEDDING_MODEL` répondent déjà. Noter son IP interne.
2. Sur le poste de développement, produire la licence. La clé privée reste sur ce poste.

```bash
cd scripts/generate-test-license
dotnet run -- --tier Entreprise --seats 5
```

Copier le JWT seul dans `licence.jwt`. Copier `scripts/generate-test-license/.keys/public.pem`.
Ne pas copier `private.pem`.

3. Préparer `.env` à partir de `deploy/compose/.env.example`. Remplacer chaque valeur
   d'exemple. `IDENTITY_TOKEN_PEPPER` : au moins 32 caractères aléatoires. Ne plus le
   changer après la création des comptes : les codes d'activation sont hashés avec lui.
4. `JWT_PUBLIC_KEY_PEM` : contenu de `public.pem` sur une seule ligne, chaque saut de
   ligne PEM écrit `\n`, guillemets simples conservés.
5. `NANOIA_LICENSE_FILE` : chemin absolu sur la VM, par exemple
   `/opt/nanoia/deploy/compose/licence.jwt`.
6. `OPERATOR_SEED_EMAIL` : le courriel de l'installateur, pas celui de l'admin client.
7. `PUBLIC_HOST` : IP publique ou nom que le navigateur ouvrira.
8. `TLS_MODE=internal` tant qu'il n'y a pas de nom de domaine.
9. Profil d'inférence : le bloc `external` de `architecture.md`.
10. `FORWARDED_KNOWN_NETWORK=172.16.0.0/12`.

Contrôle local du fichier, sans démarrer la pile :

```bash
cd deploy/compose
sudo docker compose --env-file .env -f compose.yml config --quiet
```

## Déposer la pile

Scénario 3, depuis le poste de développement :

```bash
cd deploy/compose
./pack-offline.sh external
```

Transférer l'archive, son SHA-256, `.env`, `licence.jwt` et `public.pem` par un canal
privé (SCP, clé USB). Pas par courriel, pas dans un ticket.

Sur la VM :

```bash
sudo mkdir -p /opt/nanoia
sudo chown "$USER":"$USER" /opt/nanoia
# extraire l'archive dans /opt/nanoia, puis :
cd /opt/nanoia/deploy/compose
chmod 600 .env licence.jwt public.pem
```

Si Docker n'est pas déjà installé (la VM Terraform du labo l'installe au premier boot),
suivre le bloc « Installer Docker » de `deploy/compose/README.md`.

`audit.sh` peut être lancé seul avant d'installer. `install.sh` le relance.

## Lancer

```bash
cd /opt/nanoia/deploy/compose
sudo ./install.sh
sudo ./acceptance.sh
sudo ./doctor.sh
```

Ordre interne de `install.sh` : audit, Postgres, migrations (sans compte de démo),
`init`, démarrage de l'entrée, de l'API et du worker.

## Ce qu'il faut copier avant de quitter la session

`init` écrit une seule fois, sur la sortie de la commande :

```text
CODE_ACTIVATION_ADMIN=............
SUPPORT_EMAIL=...
SUPPORT_PASSWORD=...
```

Le mot de passe Operator est un quatrième secret. Il apparaît une seule fois sur la
sortie standard du conteneur API, au premier démarrage, entre des lignes `====`.
L'email affiché est `OPERATOR_SEED_EMAIL`.

```bash
sudo docker logs "$(sudo docker ps --format '{{.Names}}' | grep api | head -n1)"
```

Copier ces quatre valeurs dans le coffre de l'installateur, hors de la VM.

- Relancer `init` sans `--force` est refusé.
- `init --force` reprend les réglages et n'affiche plus aucun secret.
- Un Operator déjà créé n'est pas régénéré au redémarrage de l'API.
- `/tmp` est vidé quand la VM s'arrête. Le labo GCP s'arrête à minuit, heure de
  Montréal, et ne redémarre pas seul. Une VM client reste allumée. Dans les deux cas,
  ne pas laisser les secrets seulement dans `/tmp` ou dans `docker logs`.

## Après l'installation

Ouvrir `https://<PUBLIC_HOST>/`. Avec `TLS_MODE=internal`, accepter l'avertissement de
certificat. Continuer par `premier-acces.md`.

`acceptance.sh` vérifie `/api/alive`, `/api/health`, le rôle base `nanoia_app`, la RLS
sur `documents`, et un aller-retour vers le moteur. Il ne crée pas un second utilisateur :
cela consommerait le code d'activation du client.
