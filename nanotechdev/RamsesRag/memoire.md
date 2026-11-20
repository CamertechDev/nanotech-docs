---
sidebar_position: 11
---

# Mémoire

## Statut : livrée pour la saisie manuelle — l'écriture après une réponse n'est pas branchée

La mémoire est la fiche durable d'un membre. Elle part avec chacune de ses questions.
Le navigateur n'envoie pas cette fiche : le serveur la charge pour la session.

Vue d'ensemble pour un dirigeant : [Fonctionnalités et valeur](./pour-le-dirigeant.md).

## Valeur pour le dirigeant

L'historique du chat vit dans le navigateur. Le vider, changer de poste ou perdre le cache
ne doit pas effacer ce que la personne a déjà confié : son métier, ses dossiers, la forme
de livrable voulue.

La fiche reste dans l'instance du client. Un Operator n'est pas membre et ne la lit pas.
Un compte Support n'en reçoit pas plus qu'il ne reçoit de documents. Un autre membre, même
Admin, ne lit pas la fiche d'un collègue.

L'employé peut la couper. Les questions suivantes partent alors sans elle. Il peut aussi
refuser l'enregistrement des données sensibles (santé, croyance religieuse).

## Ce que l'employé voit

Menu du profil → **Mémoire**, pour un Admin ou un Membre.

Deux cartes.

1. **Réglages**
   - Utiliser la mémoire : si c'est coupé, la fiche ne part plus avec les questions.
   - Générer à partir des conversations : préférence enregistrée seulement. Aucune ligne
     n'est écrite après une réponse.
   - Ne pas mémoriser les données sensibles : un texte qui contient un terme de santé ou
     de croyance (par exemple « cancer ») est refusé.
   - Importer un Markdown au format de l'export.
   - Exporter la fiche en `memoire.md`.
2. **Fiche**, groupée en **Profil**, **Sujet**, **Domaine**, **Projet**. Chaque ligne a un
   titre, un contenu, une date, un crayon et une corbeille. Le champ du bas ajoute tout de
   suite une ligne Profil, sans appeler le modèle.

Plafonds : 40 lignes, titre 80 caractères, contenu 500 caractères.

## Ce que le serveur fait

À chaque question de chat, et au moment d'exécuter une tâche, le serveur relit la fiche du
propriétaire. Si **Utiliser la mémoire** est actif, il place un résumé devant la question,
compté dans la fenêtre du modèle. Ce résumé n'est pas un document de la bibliothèque : il
n'est pas retrouvé par similarité et il n'est pas cité comme une source.

## Comment le vérifier

1. Ajouter « Je travaille aux heures du Pacifique ». La ligne apparaît sous Profil.
2. La modifier, puis la retirer.
3. Avec le filtre sensible actif, tenter « J'ai un cancer ». L'ajout est refusé.
4. Exporter, puis réimporter le fichier. Les lignes reviennent.
5. Couper **Utiliser la mémoire**, poser une question qui dépend du fait. Le fait ne doit
   plus compter.
6. Ouvrir un second membre. Sa page Mémoire est vide.
