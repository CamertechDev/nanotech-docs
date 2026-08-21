# Modèle de domaine

## Statut : ✅ Confirmé (schéma Prisma — source de vérité)

## Bounded contexts

L'application se découpe en deux contextes, alignés sur les deux applications
(voir `Architecture/architecture.md`) :

```
┌─────────────────────────────────┬──────────────────────────────────────────┐
│  CONTEXTE VITRINE (legacy)      │  CONTEXTE CLINIQUE (cible)               │
│  MongoDB — api/                 │  PostgreSQL — server/ (Prisma)           │
│  Auth patient, RDV publics,     │  Tout le domaine métier : patients,      │
│  services                       │  RDV, dossiers, facturation, admin       │
└─────────────────────────────────┴──────────────────────────────────────────┘
```

Le contexte clinique est le seul documenté ici en détail — le legacy est figé.

## Agrégats du contexte clinique

### Identité et accès

```
User (email, password, role, status)
 ├── Patient    (1-1) ── données civiles : dateOfBirth, gender, bloodGroup, phone, address
 ├── Doctor     (1-1) ── specialization, licenseNumber, departmentId
 └── Receptionist(1-1) ── firstName, lastName, phone
```

Le `User` est la racine d'authentification ; le profil du rôle porte les données métier.
`Department` regroupe les dentistes par service de la clinique.

### Planification

```
Doctor ──< TimeSlot   (dayOfWeek, startTime, endTime, maxPatients)
Patient ──< Appointment >── Doctor
              (dateTime, duration=30, status, reason, notes)
```

`TimeSlot` exprime les disponibilités récurrentes du praticien ; `Appointment` matérialise
une réservation. Le cycle de vie du statut est documenté dans
`Business/business-rules.md`.

### Dossier clinique

```
MedicalRecord (diagnosis, treatment, notes)
   ├── lié à un Appointment (1-1 optionnel)
   ├──< Prescription (medications: Json, instructions, issuedAt)
   └──< Document (type: XRAY|PHOTO|PRESCRIPTION|REPORT|OTHER, fileName, filePath)
```

Le dossier médical est la racine de l'agrégat clinique : prescriptions et documents en
dépendent.

### Facturation

```
Invoice (totalAmount, paidAmount, status, dueDate)
   ├── liée à un Appointment (1-1 optionnel)
   ├──< InvoiceItem (description, quantity, unitPrice)
   └──< Payment (amount, method: CASH|CARD|TRANSFER|INSURANCE, reference, paidAt)
```

La facture est la racine : le statut (`UNPAID / PARTIAL / PAID / CANCELLED`) découle du
rapprochement entre `totalAmount` et la somme des `Payment`.

### Transverse

- `Notification` (userId, type, message, isRead) — notifications internes à un utilisateur.
- `AuditLog` (userId, action, entity, entityId, details: Json) — journal d'audit.
- `Settings` (1-1 par `Clinic`) — appointmentLength, workingDays, openTime, closeTime,
  currency (`XOF` par défaut), language (`fr` par défaut).
- `Clinic` — racine multi-tenant : toutes les entités métier portent `clinicId`.

## Énumérations du domaine

✅ Confirmé (schema.prisma) :

| Enum | Valeurs | Usage |
|---|---|---|
| `Role` | `PATIENT`, `DOCTOR`, `RECEPTIONIST`, `ADMIN` | Rôle du compte |
| `Gender` | `MALE`, `FEMALE`, `OTHER` | Civil du patient |
| `AppointmentStatus` | `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`, `NO_SHOW` | Cycle RDV |
| `InvoiceStatus` | `UNPAID`, `PARTIAL`, `PAID`, `CANCELLED` | Cycle facture |
| `PaymentMethod` | `CASH`, `CARD`, `TRANSFER`, `INSURANCE` | Encaissement |
| `DocType` | `XRAY`, `PHOTO`, `PRESCRIPTION`, `REPORT`, `OTHER` | Document médical |

## Invariants à respecter dans le code

- **Tout est rattaché à une clinique** : aucune création d'entité métier sans `clinicId`
  (R3, `Business/business-rules.md`).
- **Une prescription ne peut exister sans dossier médical** (`medicalRecordId` obligatoire).
- **Un rendez-vous ne peut avoir qu'un seul dossier médical et une seule facture**
  (relations 1-1 `@unique` sur `appointmentId`).
- **Le statut de facture reflète les paiements** : ne jamais écrire `status`
  directement sans recalculer depuis `paidAmount`.
- 🔴 Lacune : les règles de transition de `AppointmentStatus` (qui peut passer de quel
  statut à quel statut, et dans quel rôle) ne sont pas codifiées — à spécifier lors de
  l'implémentation du module `appointments`.
