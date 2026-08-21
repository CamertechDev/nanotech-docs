# Portail administrateur

## Statut : 🟡 Proposé (ANALYSE.MD §1) — partiellement ancré dans le schéma Prisma

## Objectif

L'administrateur configure la clinique, gère les utilisateurs et supervise l'activité.
C'est le seul rôle ayant accès aux paramètres système et à l'audit.

## Menu du dashboard admin

🟡 Proposé (ANALYSE.MD §1) :

- Utilisateurs
- Dentistes
- Patients
- Services dentaires
- Rendez-vous
- Facturation
- Assurances
- Inventaire
- Rapports
- Paramètres système

## Fonctions

### Gestion des utilisateurs et des rôles

- Créer / activer / désactiver des comptes (✅ `User.status`)
- Gestion des rôles (`PATIENT / DOCTOR / RECEPTIONIST / ADMIN`)
- 🟡 Gestion des permissions fines — 🔴 modèle de permissions non défini au-delà du rôle

### Référentiels de la clinique

- Dentistes : spécialité, numéro de licence, département (✅ `Doctor`, `Department`)
- Services dentaires : 🟡 catalogue des actes et tarifs — 🔴 non modélisé en base à ce
  jour (seules les lignes de facture `InvoiceItem` existent)
- Paramètres : horaires d'ouverture, jours ouvrés, durée par défaut des consultations,
  devise, langue (✅ `Settings`, un enregistrement par clinique)

### Supervision

- Rapports globaux : activité, facturation, fréquentation
- Audit des actions (✅ `AuditLog` : qui, quoi, quand — `CREATE / UPDATE / DELETE /
  LOGIN / LOGOUT`)
- 🟡 Sauvegardes — 🔴 stratégie non définie

### Assurances et inventaire

🟡 Modules annoncés dans ANALYSE.MD mais **absents du schéma Prisma** :

- **Assurances** : suivi des mutuelles, tiers payant (le mode de paiement `INSURANCE`
  existe, sans entité Assurance associée)
- **Inventaire** : stock de consommables du cabinet

🔴 Ces deux modules nécessitent une spécification métier et une extension du schéma avant
tout développement.

## Correspondance backend

Le module `settings` de `server/src/modules/` porte la configuration clinique, et le modèle
`Clinic` est la racine multi-tenant. L'administration agit donc toujours **dans le
périmètre d'une seule clinique** — voir `Business/business-rules.md` (règle R3).
