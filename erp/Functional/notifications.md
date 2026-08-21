# Notifications

## Statut : 🔴 Lacune — existence confirmée par le schéma, comportement non documenté

## Ce qui est confirmé

Une table `tblNOTIFY` existe dans le schéma SQL réel de production. Elle est référencée
depuis `tblCommandesEntete` via une colonne `NotifyID` — ce qui suggère fortement que
"Notify" désigne ici la **partie à notifier** dans un contexte d'export maritime (terme
standard des Incoterms / connaissements : la personne/entité à prévenir à l'arrivée de la
marchandise), et non un système de notifications applicatives (emails, alertes in-app).

## Ce qui n'est pas confirmé (🔴 Lacune)

- Aucune table de notifications applicatives (alertes, emails automatiques, rappels) n'a été
  identifiée dans le schéma des 199 tables — le legacy ne semble pas avoir de système de
  notification interne aux utilisateurs, ou alors il est géré hors base de données (ex :
  fonctionnalité du framework VB/DevExpress, non persistée).
- Aucun besoin de notifications (emails, alertes métier — ex : "stock bas", "commande en
  retard", "document manquant avant embarquement") n'est exprimé explicitement dans les
  documents sources.

## Recommandation

🟡 Proposé : ne pas construire de système de notifications applicatives dans les premières
itérations de la refonte — ce n'est visiblement pas un besoin porté par l'existant. Si le
besoin émerge côté utilisateurs métier (ex : alerter avant une échéance douanière), le
documenter ici avec le déclencheur, le destinataire et le canal avant implémentation, plutôt
que d'anticiper une fonctionnalité non demandée — cohérent avec la contrainte de ressources
limitées du projet (voir `intro.md`).
