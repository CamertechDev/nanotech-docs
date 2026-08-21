# Value Objects

## Statut : 🟡 Proposé — candidats déduits des tables de mesure/référence sans cycle de vie propre

## Principe de sélection

Une table est candidate "value object" (plutôt qu'entité) si : elle n'a pas de cycle de vie
propre indépendant de son parent, elle est immuable une fois créée, et son identité n'a pas
de sens métier en dehors de sa valeur. Plusieurs petites tables du schéma correspondent à ce
profil et sont aujourd'hui modélisées comme des tables à part entière (avec ID auto-incrémenté)
— ce qui est correct en SQL relationnel, mais ne doit pas se traduire en "entité riche" côté
domaine.

## Candidats identifiés

| Value Object candidat | Table(s) source | Utilisé par |
|---|---|---|
| `Cubage` (volume, méthode de calcul) | `tblTarifCubage`, `tblMesurageVolumes` | Forêt, Usine |
| `Coordonnees` (latitude, longitude, X, Y) | `tblCOORTR` | Forêt (parcelles) |
| `Dimension` (longueur, largeur) | `tblLongueurs`, `tblTypeLargeurs`, `tblTranchesLongueurs` | Usine (sciage) |
| `Densite` (valeur, nature) | `tblDensitesBois`, `tblDensitesBoisNatures` | Forêt (essences) |
| `Qualite` (code, groupe) | `tblQualitesBois`, `tblQualitesBoisGroupe` | Usine, Commandes |
| `Tarif` (montant, devise, période) | `tblTarificationBois`, `tblQualitesTarification` | Commandes, Comptabilisation |
| `Montant` (valeur, devise) | Colonnes monétaires + `tblMonnaies` | Comptabilisation |
| `PeriodeCloture` (date début, date fin) | `tblPeriodeCloture` | Comptabilisation |

## Implication pour le code cible

🟡 Proposé : modéliser ces éléments comme des `record` C# immuables (value objects DDD)
plutôt que des entités EF Core avec identité propre, **sauf** si une table sert aussi de
référentiel partagé consultable/modifiable indépendamment (ex : `tblQualitesBois` est aussi un
référentiel géré depuis l'écran Administration → dans ce cas, garder une entité référentiel
+ un value object pour la valeur "au moment de l'utilisation" dans l'agrégat consommateur,
pattern classique pour éviter qu'une modification du référentiel change rétroactivement les
commandes déjà passées).

🔴 Lacune : le comportement exact attendu en cas de modification d'un référentiel déjà
utilisé (ex : changement de tarif d'une qualité) — rétroactif ou non — n'est pas documenté
et doit être clarifié avant implémentation, car cela a un impact financier direct
(facturation).
