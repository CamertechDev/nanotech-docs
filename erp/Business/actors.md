# Acteurs et cas d'utilisation

## Statut : ✅ Confirmé pour la méthodologie (spec1 §Introduction) · 🟡 Proposé pour la liste d'acteurs (déduite des modules et du schéma de sécurité)

## Méthodologie source

L'étude de l'existant (spec1) définit ainsi sa méthode : *"Acteur : rôle joué par un
utilisateur humain ou un autre système qui interagit directement avec le système étudié. […]
Cas d'utilisation : un ensemble de séquences d'actions exécutées par le système produisant un
résultat observable intéressant un acteur particulier."* Ce document reprend ce cadre.

## Acteurs humains identifiés

🟡 Déduit des modules et des tables de sécurité (`tblUtilisateurProfil`, `tblOperateur`,
`tblOperateurNature`) — la liste exacte des profils utilisateurs n'est pas énumérée dans les
sources disponibles :

| Acteur | Rattachement | Interagit principalement avec |
|---|---|---|
| Utilisateur système | Un ou plusieurs sites, un profil de droits | Tous les modules selon droits |
| Opérateur terrain | Un site, une "nature" d'opérateur | Forêt (abattage, débardage), Usine (sciage) |
| Secrétaire commercial | Siège/Société | Commandes (`NomSecretaire` sur `tblCommandesEntete`) |
| Trader / Vendeur | Siège | Commandes (`CodeTrader`, `CodeVendeur` sur `tblCommandesEntete`) |
| Administrateur système | Transverse | Sécurité, paramétrage, référentiels |

## Acteurs systèmes externes

✅ Confirmé (voir `Business/business-overview.md` et `Architecture/api.md`) :

| Acteur système | Rôle |
|---|---|
| GTG | Fournit les données d'inventaire forêt |
| Système de commandes INTERHOLCO | Transmet les commandes du siège |
| SAGE | Reçoit les données comptables exportées |

## Cas d'utilisation — état des lieux

🔴 Lacune importante : l'étude 2018 annonce un inventaire de **393 formulaires** analysés sur
le legacy, mais le détail acteur ↔ cas d'utilisation par formulaire n'a pas été extrait dans
cette documentation (volume trop important pour une reprise exhaustive automatique). Le détail
par module doit être reconstitué **au moment de la migration de chaque module**, pas en une
seule passe amont — voir `Functional/use-cases.md` pour la structure à suivre.

## Principe de conception issu de la critique 2018

Récurrent sur presque tous les modules étudiés (Forêt, Usine, Fourches, Commandes, Transit,
Facturation…) : *"Trop de formulaires pour [n] opérations ; [x] formulaires devraient
suffire ; donc par opération deux formulaires : un pour la création et édition, un pour la
lecture, la recherche, la suppression."*

**Cette règle de conception à 2 écrans par entité doit être appliquée systématiquement dans
la nouvelle interface** (voir `Frontend/ui.md`) — c'est la correction directe du défaut le
plus documenté du système legacy.
