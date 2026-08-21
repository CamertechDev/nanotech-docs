# Règles métier et contraintes de conception

## Statut : mixte — voir statut par section

## 1. Règles issues de la critique de l'existant (✅ Confirmé — spec1 §6)

Ces constats, faits en 2018 sur le legacy GestionBois (avant même Expert Bois), doivent être
traités comme des **contraintes de conception non-négociables** pour la refonte actuelle —
elles n'ont probablement pas toutes été résolues par la refonte n°1 (2018-2023), qui a
consolidé les données mais pas nécessairement l'architecture de déploiement (VB.NET reste un
client lourd).

| # | Constat 2018 | Contrainte pour la refonte actuelle |
|---|---|---|
| 1 | Système non multi-site (bases dupliquées par pays) | ✅ Déjà résolu au niveau données (voir `organisation.md`) — à préserver |
| 2 | Installation obligatoire poste par poste | 🟡 À résoudre par une architecture web (objectif de la refonte actuelle) |
| 3 | Logique métier embarquée dans chaque installation client | 🟡 À centraliser côté serveur/API |
| 4 | Versionnement complexe (désinstallation/réinstallation) | 🟡 Résolu nativement par une architecture web + CI/CD |
| 5 | Prolifération de formulaires quasi-identiques par opération | 🟡 À résoudre par un pattern générique liste + formulaire (voir `Frontend/ui.md`) |
| 6 | Génération/transfert manuel de données site à site | ✅ Résolu par la base unique déjà en place — à préserver dans la nouvelle stack |

## 2. Comptage de référence de l'ancien système (✅ Confirmé — spec1 §6)

- Total formulaires analysés (legacy 15 modules) : **393**
- Total états/rapports : **192**
- Total exports Excel : **117**

Ces chiffres servent de point de comparaison : si le nouveau système, sur 8 modules
consolidés, dépasse significativement ces volumes d'écrans (voir le calcul de 370 écrans dans
l'offre Camertechdev), c'est le signal que le pattern générique n'a pas été appliqué et que le
même défaut est en train de se reproduire.

## 3. Règles de gestion métier détaillées

🔴 **Lacune majeure.** La base de données réelle ne contient **aucune procédure stockée,
aucun trigger, aucune fonction, aucun index métier** (0 sur les 4, confirmé par inspection du
script `BaseDeDonnees_EXPERTBOIS.sql`). Toute la logique de validation et de calcul (règles de
cubage, calcul de provisions, règles de fermeture de contrat, contrôles de cohérence...) vit
exclusivement dans le code client VB, qui n'a pas été fourni pour cette documentation.

**Conséquence pour l'équipe/les agents IA** : ne jamais suppposer une règle de gestion non
documentée ici. Avant d'implémenter la logique d'un module, il faut soit :
1. Lire le code VB source du module correspondant (si disponible), soit
2. Interviewer un utilisateur métier du module, soit
3. Documenter la règle comme hypothèse explicite dans le code et la faire valider avant mise
   en production.

Ne jamais coder une règle de gestion "plausible" sans la marquer comme hypothèse — le risque
d'erreur silencieuse sur des calculs de cubage/facturation a un impact financier direct.

## 4. Règles structurelles confirmées par le schéma (✅ Confirmé)

- Une commande (`tblCommandesEntete`) est toujours rattachée à une société, un port de
  destination et un port d'embarquement (colonnes `NOT NULL`).
- 522 contraintes de clé étrangère sont définies sur 199 tables — la cohérence référentielle
  est globalement bien posée au niveau du schéma, ce qui facilite la migration de données.
- Aucune colonne calculée (`computed column`) n'existe dans le schéma — tous les calculs
  (cubages, totaux, provisions) sont faits applicativement, jamais par la base.
