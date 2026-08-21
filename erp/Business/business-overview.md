# Vue d'ensemble métier

## Statut : ✅ Confirmé (spec1 §1, spec2 §1-3.1, pptx slide 3)

## Le métier

GestionBois / Expert Bois est une application métier de **gestion et de traçabilité du bois**,
depuis l'exploitation forestière jusqu'à l'export. Le processus couvert va de la découpe /
production / fabrication à la gestion des commandes, la logistique et la facturation. La
comptabilité financière générale reste assurée par un logiciel tiers, **SAGE**, vers lequel
Expert Bois exporte des données (pas d'intégration bidirectionnelle connue).

## Chaîne de traçabilité (vue haute)

```
Forêt (inventaire, abattage, débardage, tronçonnage)
   → Parc / Usine (réception grumes, sciage, production)
      → Commandes / Contrats (clients)
         → Logistique (conteneurs, expéditions, documentation transit)
            → Port d'embarquement (déclaration douanière, embarquement navire)
               → Comptabilisation (facturation export, export vers SAGE)
```

## Organisation (structure du groupe)

✅ Confirmé (spec2 §3.1) :

```
Groupe (DANZER)
   └── Siège (INTERHOLCO) — traite les commandes clients, les répartit aux sociétés
         └── Société opérationnelle (ex. IFO) — entité morale, pays/zone géographique
               └── Site d'opération — lieu physique où les opérations sont réalisées
```

- Le **siège** négocie les commandes avec les clients puis les transmet aux sociétés
  opérationnelles.
- Une **société** est une entité morale, rattachée à un pays, constituée d'un ensemble de
  sites d'opération.
- Un **site d'opération** est un lieu physique (chantier forestier, usine, port…) où sont
  réalisées les opérations et auquel sont rattachés des utilisateurs et opérateurs.

Cette hiérarchie est le fondement du **multi-site**, qui est la motivation métier n°1 de la
refonte (voir `business-rules.md`).

## Historique du logiciel

| Période | Événement |
|---|---|
| Avant 2018 | GestionBois (VB6 + Component One + GrapeCity), 3 bases SQL Server distinctes (GestionBois, GestionBoisTransit, GestionBoisTrois), une base par site → duplication |
| 2018 | Étude de l'existant + première analyse fonctionnelle de refonte (fusion des 3 modèles, introduction de la notion site/société/siège) |
| ~2018-2023 | Refonte n°1 : consolidation en **Expert Bois**, 15 modules → **8 modules**, base unique, VB.NET + SQL Server 2022 + DevExpress |
| 2026 (en cours) | Refonte n°2 : migration d'Expert Bois vers une stack web (Angular ou Blazor — 🟡 non tranché) |

## Interlocuteurs métier connus

✅ Confirmé (spec2 §3.2) — à tenir à jour au fil du projet :

| Organisation | Rôle |
|---|---|
| IFO Congo | Société opérationnelle, contact terrain |
| IFO Suisse | Chef de projet côté client |
| Danzer | Groupe, sponsor |

## Systèmes externes connus

✅ Confirmé (spec2 §3.4, SQL) — voir aussi `Architecture/api.md` :

| Système | Échange | Sens |
|---|---|---|
| GTG | Données d'inventaire forêt | Import vers Expert Bois |
| Système de commandes INTERHOLCO (siège) | Commandes / contrats | Import vers Expert Bois (manuel ou automatique — 🟡 modalités non spécifiées) |
| SAGE | Comptabilité | Export depuis Expert Bois (table `tblComptabilisationTransfertsFacturesSage` confirmée dans le schéma réel) |

🔴 Lacune : les modalités techniques exactes de ces échanges (format, fréquence, protocole)
ne sont pas documentées dans les sources disponibles et doivent être clarifiées avec IFO/GTG
avant de concevoir les endpoints d'intégration correspondants.
