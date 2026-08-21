# Workflows — chaîne de traçabilité du bois

## Statut : 🟡 Proposé — flux reconstitué à partir des noms de tables et de l'ordre des modules ; les transitions exactes entre statuts ne sont pas documentées dans les sources (🔴 lacune)

## Vue d'ensemble du flux

```
1. FORÊT
   Inventaire des arbres → Abattage → Étêtage → Débardage → Roulage vers usine
   Tables : tblArbresInventories, tblAbattageDetails, tblEtetageDetails,
            tblDebardageDetails, tblRoulageForet(Details)

2. RÉCEPTION USINE
   Réception grume au parc → Tronçonnage → Mouvements de parc
   Tables : tblGrumesUsine, tblGrumesUsineTronconnageParc, tblGrumesUsineMouvementsParcs

3. TRANSFORMATION (Sciage / Débités / Fourches / Lamellé-collé)
   Sciage → Mesurage → Production (sorties) → Séchage (si applicable)
   Tables : tblUsineSciage, tblSciagesEntete, tblSciagesMesurages,
            tblDebitesLocales, tblLamellesProduitIntermediairesProductions,
            tblChambresSechoirs

4. COMMANDES
   Réception commande (du siège INTERHOLCO) → Contrat → Détails/postes → Avenants → Soldes
   Tables : tblCommandesEntete, tblCommandesDetails, tblCommandesAvenant, tblCommandesSoldes

5. LOGISTIQUE
   Rapprochement commande ↔ production → Empotage (conteneur) → Expédition
   Tables : tblEmpotages, tblConteneurs, tblConteneursMouvements, tblExpeditions

6. TRANSIT / PORT D'EMBARQUEMENT
   Déclaration douanière → AVE → Ordre de transit → Embarquement navire → Bill of Lading
   Tables : tblDeclarationsDossier, tblAttestationVerificationExport, tblTransitBoisOrdre,
            tblTransitBoisEmbarquement, tblTransitBillOfLeading, tblNavires

7. COMPTABILISATION
   Facturation export/locale → Provisions (prestataires/taxes) → Export vers SAGE
   Tables : tblComptabiliteFactureExport, tblComptabiliteFactureLocale,
            tblPrestationsFactures, tblComptabilisationTransfertsFacturesSage
```

## Ce qui manque pour que ce flux soit exploitable en conception (🔴 Lacune)

- **Machine à états par entité** : quels sont les statuts possibles d'une commande, d'un
  conteneur, d'une déclaration douanière, et quelles transitions sont autorisées ? Le schéma
  ne contient aucune colonne de type "statut" évidente en dehors de quelques colonnes
  `NatureID`/`TypeID` — 🔴 à extraire du code VB ou par observation de l'application.
- **Règles de rapprochement** entre production réelle (sciage) et commande à honorer : quel
  algorithme ou quel écran effectue ce rapprochement aujourd'hui ? Non documenté dans les
  sources.
- **Règles de calcul du cubage** par essence (mentionnées comme existantes —
  `tblTarifCubage`, `tblEssenceDiametreExploitation` — mais la formule elle-même n'est écrite
  nulle part dans les documents disponibles).
- **Règles de calcul des provisions** (prestataires/taxes étatiques) — le module existe
  (`tblPrestationsModulesMiseFobTarifs`) mais la logique de calcul n'est pas documentée.

## Recommandation pour combler ces lacunes

🟡 Proposé : pour chaque étape du flux ci-dessus, avant de migrer le module correspondant,
produire un complément à ce fichier avec :
- Le diagramme d'états réel de l'entité concernée (observé dans l'app VB)
- La formule de calcul si applicable, validée avec un utilisateur métier
- Un jeu de données d'exemple réel (anonymisé) illustrant un cas nominal et un cas limite
