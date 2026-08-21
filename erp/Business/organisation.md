# Organisation et modèle multi-site

## Statut : ✅ Confirmé (spec2 §3.1, schéma SQL — tables `tblSieges`, `tblSocietes`, `tblSiteOperation`)

## Pourquoi ce document existe

Le **multi-site** est la motivation métier centrale de la refonte engagée en 2018 et poursuivie
aujourd'hui. La critique n°1 du legacy GestionBois (avant Expert Bois) était : *"Le système
n'est pas multi-site, d'où la démultiplication des bases de données en fonction de chaque site
ou pays"*, avec génération manuelle de données du site Congo envoyées au site Cameroun chaque
jour (spec1 §6.2). Toute décision d'architecture doit donc préserver et renforcer, jamais
régresser, la capacité multi-site déjà acquise dans le schéma Expert Bois actuel.

## Hiérarchie organisationnelle

```
Groupe (ex. DANZER)
   └── Siège (ex. INTERHOLCO)
         │  Traite les commandes clients, les répartit aux sociétés opérationnelles
         └── Société (ex. IFO)
               │  Entité morale, rattachée à un pays / une zone géographique
               └── Site d'opération
                     Lieu physique (chantier forestier, usine, port…)
                     Rattaché à des utilisateurs et des opérateurs
                     Un ou plusieurs modules GB activables par site
```

## Correspondance avec le schéma SQL réel

✅ Confirmé — ces tables existent dans la base de production actuelle, dans un **schéma
unique** (pas de duplication par site) :

| Concept | Table(s) |
|---|---|
| Siège | `tblSieges`, `tblSignatures` |
| Société | `tblSocietes` |
| Site d'opération | `tblSiteOperation`, `tblSiteOperationsNatures` |
| Modules activables par site | `tblSiteOperationModulesGB` |
| Port de transit rattaché à un site | `tblSiteOperationsPortsEmbarquements` |

C'est une **bonne nouvelle architecturale** : le multi-site n'est pas à reconcevoir, il est
déjà résolu au niveau du modèle de données. Le travail de la refonte actuelle consiste à
**préserver ce modèle** en le portant sur la nouvelle stack, pas à le réinventer.

## Implication pour l'architecture applicative (voir `Architecture/security.md`)

🟡 Proposé : le filtrage multi-site doit devenir un **filtre transversal appliqué à toutes les
requêtes** (pattern "global query filter" EF Core, ou middleware d'autorisation), basé sur le
`SiteOperationID`/`SocieteID` de l'utilisateur connecté — plutôt qu'une logique dupliquée
manuellement dans chaque écran, comme c'était potentiellement le cas côté client lourd VB.

## Sécurité par site

✅ Confirmé (schéma SQL) : un utilisateur est rattaché à des modules et implicitement à un
périmètre de sites via son profil (`tblUtilisateurModules`, `tblUtilisateurProfil`,
`tblUtilisateurDroit`). Voir `Functional/permissions.md` pour le détail.

🔴 Lacune : les règles exactes de rattachement utilisateur ↔ site(s) multiples (un utilisateur
peut-il opérer sur plusieurs sites simultanément ? changer de site en cours de session ?) ne
sont pas explicitées dans les sources — à clarifier avant de concevoir le modèle
d'authentification/autorisation cible.
