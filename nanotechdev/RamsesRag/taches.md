---
sidebar_position: 12
---

# Tâches

## Statut : livrée côté écran et file — l'exécuteur est un processus à part

Une tâche est une question enregistrée, traitée plus tard en **un seul** passage. Le bouton
**Lancer** n'appelle pas le modèle dans la requête.

Vue d'ensemble pour un dirigeant : [Fonctionnalités et valeur](./pour-le-dirigeant.md).

## Valeur pour le dirigeant

L'employé n'a pas à rester devant le chat le temps de la réponse. Il lance, continue autre
chose, et retrouve le texte sur la même page.

La question et le résultat restent à leur auteur. Un collègue, un Admin, le Support et
l'Operator ne lisent pas la tâche d'un autre. Rien n'est déposé dans le Studio et aucun
courriel n'est envoyé. Une notification dans l'application prévient seulement le
propriétaire.

Si le moteur ou l'exécuteur n'est pas prêt, la tâche n'est pas créée. Elle ne reste pas
affichée « en attente » sans que personne ne la prenne.

## Ce que l'employé voit

**Nouvelle tâche** dans la barre, pour un Admin ou un Membre. Page `/taches`.

Deux cartes : le formulaire, puis la liste.

- Titre, question, vase facultatif, compétence facultative.
- **Lancer** crée la tâche et une exécution en file.
- La liste montre l'état : En file, En cours, Terminée, Échec, Annulée.
- **Annuler** n'apparaît que tant que la tâche est en file ou en cours.
- Le texte final s'affiche sur la page. Il n'y a pas de suppression, ni d'écran
  d'historique séparé : la liste est l'historique.
- Plusieurs tâches peuvent coexister.

## Ce que le serveur fait

Avant d'enregistrer, il vérifie deux choses, sans générer de texte.

- Le moteur d'inférence répond (la liste des modèles).
- Un exécuteur `nanoia_worker` est configuré.

Sinon la création est refusée, avec un message clair.

Quand l'exécuteur tourne, il prend une tâche à la fois, revérifie les droits, relit la
question, le vase et la compétence, puis fait **un** appel. Plafond : 120 secondes. Pas
d'outil, pas de second passage. Un dépassement devient un échec. Une annulation demandée
devient Annulée.

Le journal `GET /tasks` toutes les deux secondes est le rafraîchissement de la page. Ce
n'est pas un appel au modèle.

Hors de cette fonction : horaire, agent, envoi par courriel, dépôt dans le Studio.

## Comment le vérifier

1. VM coupée : **Lancer** refuse. Aucune nouvelle ligne en file.
2. VM joignable, exécuteur absent : le message dit qu'aucun exécuteur n'est démarré.
3. Sur une tâche déjà en file, **Annuler**. L'état passe à Annulée.
4. Un second membre n'ouvre pas la tâche du premier.
5. Quand l'exécuteur tourne et que la VM répond : En file, puis En cours, puis Terminée,
   avec le texte sur la page.
