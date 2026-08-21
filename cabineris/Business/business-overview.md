# Vue d'ensemble métier

## Statut : ✅ Confirmé (ANALYSE.MD, ARCHITECTURE.md, schéma Prisma)

## Le métier

Cabineris est une application de **gestion de cabinet dentaire**. Elle couvre deux besoins
distincts qui justifient deux applications séparées :

1. **Attirer et servir les patients** — un site vitrine public présentant le cabinet, ses
   services dentaires, ses médecins et son blog, avec prise de rendez-vous en ligne.
2. **Faire tourner la clinique** — un tableau de bord interne pour le personnel : agenda,
   dossiers patients, traitements, prescriptions, facturation et administration.

La comptabilité générale, l'assurance et l'inventaire ne sont pas couverts à ce jour
(🟡 envisagés, voir `business-rules.md`).

## Découpage en trois espaces (modèle cible)

✅ Confirmé (ANALYSE.MD §2 — "ce que je te recommande") :

```
Site public       → informer et attirer les patients (vitrine, blog, contact, prise de RDV)
Portail patient   → rendez-vous, profil, historique, documents, paiements
Portail staff     → agenda, dossiers, traitements, facturation, administration
```

Le principe fondateur : **les visiteurs, les patients connectés et le personnel ne voient
pas la même application**. Après connexion, chaque utilisateur arrive dans un dashboard
adapté à son rôle, avec le minimum d'accès nécessaire (voir `actors.md`).

## Parcours patient type (vue haute)

```
Visiteur (vitrine)
   → Inscription / Connexion
      → Prise de rendez-vous (choix médecin → créneau → confirmation)
         → Consultation (dentiste : notes cliniques, diagnostic, plan de traitement)
            → Prescription / Documents (ordonnance, radiographies, photos)
               → Facturation (facture → paiement → reçu)
```

## Ambition commerciale : multi-clinique

🟡 Proposé (ANALYSE.MD §1) — si l'objectif est de vendre le logiciel à plusieurs cliniques
dentaires, prévoir dès maintenant un mode multi-tenant :

```
Clinique A                Clinique B
 ├─ Dentistes              ├─ Dentistes
 ├─ Patients               ├─ Patients
 └─ Rendez-vous            └─ Rendez-vous
```

✅ Confirmé : cette exigence est **déjà ancrée dans le schéma de données** — la table
`Clinic` est la racine du modèle et toutes les entités métier portent un `clinicId`
(voir `Database/schema.md`). Toute évolution doit préserver cet isolement par clinique.

## Historique du logiciel

| Période | Événement |
|---|---|
| Origine | Projet open source "Online Doctor Appointment" (stack MERN : MongoDB, Express, React, Node) — vitrine + RDV en ligne |
| ~2026 | Refonte en cours : ajout d'un dashboard clinique complet (`client/` React 18 + `server/` Express/PostgreSQL/Prisma), la vitrine legacy restant en service |

## Systèmes externes connus

| Système | Échange | Statut |
|---|---|---|
| SMS / Email | Rappels de rendez-vous, notifications | 🟡 Proposé (Nodemailer présent côté serveur ; SMS non implémenté) |
| Paiement en ligne | Règlement des factures par le patient | 🟡 Proposé (ANALYSE.MD), aucun provider choisi |
| Firebase | Présent dans les dépendances legacy (auth vitrine historique) | ✅ Confirmé dans `package.json`, rôle exact 🔴 à clarifier |

🔴 Lacune : aucun interlocuteur métier (cabinet pilote, praticien référent) n'est identifié
dans les sources. Les règles de gestion détaillées (durées de consultation, conventions de
numérotation des factures, gestion des assurances) devront être validées avec un cabinet
réel avant implémentation.
