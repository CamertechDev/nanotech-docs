# Portail staff (dentiste et réceptionniste)

## Statut : 🟡 Proposé (ANALYSE.MD §1) — modules backend à construire (ARCHITECTURE.md)

## Objectif

Le portail staff est l'outil de travail quotidien de la clinique. Deux rôles y accèdent
avec des périmètres différents : le **dentiste** (activité clinique) et la
**réceptionniste** (accueil, planification, encaissements).

## Dashboard dentiste

🟡 Proposé (ANALYSE.MD §1) — menu :

- Tableau de bord
- Agenda
- Patients
- Rendez-vous
- Dossiers médicaux
- Traitements
- Facturation
- Prescriptions
- Rapports
- Profil

### Gestion des patients

- Rechercher un patient, créer un patient, modifier le dossier

### Consultation

- Notes cliniques, diagnostic, plan de traitement (✅ `MedicalRecord`)
- Radiographies et photos rattachées au dossier (✅ `Document`, types `XRAY / PHOTO`)

### Agenda

- Voir son calendrier
- Accepter ou déplacer un rendez-vous (passage `PENDING → CONFIRMED`, changement de
  `dateTime`)
- Déclarer ses disponibilités (✅ `TimeSlot` : créneaux récurrents par jour de semaine,
  `maxPatients` par créneau)

### Prescriptions

- Créer une ordonnance : liste de médicaments structurée
  `{ name, dosage, frequency, duration }` + instructions (✅ `Prescription`)
- Historique des prescriptions

## Dashboard réceptionniste

🟡 Proposé (ANALYSE.MD §1) — menu :

- Agenda général (tous les praticiens)
- Rendez-vous
- Patients
- Facturation
- Paiements
- Rapports simples

### Fonctions

- Enregistrer un patient (création du compte + profil `Patient`)
- Planifier un rendez-vous pour un patient
- Confirmer les rendez-vous en attente (`PENDING → CONFIRMED`)
- Encaisser les paiements (✅ `Payment` : `CASH / CARD / TRANSFER / INSURANCE`)
- Imprimer les reçus

## État d'implémentation

✅ Confirmé (ARCHITECTURE.md, FONCT.MD) — au moment de cette documentation :

| Module | Backend `server/` | Frontend `client/` |
|---|---|---|
| Auth (login/register) | ✅ | ✅ |
| Patients, Médecins, Rendez-vous, Time-slots | 🔜 | 🔜 |
| Dossiers médicaux, Prescriptions, Documents | 🔜 | 🔜 |
| Facturation, Paiements, Rapports | 🔜 | 🔜 |

Les dossiers de modules existent dans `server/src/modules/` (voir
`Architecture/backend.md`) : le squelette est en place, la logique reste à écrire.
