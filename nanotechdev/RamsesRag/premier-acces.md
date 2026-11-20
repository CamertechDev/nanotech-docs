---
sidebar_position: 5
---

# Premier accès


Trois écrans, dans cet ordre. Les captures de l'essai du 31 octobre 2026 correspondent
à ces écrans.

## 1. Console Operator

Adresse : `https://<PUBLIC_HOST>/operator`

C'est une page du backend (ApiRag), pas une page de l'application RAMSES.
`https://<PUBLIC_HOST>/api/operator` n'est pas la console : le préfixe `/api` est retiré
par l'entrée, et le navigateur tombe sur l'application WASM.

| Champ | Valeur |
|---|---|
| Email | `OPERATOR_SEED_EMAIL` |
| Mot de passe | Valeur temporaire lue dans les logs API |

Au premier login, la console exige un nouveau mot de passe. Le conserver dans le coffre.
Ce compte règle l'installation (moteur, garde-fous). Il n'est pas l'admin du client.

L'écran attendu : titre « Console Operator », carte « Connexion ».

## 2. Activer l'admin du client

Adresse : `https://<PUBLIC_HOST>/activation-email`

| Champ | Valeur |
|---|---|
| Adresse courriel | Le courriel réel du futur admin, choisi avec le client |
| Code d'activation | `CODE_ACTIVATION_ADMIN`, 12 caractères |
| Mot de passe | Au moins 12 caractères, saisi deux fois |

Le premier utilisateur qui n'est pas le compte Support devient Admin du tenant et
propriétaire. Le compte Support créé à l'`init` ne prend pas cette place.

L'écran attendu : titre « Activer mon compte », quatre champs, lien « Retour à la
connexion ». La page s'ouvre sans `?email=` dans l'adresse.

Le code en clair n'existe plus après l'affichage de `init`. La base ne garde qu'une
empreinte. Un code perdu se remplace depuis la VM, avec la procédure du dépôt privé.
Ne pas le renvoyer par chat.

## 3. Entrer dans RAMSES

Adresse : `https://<PUBLIC_HOST>/login`

Utiliser le courriel et le mot de passe choisis à l'étape 2. L'écran d'accueil affiche
RAMSES, le menu (Chat, Agent, Compétences, Plugins, Programme, Calebasse) et le nom
déduit du courriel en bas à gauche.

`demo-admin@nanoia.local` affiche « Email ou mot de passe incorrect ». C'est le
comportement de cette installation.

## Ce que l'admin peut faire tout de suite

L'interface s'ouvre même si le moteur d'inférence est éteint. Une question au chat
aboutit seulement quand `INFERENCE_ENDPOINT` répond et que les deux modèles y sont
présents. `sudo ./acceptance.sh` le dit avant de quitter le site.

## Compte Support

`SUPPORT_EMAIL` et `SUPPORT_PASSWORD` viennent de `init`. C'est un compte d'intervention
temporaire (`SUPPORT_DURATION_HOURS`, 8 heures par défaut). Il sert au dépannage dans
l'application. Il ne remplace ni l'Operator, ni l'admin activé par le client.
