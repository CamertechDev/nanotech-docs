# Permissions et sécurité applicative

## Statut : ✅ Confirmé pour le modèle de données · 🔴 Lacune pour le détail des droits par profil

## Modèle observé dans le schéma SQL réel

```
tblUtilisateur ──< tblUtilisateurProfil >── tblUtilisateurDroit
      │
      └──< tblUtilisateurModules >── tblModuleGB
      │
      └── (rattachement site — voir organisation.md)

tblSiteOperationModulesGB : modules activables par site d'opération
tblOperateur / tblOperateurNature : acteurs terrain, distincts des utilisateurs système
```

- Un **utilisateur** a un **profil**, qui porte un ensemble de **droits**.
- Un utilisateur a également une liste explicite de **modules** auxquels il a accès
  (`tblUtilisateurModules`), potentiellement indépendante du profil — 🔴 la relation exacte
  entre "droits du profil" et "modules de l'utilisateur" n'est pas explicitée dans les
  sources (redondance ? affinement ? à clarifier en lisant le code VB).
- Les **modules** eux-mêmes sont activables **par site d'opération**
  (`tblSiteOperationModulesGB`) — un module peut donc être visible sur un site et pas un
  autre, indépendamment des droits utilisateur.
- La présentation commerciale (pptx, slide 9) résume ce modèle par : *"The security is based
  on grant"* — cohérent avec un modèle profil + droits explicites, mais sans plus de détail.

## Ce qui est confirmé (✅)

- Il existe une notion de **langue** par utilisateur (`tblLangue`, module Sécurité de GW
  spec §1.2.1.6.2) — l'application est ou doit être multilingue. 🔴 Langues supportées non
  listées dans les sources.
- Il existe une hiérarchie de menus par module (Menu 1 à Menu 5 observée dans GW spec §1.1.x)
  — les droits sont donc potentiellement fins (jusqu'au sous-sous-menu), pas juste "module
  oui/non".

## Ce qui manque (🔴 Lacune)

1. **La liste des profils réels** utilisés en production (Administrateur, Opérateur forêt,
   Comptable, etc.) — non énumérée dans les sources.
2. **La matrice droits × écrans** — quel profil peut créer/lire/modifier/supprimer quoi.
3. **Le périmètre multi-site d'un utilisateur** : un utilisateur peut-il être rattaché à
   plusieurs sites/sociétés, et si oui comment bascule-t-il de contexte ?

## Recommandation de conception pour la nouvelle plateforme

🟡 Proposé (à valider) :
- Modéliser les permissions comme des **claims** ASP.NET Identity/JWT, générés à partir du
  triplet `(Profil, Modules, SiteOperationID)` existant, plutôt que de réinventer un nouveau
  modèle de permissions.
- Prévoir un premier chantier de **reverse engineering du modèle de droits réel** (lecture du
  code VB de gestion des menus/droits, ou export de `tblUtilisateurDroit` en production) avant
  de coder l'autorisation dans le nouveau système — ce n'est pas un module à "deviner".
