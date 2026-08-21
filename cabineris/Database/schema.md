# Schéma de données

## Statut : ✅ Confirmé (`server/prisma/schema.prisma` — source de vérité, migration initiale `20260622180228_init`)

## Bases en présence

| Base | Techno | Usage | Statut |
|---|---|---|---|
| `dentaldoctordb` | PostgreSQL 18 (port 5432) | Plateforme clinique — **cible** | ✅ Active |
| `doctorappointment` | MongoDB (port 27017) | Vitrine legacy | ✅ Active, figée |

Le schéma ci-dessous couvre uniquement PostgreSQL/Prisma. Le schéma MongoDB legacy n'est
pas documenté (code figé).

## Enums

```prisma
enum Role              { PATIENT DOCTOR RECEPTIONIST ADMIN }
enum Gender            { MALE FEMALE OTHER }
enum AppointmentStatus { PENDING CONFIRMED CANCELLED COMPLETED NO_SHOW }
enum InvoiceStatus     { UNPAID PARTIAL PAID CANCELLED }
enum PaymentMethod     { CASH CARD TRANSFER INSURANCE }
enum DocType           { XRAY PHOTO PRESCRIPTION REPORT OTHER }
```

## Modèles (17)

### Multi-tenant

**`Clinic`** — racine du modèle. Toutes les entités métier portent `clinicId`.

| Champ | Type | Note |
|---|---|---|
| id | String @id @default(uuid()) | |
| name | String | |
| address, phone, email, logo | String? | |
| createdAt / updatedAt | DateTime | |

Relations : `users`, `patients`, `doctors`, `departments`, `appointments`, `invoices`,
`documents`, `settings (1-1)`.

### Identité

**`User`** — compte d'authentification.

| Champ | Type | Note |
|---|---|---|
| id | String @id (uuid) | |
| email | String @unique | login |
| password | String | haché |
| role | Role | |
| status | Boolean @default(true) | désactivation sans suppression |
| clinicId | String | |

Relations 1-1 : `patient`, `doctor`, `receptionist` — + `notifications`, `auditLogs`.

**`Patient`** — profil civil : `userId @unique`, `firstName`, `lastName`,
`dateOfBirth?`, `gender?`, `bloodGroup?`, `phone?`, `address?`, `photo?`, `clinicId`.
Relations : `appointments`, `medicalRecords`, `invoices`, `documents`, `prescriptions`.

**`Doctor`** — profil praticien : `userId @unique`, `firstName`, `lastName`,
`specialization?`, `licenseNumber?`, `departmentId?`, `phone?`, `photo?`, `clinicId`.
Relations : `appointments`, `timeSlots`, `medicalRecords`, `prescriptions`.

**`Receptionist`** — profil accueil : `userId @unique`, `firstName`, `lastName`,
`phone?`, `clinicId`.

**`Department`** — service de la clinique : `name`, `description?`, `clinicId`.
Relation : `doctors`.

### Planification

**`TimeSlot`** — disponibilité récurrente d'un dentiste.

| Champ | Type | Note |
|---|---|---|
| doctorId | String | |
| dayOfWeek | Int | 0 = Lundi, 6 = Dimanche |
| startTime / endTime | String | format "08:00" |
| maxPatients | Int @default(1) | |
| clinicId | String | |

**`Appointment`** — rendez-vous.

| Champ | Type | Note |
|---|---|---|
| patientId / doctorId | String | |
| dateTime | DateTime | |
| duration | Int @default(30) | minutes |
| status | AppointmentStatus @default(PENDING) | |
| reason / notes | String? | |
| clinicId | String | |

Relations 1-1 : `medicalRecord?`, `invoice?`.

### Dossier clinique

**`MedicalRecord`** — `patientId`, `doctorId`, `appointmentId? @unique`, `diagnosis?`,
`treatment?`, `notes?`, `clinicId`. Relations : `prescriptions`, `documents`.

**`Prescription`** — `medicalRecordId`, `patientId`, `doctorId`,
`medications Json` (`[{ name, dosage, frequency, duration }]`), `instructions?`,
`issuedAt @default(now())`, `clinicId`.

**`Document`** — `patientId`, `medicalRecordId?`, `type DocType`, `fileName`,
`filePath`, `uploadedById`, `uploadedAt`, `clinicId`.

### Facturation

**`Invoice`** — `patientId`, `appointmentId? @unique`, `totalAmount Decimal(10,2)`,
`paidAmount Decimal(10,2) @default(0)`, `status InvoiceStatus @default(UNPAID)`,
`dueDate?`, `clinicId`. Relations : `items`, `payments`.

**`InvoiceItem`** — `invoiceId`, `description`, `quantity @default(1)`,
`unitPrice Decimal(10,2)`.

**`Payment`** — `invoiceId`, `amount Decimal(10,2)`, `method PaymentMethod`,
`reference?`, `paidAt @default(now())`, `clinicId`.

### Transverse

**`Notification`** — `userId`, `type`, `message`, `isRead @default(false)`.

**`AuditLog`** — `userId`, `action` (`CREATE, UPDATE, DELETE, LOGIN, LOGOUT`),
`entity`, `entityId?`, `details Json?`.

**`Settings`** — un enregistrement par clinique (`clinicId @unique`) :

| Champ | Défaut | Note |
|---|---|---|
| appointmentLength | 30 | minutes |
| workingDays | `[1,2,3,4,5]` (Json) | 0 = Dim, 1 = Lun… |
| openTime / closeTime | "08:00" / "18:00" | |
| currency | "XOF" | |
| language | "fr" | |

## Conventions observées

- Identifiants : **UUID** partout (`String @id @default(uuid())`).
- Horodatage : `createdAt @default(now())` + `updatedAt @updatedAt` sur les entités
  principales.
- Montants : `Decimal(10, 2)` — jamais de `Float`.
- Multi-tenant : `clinicId` systématique sur les entités métier (R3).
- Pas de suppression en cascade explicite ni de soft-delete : 🟡 politique de suppression
  à définir (RGPD / données de santé).

## Commandes

```bash
cd server
npm run db:migrate    # créer/appliquer une migration après édition du schema
npm run db:generate   # régénérer le Prisma Client
npm run db:studio     # explorer la base en graphique
npm run db:seed       # réinitialiser les données de test
```
