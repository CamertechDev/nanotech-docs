# Services de domaine

## Statut : 🟡 Proposé — candidats déduits des tables de calcul/tarification identifiées dans le schéma et les spécifications

## Principe

Un service de domaine encapsule une logique métier qui ne relève naturellement d'aucun
agrégat unique (souvent parce qu'elle combine plusieurs agrégats ou référentiels). Les
candidats ci-dessous sont identifiés par la présence de tables de calcul/tarification dans le
schéma — **la formule de calcul elle-même reste à documenter** (🔴 lacune récurrente, voir
`Business/business-rules.md`).

## Services candidats

| Service | Rôle probable | Tables impliquées | Statut formule |
|---|---|---|---|
| `CubageCalculationService` | Calcule le volume d'une grume/bille selon l'essence et sa méthode de cubage | `tblTarifCubage`, `tblEssenceDiametreExploitation`, `tblMesurageVolumes` | 🔴 Formule non documentée |
| `TarificationService` | Détermine le prix applicable à une qualité de bois à une date donnée | `tblQualitesTarification`, `tblTarificationBois` | 🔴 Formule non documentée |
| `ProvisionCalculationService` | Calcule les provisions dues aux prestataires/taxes étatiques | `tblPrestationsModulesMiseFobTarifs`, module "Provisions" (GW spec §1.2.8.3) | 🔴 Formule non documentée |
| `CommandeSoldeService` | Calcule le solde restant à honorer sur une commande | `tblCommandesSoldes`, `tblCommandesSoldesNature` | 🔴 Logique non documentée |
| `SageExportService` | Anti-corruption layer : traduit les factures internes vers le format attendu par SAGE | `tblComptabilisationTransfertsFacturesSage` | 🔴 Format d'échange SAGE non documenté |

## Recommandation

🟡 Proposé : traiter chacun de ces services comme un **jalon de recherche métier obligatoire**
avant l'implémentation du module correspondant, pas comme un simple ticket de développement.
Documenter la formule validée directement dans ce fichier (avec exemple chiffré) avant
d'écrire le code — ces calculs ont un impact financier direct et une erreur serait coûteuse
et difficile à détecter a posteriori sans tests de non-régression basés sur des cas réels du
système actuel.
