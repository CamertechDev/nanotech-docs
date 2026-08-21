# Règles métier

## Statut : mixte — ✅ Confirmé (schéma Prisma, code réel) / 🟡 Proposé (ANALYSE.MD)

## Règles structurelles

| # | Règle | Statut |
|---|---|---|
| R1 | Séparation stricte public / connecté : le visiteur voit la vitrine ; après connexion, l'utilisateur arrive dans un dashboard selon son rôle | ✅ Confirmé (ANALYSE.MD, routes `client/`) |
| R2 | Moindre privilège : chaque rôle n'accède qu'aux données et actions de son périmètre | ✅ Confirmé comme principe, 🟡 implémentation fine à faire |
| R3 | Multi-tenant : toute donnée métier est rattachée à une `Clinic` (`clinicId` obligatoire) ; aucune fuite inter-cliniques | ✅ Confirmé (schéma Prisma) |
| R4 | Un compte `User` = un seul rôle ; les données personnelles vivent dans le profil du rôle (`Patient`, `Doctor`, `Receptionist`) | ✅ Confirmé (relations 1-1 du schéma) |

## Cycle de vie d'un rendez-vous

✅ Confirmé (enum `AppointmentStatus`) :

```
PENDING → CONFIRMED → COMPLETED
   │          │
   └──→ CANCELLED ←──┘
   └──→ NO_SHOW (patient absent)
```

- ✅ Un rendez-vous lie obligatoirement un `Patient`, un `Doctor`, une date/heure et une
  durée (30 min par défaut).
- 🟡 Le patient peut annuler ou reporter son rendez-vous depuis son portail (ANALYSE.MD) —
  à implémenter.
- 🟡 Des rappels SMS/email sont envoyés avant le rendez-vous — Nodemailer disponible côté
  serveur, SMS à choisir.

## Disponibilités des praticiens

✅ Confirmé (modèle `TimeSlot`) : chaque dentiste déclare des créneaux récurrents
(jour de semaine, heure de début/fin, `maxPatients` par créneau). Les horaires généraux
de la clinique (jours ouvrés, heures d'ouverture, durée par défaut des consultations)
sont configurables par clinique (modèle `Settings`).

## Dossier médical

- ✅ Un `MedicalRecord` est créé par un `Doctor` pour un `Patient`, optionnellement lié à
  un `Appointment` précis (relation 1-1).
- ✅ Il contient : diagnostic, traitement, notes — et agrège `Prescription[]` et
  `Document[]` (radiographies, photos, rapports : enum `DocType`).
- 🟡 Règle de confidentialité (ANALYSE.MD) : le patient ne voit les notes du dentiste que
  "selon permissions" — 🔴 la règle exacte de visibilité reste à définir.

## Prescriptions

✅ Confirmé : une ordonnance (`Prescription`) est rattachée à un dossier médical, un
patient et un dentiste. Les médicaments sont stockés en JSON structuré :
`[{ name, dosage, frequency, duration }]`.

## Facturation et paiements

✅ Confirmé (enums `InvoiceStatus`, `PaymentMethod`) :

```
UNPAID → PARTIAL → PAID
   └──→ CANCELLED
```

- Une facture (`Invoice`) peut être liée à un rendez-vous (1-1 optionnel) et se compose de
  lignes (`InvoiceItem` : description, quantité, prix unitaire).
- Le suivi du montant payé (`paidAmount`) pilote le statut.
- Modes de paiement : `CASH`, `CARD`, `TRANSFER`, `INSURANCE`.
- 🟡 La réceptionniste encaisse et imprime les reçus ; le paiement en ligne par le patient
  est envisagé mais aucun provider n'est choisi.
- 🟡 Le mode `INSURANCE` existe en base mais le module assurance (tiers payant, dossiers
  mutuelle) n'est pas spécifié — 🔴 lacune métier.

## Traçabilité

✅ Confirmé (modèle `AuditLog`) : les actions sensibles sont journalisées
(`CREATE, UPDATE, DELETE, LOGIN, LOGOUT`) avec l'utilisateur, l'entité concernée et un
détail JSON. Règle : **toute action d'administration doit être auditée**.

## Modules cibles (vision complète)

🟡 Proposé (ANALYSE.MD §1) — les 13 modules du produit fini :

1. Gestion des patients
2. Gestion des rendez-vous
3. Dossier médical dentaire
4. Traitements dentaires
5. Prescriptions
6. Facturation
7. Paiements
8. Assurance
9. Inventaire
10. Rapports
11. Notifications SMS/Email
12. Portail patient
13. Gestion des utilisateurs

✅ Tous ont leur pendant dans le schéma Prisma ou la structure `server/src/modules/`,
**sauf** l'assurance (8) et l'inventaire (9), absents du modèle de données actuel —
à spécifier avant développement.
