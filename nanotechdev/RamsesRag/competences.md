---
sidebar_position: 13
---

# Compétences

Une compétence est une consigne réutilisable. Elle dit au modèle comment répondre, sans
que l'employé réécrive la méthode à chaque question.

Vue d'ensemble pour un dirigeant : [Fonctionnalités et valeur](./pour-le-dirigeant.md).

## Valeur pour le dirigeant

Une façon de travailler (un rapport court pour la direction, un contrôle de conformité, un
vocabulaire d'atelier) devient un objet nommé. Elle sert dans le chat et peut être jointe
à une tâche.

L'import n'est pas un collage aveugle. Le serveur analyse le fichier avant de créer une
ligne. Un fichier refusé n'entre pas. L'employé ne peut pas, par un simple envoi, remplacer
les règles du serveur.

Une compétence qui ne peut pas être exécutée est refusée. Le reste du travail (une tâche
sans compétence, un chat sans compétence) continue.

## Ce que l'employé voit

Page **Compétences** (`/competences`), pour un Admin ou un Membre. Elle n'est pas une
section de [Paramètres](./parametres.md) ni de [Compte](./compte.md).

- **Découvrir** : des exemples proposés. Les ajouter copie une compétence personnelle.
- **Importer** : un fichier YAML, `.zip` ou `.skill`. L'analyse de sécurité a lieu au
  moment d'importer. Le refus n'écrit aucune ligne. Une importation acceptée arrive comme
  brouillon désactivé.
- **Créer avec RAMSES** : quitte la page et ouvre le chat direct. Le brouillon n'est
  enregistré qu'au clic **Créer le brouillon**. Ce n'est pas une recherche dans les
  documents.
- Une compétence visible, activée et qui n'est plus un brouillon peut être choisie dans
  une tâche.

## Ce que le serveur garantit

La compétence suit la session. Un membre ne reçoit pas le corps d'une compétence qu'il n'a
pas le droit d'exécuter. Le choix d'une compétence indisponible sur une tâche répond
« Les compétences ne sont pas disponibles. » La tâche sans compétence reste possible.

## Comment le vérifier

1. Depuis Découvrir, ajouter un exemple. Une compétence personnelle apparaît.
2. Importer un fichier valide. La ligne est un brouillon désactivé.
3. Importer un fichier refusé par l'analyse. Aucune ligne nouvelle.
4. Créer avec RAMSES : l'écran qui s'ouvre est le chat direct, pas le chat d'un vase.
5. Joindre une compétence désactivée à une tâche. La création est refusée. Sans
   compétence, la même tâche peut partir si le moteur et l'exécuteur sont prêts.
