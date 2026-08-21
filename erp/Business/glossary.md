# Glossaire métier

## Statut : 🟡 Proposé (termes déduits des noms de tables SQL réels et des libellés de modules — définitions à faire valider par un métier IFO, aucune définition formelle trouvée dans les sources)

Ce glossaire liste les termes métier rencontrés dans le schéma de base de données et les
spécifications. Les définitions sont des **hypothèses de travail** basées sur le nom des
tables/colonnes et le contexte — à confirmer avec un utilisateur métier avant de les figer
dans le code (noms de classes de domaine, DTO, libellés UI).

## Forêt / Exploitation

| Terme | Hypothèse de définition | Source |
|---|---|---|
| **AAC** (Assiette Annuelle de Coupe) | Zone forestière découpée et allouée à l'exploitation pour une année donnée | `tblAssietteAnnuelleCoupe` |
| **UFP** (Unité Forestière de Production) | Zone forestière d'exploitation de plus long terme (regroupe plusieurs AAC) | `tblUniteForestiereProduction` |
| **Parcelle** | Subdivision cartographique d'une AAC, avec coordonnées GPS | `tblParcelles`, `tblCOORTR` |
| **Abattage** | Opération de coupe d'un arbre inventorié en forêt | `tblAbattageDetails`, `tblArbresInventories` |
| **Étêtage** (tronçonnage brousse) | Tronçonnage réalisé en forêt après abattage | `tblEtetageDetails` |
| **Débardage** | Déplacement des grumes du lieu d'abattage vers un point de collecte | `tblDebardageDetails` |
| **Débusquage** | Opération de traction/extraction des grumes en forêt | `tblDebusquageDetails` |
| **Repasse** | Reprise/second passage d'exploitation sur une zone déjà exploitée | `tblAbattageDetailsRepasse` |
| **Roulage** | Transport des grumes de la forêt vers l'usine/le parc | `tblRoulageForet`, `tblRoulageForetDetails` |
| **Essence** | Espèce d'arbre exploitée (chaque essence a un mode de cubage, une densité, un diamètre exploitable) | `tblEssence`, `tblEssenceGroupes` |
| **Cubage** | Calcul de volume d'une grume/pièce de bois selon des règles par essence | `tblTarifCubage`, `1.2.1.8` (spec Expert Bois) |

## Usine / Transformation

| Terme | Hypothèse de définition | Source |
|---|---|---|
| **Grume** | Tronc d'arbre abattu, non transformé, réceptionné à l'usine | `tblGrumesUsine` |
| **Parc** | Zone de stockage/tri des grumes ou produits à l'usine | `tblParc`, `tblGrumesUsineMouvementsParcs` |
| **Tronçonnage** | Découpe d'une grume en billes plus courtes | `tblTronconnageForetBilles`, `tblGrumesUsineTronconnageParc` |
| **Sciage** | Transformation d'une grume/bille en produits sciés (planches, débités) | `tblUsineSciage`, `tblSciagesEntete` |
| **Débité(s)** | Produit issu du sciage (planches, madriers) — vente locale ou export | `tblDebitesLocales` |
| **Fourche** | Produit particulier issu du sciage (partie d'embranchement de l'arbre) | Module historique "Fourches" (spec1 §5.6) |
| **Lamellé-collé** | Produit transformé assemblé à partir de lamelles de bois collées | `tblLamellesCollesChaineProduction` |
| **Séchoir** | Installation de séchage du bois scié | `tblChambresSechoirs` |

## Commandes / Vente

| Terme | Hypothèse de définition | Source |
|---|---|---|
| **Mercuriale** | Grille tarifaire/catalogue produits servant de base aux commandes | `tblQualitesTarification`, module "Mercuriale" (pptx) |
| **Contrat / Commande** | Matérialisation interne d'une commande client transmise par le siège (INTERHOLCO) | `tblCommandesEntete`, `tblCommandesDetails` |
| **Avenant** | Modification d'un contrat existant | `tblCommandesAvenant` |
| **Notify** | Partie à notifier lors de l'expédition (Incoterm export) | `tblNOTIFY`, `NotifyID` sur `tblCommandesEntete` |

## Logistique / Export

| Terme | Hypothèse de définition | Source |
|---|---|---|
| **Empotage** | Chargement du bois dans un conteneur | `tblEmpotages` |
| **Conteneur** | Unité de transport maritime, avec mouvements et origine tracés | `tblConteneurs`, `tblConteneursMouvements` |
| **Expédition** | Envoi d'une ou plusieurs commandes vers un port | `tblExpeditions` |
| **Bill of Lading (BL)** | Connaissement maritime, document de transport | `tblTransitBillOfLeading` |
| **AVE** (Attestation de Vérification à l'Embarquement) | Document douanier de contrôle avant embarquement | `tblAttestationVerificationExport`, `tblDossiersRedevancesAVE` |
| **Transit** | Ensemble des opérations au port avant/pendant embarquement | `tblTransitBois*` (nombreuses tables) |

## Comptabilisation

| Terme | Hypothèse de définition | Source |
|---|---|---|
| **Facture export** | Facturation liée à une commande exportée | `tblComptabiliteFactureExport` |
| **Facture locale** | Facturation liée à une vente locale (non export) | `tblComptabiliteFactureLocale` |
| **Provision** | Montant réservé/calculé à partir de grilles tarifaires (prestataires, taxes) | `tblPrestationsModulesMiseFobTarifs`, module "Provisions" (spec Expert Bois §1.2.8.3) |
| **Prestataire** | Tiers intervenant sur une opération (transport, manutention…), facturé selon un tarif | `tblPrestataires`, `tblPrestationsFactures` |

## Sécurité / Utilisateurs

| Terme | Hypothèse de définition | Source |
|---|---|---|
| **Profil** | Ensemble de droits attribuable à un utilisateur | `tblUtilisateurProfil`, `tblUtilisateurDroit` |
| **Opérateur** | Personne physique intervenant sur une opération terrain (distinct d'un utilisateur système) | `tblOperateur`, `tblOperateurNature` |
| **Module GB** | Unité fonctionnelle du logiciel activable par site/profil | `tblModuleGB`, `tblSiteOperationModulesGB` |

---
🔴 Lacune : ce glossaire doit être revu avec un référent métier IFO avant d'être considéré
comme faisant autorité — plusieurs définitions (Fourche, Repasse, Notify) sont des inférences
raisonnables mais non confirmées par une source textuelle explicite.
