---
sidebar_position: 7
---

# Fonctionnalités et valeur

## Statut : lecture dirigeant

Cette page dit **à quoi sert** chaque fonction déjà visible dans RAMSES Enterprise, pour
quelqu'un qui décide. Le détail technique reste sur la page liée.

RAMSES est installé chez le client. Les documents, la fiche mémoire et les tâches restent
dans son instance. NaNo-IA n'en reçoit pas le contenu.

## Le catalogue

| Fonction | Ce que l'employé fait | Valeur pour le dirigeant | Détail |
|---|---|---|---|
| **Chat direct** | Pose une question, joint au plus trois fichiers | Une réponse immédiate, sans ouvrir un dossier | [Calebasse, vase, chat](./fonctionnalites.md) |
| **Bibliothèque** | Dépose les fichiers de travail | Le savoir de l'entreprise a un lieu, avec une visibilité (personne, département, organisation) | [Calebasse, vase, chat](./fonctionnalites.md) |
| **Vase** | Choisit les documents d'un sujet et discute dessus | La réponse s'appuie sur ces pièces et les cite. On peut la vérifier | [Calebasse, vase, chat](./fonctionnalites.md) |
| **Studio** | Produit un rapport, une carte ou un tableau à partir du vase | Un livrable lisible par la direction, à partir des mêmes sources | [Calebasse, vase, chat](./fonctionnalites.md) |
| **Compétences** | Enregistre une façon de travailler, ou en importe une. Admin et Membre, page `/competences` | La même consigne sert plusieurs fois, sans la réécrire à chaque question | [Compétences](./competences.md) |
| **Tâches** | Lance une question et revient plus tard | Le travail part sans occuper l'écran. Le résultat reste à son auteur | [Tâches](./taches.md) |
| **Mémoire** | Note ce qui doit être relu à chaque question | L'assistant part du rôle et des dossiers de la personne, même sur un autre poste | [Mémoire](./memoire.md) |
| **Paramètres** | L'Admin invite, range les départements, coupe une session, lit le contrat | Qui a un siège, et jusqu'où va l'offre, sans appeler l'éditeur | [Paramètres](./parametres.md) |
| **Compte** | Le membre lit son identité. Un responsable lit son département | Le mot de passe et le rôle ne se changent pas soi-même | [Compte](./compte.md) |
| **Gouvernance** | Règles derrière ces écrans : licence, isolation, équipe NaNo-IA | Ce qui reste dans l'entreprise, et ce qui en sort | [Gouvernance](./gouvernance.md) |
| **Équipe NaNo-IA** | L'Operator ouvre l'accès. Le Support règle le découpage, les formats, les connexions et les partages | Le client garde les mots de passe et ne montre pas ses fichiers à l'éditeur | [Gouvernance — intervention Support](./gouvernance.md#intervention-support) |

## Ce qu'un dirigeant peut retenir

**Le vase protège la décision.** Une question ponctuelle va au chat direct. Un dossier qui
doit être retrouvé et cité va dans un vase. La réponse du vase dit d'où vient le passage.
Si le droit sur un document disparaît, il disparaît aussi des réponses.

**La mémoire ne recopie pas les discussions.** Elle retient des faits stables : métier,
sujet, domaine, projet. L'employé les voit, les corrige et les retire. Il peut couper la
mémoire pour une série de questions, et bloquer les données de santé ou de croyance.
L'écriture automatique après une réponse n'est pas encore branchée.

**Une tâche n'est pas un chat laissé ouvert.** L'employé la lance une fois. L'écran affiche
ensuite l'état, puis le texte. Personne d'autre dans l'organisation ne lit cette question.
Tant que l'exécuteur de l'instance n'est pas démarré, une nouvelle tâche est refusée plutôt
que laissée indéfiniment en attente.

**Une compétence fixe une méthode.** Importer un fichier inconnu passe d'abord par un
contrôle. Un fichier refusé ne crée aucune ligne.

**La facture n'est pas au jeton.** Le plan compte des sièges. Les plafonds du modèle
(fenêtre, appels par minute) évitent de saturer la VM. Ils ne sont pas une ligne de
facture.
