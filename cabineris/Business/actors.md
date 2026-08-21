# Acteurs

## Statut : ✅ Confirmé (enum `Role` du schéma Prisma, ANALYSE.MD)

## Les quatre rôles

✅ Confirmé — le schéma Prisma définit exactement quatre rôles (`Database/schema.md`) :

```
User (compte d'authentification : email, mot de passe, statut)
│
├── PATIENT        → portail patient
├── DOCTOR         → portail staff (agenda, dossiers, prescriptions)
├── RECEPTIONIST   → portail staff (accueil, planification, encaissements)
└── ADMIN          → administration complète de la clinique
```

Chaque rôle possède un **profil dédié** en base (`Patient`, `Doctor`, `Receptionist`)
relié 1-1 au compte `User`. L'administrateur n'a pas de profil étendu : son compte `User`
suffit.

## Patient

Le patient est un visiteur qui s'est inscrit. Une fois connecté, il quitte le site
marketing pour un **portail patient** (🟡 ANALYSE.MD §1 — dashboard à construire) :

- Tableau de bord, mes rendez-vous, prise de rendez-vous
- Historique des visites, plan de traitement
- Ordonnances, documents médicaux (radiographies, photos dentaires)
- Factures et paiements
- Messages avec la clinique, notifications (rappels SMS/email 🟡)
- Profil

## Dentiste (Doctor)

Le dentiste gère son activité clinique :

- Agenda : voir son calendrier, accepter ou déplacer un rendez-vous
- Patients : rechercher, créer, modifier le dossier
- Consultation : notes cliniques, diagnostic, plan de traitement
- Radiographies et photos (documents rattachés au dossier)
- Prescriptions : créer une ordonnance, historique
- Facturation et rapports liés à son activité

✅ Confirmé : le profil `Doctor` porte `specialization`, `licenseNumber` et un rattachement
optionnel à un `Department`.

## Réceptionniste

La réceptionniste est l'interface opérationnelle de la clinique :

- Agenda général (tous les praticiens)
- Rendez-vous : planifier, confirmer, déplacer
- Enregistrer un patient
- Facturation : encaisser les paiements, imprimer les reçus
- Rapports simples

## Administrateur

L'administrateur configure et supervise la clinique :

- Gestion des utilisateurs (dentistes, réceptionnistes, patients) et des rôles
- Services dentaires, départements
- Facturation, assurances 🟡, inventaire 🟡
- Rapports globaux
- Paramètres système : configuration de la clinique, horaires, devise, langue
  (✅ modèle `Settings` en base)
- Audit des actions (✅ modèle `AuditLog` en base), sauvegardes 🟡

## Matrice de visibilité (principe)

✅ Confirmé (ANALYSE.MD §2) : chaque rôle ne voit que ce qu'il doit gérer, selon le
**minimum d'accès nécessaire**. Les "doctors" et les "clients" ont tous un compte, mais
pas le même tableau de bord ni les mêmes permissions.

| Fonctionnalité | Patient | Dentiste | Réceptionniste | Admin |
|---|---|---|---|---|
| Prendre RDV | ✅ (soi-même) | ✅ | ✅ (tout patient) | ✅ |
| Dossier médical | 🔒 le sien (partiel) | ✅ | ❌ | ✅ |
| Prescriptions | 🔒 lecture des siennes | ✅ création | ❌ | ✅ |
| Facturation | 🔒 ses factures | ✅ | ✅ encaissements | ✅ |
| Paramètres clinique | ❌ | ❌ | ❌ | ✅ |
| Audit log | ❌ | ❌ | ❌ | ✅ |

🟡 Cette matrice est une déduction raisonnable à partir d'ANALYSE.MD — les permissions
fines restent à implémenter côté `server/` (voir `Architecture/security.md`).
