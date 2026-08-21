# Portail patient

## Statut : 🟡 Proposé (ANALYSE.MD §1) — dashboard à construire dans `client/`

## Objectif

Après connexion, le patient ne doit plus voir le site marketing mais un **portail patient**
dédié. C'est l'espace personnel de suivi de sa relation avec la clinique.

## Menu du dashboard patient

🟡 Proposé (ANALYSE.MD §1) :

- Tableau de bord
- Mes rendez-vous
- Prendre un rendez-vous
- Historique des visites
- Plan de traitement
- Ordonnances
- Factures et paiements
- Documents médicaux
- Messages avec la clinique
- Profil
- Déconnexion

## Fonctionnalités détaillées

### Rendez-vous

- Consulter ses rendez-vous (à venir et passés) avec leur statut
- Prendre un rendez-vous (même wizard que la vitrine : médecin → créneau → confirmation)
- 🟡 Annuler ou reporter un rendez-vous
- 🟡 Recevoir des rappels SMS/email

### Dossier médical (vue patient)

- Historique des traitements
- Radiographies et photos dentaires (documents `XRAY`, `PHOTO`)
- Notes du dentiste — **selon permissions** (🔴 règle de visibilité à définir, voir
  `Business/business-rules.md`)

### Paiement

- Voir ses factures et leur statut (`UNPAID / PARTIAL / PAID`)
- 🟡 Paiement en ligne (aucun provider choisi à ce jour)
- Historique des paiements

### Communication

- 🟡 Messagerie sécurisée avec la clinique
- Notifications (✅ modèle `Notification` en base : type, message, lu/non lu)

## Correspondance avec le modèle de données

Toutes les données affichées au patient existent déjà dans le schéma Prisma, filtrées par
son `patientId` (et son `clinicId`) : `Appointment`, `MedicalRecord`, `Prescription`,
`Document`, `Invoice`, `Payment`, `Notification`. Le portail patient est donc
principalement un travail **frontend + endpoints de lecture filtrée** — pas de nouveau
modèle de données.
