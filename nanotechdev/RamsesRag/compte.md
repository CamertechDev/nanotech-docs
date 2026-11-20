---
sidebar_position: 15
---

# Compte (membre)

##  `/compte`, lecture seule

Menu du profil → **Compte**. Tout utilisateur connecté l'ouvre : Membre, Admin,
responsable de département.

L'écran dit qui est la personne. Il ne sert pas à changer le mot de passe, le rôle ou
l'organisation. Pour cela, le texte de la page renvoie à l'administrateur.

Vue d'ensemble : [Fonctionnalités et valeur](./pour-le-dirigeant.md).

## Valeur pour le dirigeant

L'identité reste tenue par l'organisation. Un membre voit son courriel, son rôle et le nom
de l'organisation. Il ne s'attribue pas un siège, ne se nomme pas Admin et ne change pas
son mot de passe depuis cet écran.

S'il est responsable d'un département, il voit la liste des collègues de ce département.
Il ne les invite pas, ne les désactive pas et ne lit pas leurs documents, leurs tâches ni
leur mémoire depuis cette page. Ces actions restent dans
[Paramètres](./parametres.md), et seulement pour un Admin.

## Onglet Profil

Affiché pour tout le monde.

| Ligne | Contenu |
|---|---|
| Email | Celui de la session |
| Rôle | Membre ou Admin |
| Organisation | Nom du tenant |
| Utilisateur | Nom affiché et courriel |
| Langue | Français ou English, affiché à l'écran |
| Thème | Défaut, RAMSES ou Noir, affiché à l'écran |

Langue et thème ne sont pas enregistrés. Recharger la page les ramène à l'affichage
initial. Aucune préférence n'est envoyée au serveur.

## Onglet Département

Il n'apparaît que si la personne est **responsable** d'au moins un département. Le titre
« Responsable » s'affiche alors sous le titre de la page.

La liste, en lecture, donne pour chaque personne : nom, courriel, rôle, et si elle est
responsable. S'il y a plusieurs départements, un menu permet de passer de l'un à l'autre.
Une liste vide dit « Aucun membre dans ce département. »

## Fonctions du membre, hors de cette page

Le compte n'est pas le menu de travail. Ces écrans sont ceux d'un Membre et d'un Admin.
Un Membre n'a pas **Paramètres**.

| Écran | Usage |
|---|---|
| [Compétences](./competences.md) | Découvrir un exemple, importer un fichier contrôlé, créer un brouillon avec RAMSES |
| [Mémoire](./memoire.md) | Sa fiche seulement |
| [Tâches](./taches.md) | Lancer, suivre, annuler ses tâches |
| [Calebasse, vase, chat](./fonctionnalites.md) | Questions, documents, livrables |

**Plugins** n'est pas une fonction membre. La page `/plugins` est réservée à l'Admin.
