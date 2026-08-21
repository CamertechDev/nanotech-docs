# Bounded contexts

## Statut : 🟡 Proposé — découpage déduit des 8 modules confirmés + de nos échanges d'architecture

## ⚠️ Lire avant toute implémentation

Ce document propose un découpage en **bounded contexts** (frontières de domaine, au sens
DDD), qui sert à organiser le **code** (namespaces, dossiers, modèles de domaine). Cela
**n'implique pas** que chaque contexte doive être un microservice séparé — voir
`Architecture/architecture.md` pour la position actuelle sur ce point : à ressources
constantes, ces contextes vivent comme des **modules d'un même monolithe modulaire**, avec la
possibilité d'extraction future si un besoin réel de scalabilité indépendante apparaît.

## Les 8 bounded contexts proposés (alignés sur les 8 modules confirmés)

| Bounded context | Modules source | Complexité métier réelle | Traitement DDD recommandé |
|---|---|---|---|
| **Administration** | Fichier, Paramétrages | Faible (référentiels) | CRUD simple, pas de couche domaine riche |
| **Sécurité** | Sécurité/Utilisateurs (sous Fichier) | Faible à moyenne | CRUD + logique d'autorisation (claims) |
| **Forêt** | Forêt (Inventaire, Exploitation, Transport) | **Élevée** (cubage, règles d'exploitation, GPS/parcelles) | DDD riche justifié |
| **Commandes** | Commandes/Contrats | Moyenne (avenants, soldes, workflow contrat) | DDD modéré |
| **Usine** | Usines de Transformation | **Élevée** (mesurages, production, tronçonnage) | DDD riche justifié |
| **Logistique** | Logistiques (Export) | Moyenne (conteneurs, expéditions) | DDD modéré |
| **Transit** | Port Embarquement des Bois | Moyenne (déclarations douanières, AVE) | DDD modéré |
| **Comptabilisation** | Comptabilisation | Moyenne (provisions, tarification) + intégration SAGE | DDD modéré + anti-corruption layer vers SAGE |

## Relations entre contextes (déduites des clés étrangères du schéma SQL)

```
Administration ──→ (référentiels utilisés par tous les autres contextes)
Sécurité       ──→ (transverse : chaque contexte consulte les droits)

Forêt          ──→ Usine        (Roulage/livraison grumes vers parc usine)
Commandes      ──→ Usine        (rapprochement production ↔ commande — 🔴 règle non documentée)
Usine          ──→ Logistique   (production disponible → empotage/expédition)
Commandes      ──→ Logistique   (une commande génère une ou plusieurs expéditions)
Logistique     ──→ Transit      (expédition → dossier douanier/embarquement)
Transit        ──→ Comptabilisation (embarquement confirmé → facturation export)
Usine          ──→ Comptabilisation (vente locale → facturation locale, sans passer par Transit)
```

## Contextes externes (au sens DDD : systèmes hors périmètre, avec anti-corruption layer)

| Contexte externe | Relation | Voir |
|---|---|---|
| GTG | Fournisseur amont du contexte Forêt (inventaire) | `Architecture/api.md` |
| INTERHOLCO (siège) | Fournisseur amont du contexte Commandes | `Architecture/api.md` |
| SAGE | Consommateur aval du contexte Comptabilisation | `Architecture/api.md` |

## Ce qui n'est PAS un bounded context distinct

⚠️ Le module "Contrôle Qualité" identifié dans l'analyse 2018 n'existe plus comme module
séparé dans Expert Bois (voir `Functional/business-processes.md`) — ne pas créer de
bounded context pour lui ; ses données (`tblQualitesBois*`) sont rattachées au contexte
Administration (référentiel de qualités) et consommées par Forêt/Usine.
