---
sidebar_position: 14
---

# Paramètres (Admin)

## Statut : livré — route unique `/parametres`

Menu du profil → **Paramètres**. Réservé au rôle Admin. Un Membre qui ouvre l'adresse voit
« Cette page est réservée aux administrateurs de votre organisation. » L'API refuse aussi
ces actions : le masquage de l'écran ne suffit pas.

L'Admin du client n'utilise pas `/operator` ni `/plateforme`. Le découpage, les formats,
les hôtes et les dossiers autorisés sont réglés par le Support NaNo-IA. Voir
[Gouvernance — intervention Support](./gouvernance.md#intervention-support).

Vue d'ensemble : [Fonctionnalités et valeur](./pour-le-dirigeant.md). Isolation et licence :
[Gouvernance](./gouvernance.md).

## Valeur pour le dirigeant

C'est le tableau de bord de l'organisation, pas celui de NaNo-IA. L'Admin voit qui occupe
un siège, dans quel département, et peut couper un accès sans attendre l'éditeur.

Le contrat affiché (offre, sièges, échéance) vient de la licence. Il n'y a pas de compteur
de questions. L'analytique compte des personnes, des départements et des documents. Elle
n'affiche pas le contenu des fichiers.

Une politique écrite ici est un texte montré aux gens. Elle n'est pas injectée comme
instruction cachée au modèle.

## Les six sections

| Section | Ce que l'Admin fait | Ce qu'il n'obtient pas |
|---|---|---|
| **Utilisateurs** | Inviter, chercher, renvoyer, révoquer, changer les départements d'un membre, forcer une reconnexion, désactiver ou réactiver un membre | Supprimer le propriétaire. Nommer un Admin délégué : le propriétaire seulement |
| **Départements** | Créer, renommer, supprimer un département métier. Y attacher un lecteur réseau si le déploiement le permet | Renommer ou supprimer le département par défaut (Service TI) |
| **Sessions** | Délai de reconnexion (1 à 30 jours) et d'inactivité (15 à 1 440 minutes). Révoquer toutes les sessions, y compris la sienne | Une session qui resterait ouverte après révocation |
| **Politiques** | Brouillon, publier, archiver. Catégorie, titre, consigne, sévérité | L'accusé de lecture des politiques bloquantes : pas encore livré |
| **Contrat** | Lire l'organisation, l'offre, les sièges utilisés sur le plafond, l'échéance | Modifier le plafond. Ça se fait par une nouvelle licence |
| **Analytique** | Actifs, actifs sur 30 jours, invitations en attente, départements, documents | Le texte des documents ou des questions |

Si un accès Support NaNo-IA est ouvert, une bannière le dit : courriel et date de fin.
Elle ne liste pas les documents lus.

## Invitation

Deux modes.

- **Courriel** : une adresse valide, un département métier. Le siège est réservé tant que
  l'invitation est en attente, y compris un code non utilisé.
- **Fiche imprimée** : nom, identifiant local, courriel de contact facultatif. Le code à
  usage unique s'affiche une fois, à remettre en main propre. Le mot de passe permanent
  est choisi par la personne.

Le bouton **Nouvel utilisateur** reste inactif tant qu'aucun département n'existe.
Une case permet de nommer la personne responsable du département choisi.

Désactiver un membre coupe ses sessions et libère le siège. Les documents ne sont pas
effacés.

## Lecteurs réseau

Depuis un département : nom du lecteur, racine déjà autorisée (un libellé, jamais un
chemin saisi à la main), sous-dossier, synchronisation. Si le déploiement ne les propose
pas, l'écran le dit. Rien n'est indexé depuis le poste de l'Admin.

## Bases de données

Paramètres → **Bases de données**. L'Admin choisit un point déjà autorisé par le Support
(le libellé seul), puis saisit la base, l'utilisateur, le mot de passe et les vues. Il ne
saisit pas l'hôte. Le test de compte SQL est sur cet écran, pas sur `/plateforme`.

## Bases de données

Paramètres → **Bases de données**. L'Admin choisit un point déjà autorisé par le Support
(le libellé seul), puis saisit la base, l'utilisateur, le mot de passe et les vues. Il ne
saisit pas l'hôte. Le test de compte SQL est sur cet écran, pas sur `/plateforme`.

## Bases de données

Paramètres → **Bases de données**. L'Admin choisit un point déjà autorisé par le Support
(le libellé seul), puis saisit la base, l'utilisateur, le mot de passe et les vues. Il ne
saisit pas l'hôte. Le test de compte SQL est sur cet écran, pas sur `/plateforme`.

## Fonctions du même rôle, hors de cette page

Paramètres ne contient pas le travail documentaire. Un Admin y accède comme un membre.

| Écran | Usage |
|---|---|
| [Compétences](./competences.md) | Créer, importer, réutiliser une consigne. `/competences` |
| [Mémoire](./memoire.md) | Sa fiche, pas celle des autres |
| [Tâches](./taches.md) | Ses questions lancées, pas celles des autres |
| [Calebasse, vase, chat](./fonctionnalites.md) | Bibliothèque, vases, Studio |
| [Compte](./compte.md) | Son identité, en lecture |

**Plugins** (`/plugins`) est un écran Admin distinct. Il n'est pas une section de
Paramètres et il n'est pas ouvert aux membres.
