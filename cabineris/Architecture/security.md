# Sécurité

## Statut : ✅ Confirmé (code réel) / 🟡 pour les permissions fines

## Authentification

✅ Confirmé :

- **JWT** émis par `POST /api/v1/auth/login` (serveur `server/`, port 5002).
- Le frontend `client/` stocke le token et le décode avec `jwt-decode` ; les appels API
  passent par axios avec en-tête `Authorization: Bearer <token>`.
- Génération d'une clé JWT (README.md) :
  ```bash
  openssl rand -base64 64
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- Les mots de passe sont hachés en base (champ `User.password` — 🔴 algorithme exact à
  confirmer à la lecture du module `auth`).

## Autorisation par rôle

✅ Confirmé : quatre rôles (`PATIENT`, `DOCTOR`, `RECEPTIONIST`, `ADMIN`) — voir
`Business/actors.md`. Le frontend applique un **RoleGuard** au niveau du routeur
(`client/src/routes/`) : chaque rôle n'accède qu'à son espace
(`/admin/*`, `/doctor/*`, `/patient/*`…).

🟡 À implémenter côté serveur : la vérification du rôle sur **chaque endpoint** (le garde
frontend seul ne protège rien). Convention attendue : middleware d'autorisation dans
`server/src/shared/middlewares/`, appliqué par module.

## Isolement multi-tenant

✅ Confirmé au niveau données (R3, `Business/business-rules.md`) : toute entité métier
porte `clinicId`.

🟡 À garantir au niveau applicatif : **toute requête doit filtrer par le `clinicId` de
l'utilisateur authentifié** — aucune requête Prisma "nue" sur une entité métier. C'est le
point de contrôle n°1 des revues de code sur ce projet.

## Confidentialité des données de santé

- Les dossiers médicaux (`MedicalRecord`, `Prescription`, `Document`) sont des données de
  santé : accès strictement par rôle (matrice de `Business/actors.md`).
- 🟡 Le patient ne voit les notes du dentiste que "selon permissions" — 🔴 règle exacte à
  définir avant d'exposer `medical-records` au portail patient.
- Les fichiers uploadés (radiographies, photos) transitent par `server/uploads/` —
  🔴 contrôle d'accès aux fichiers à implémenter (ne pas servir en statique public).

## Audit et traçabilité

✅ Confirmé (modèle `AuditLog`) : journaliser `CREATE / UPDATE / DELETE / LOGIN / LOGOUT`
avec utilisateur, entité, identifiant et détail JSON. Toute action d'administration doit
être auditée (règle de `Business/business-rules.md`).

## Désactivation de compte

✅ Confirmé : `User.status` (booléen) permet de désactiver un compte sans le supprimer.
🟡 À vérifier : le login doit rejeter un compte `status = false`.

## Points de vigilance identifiés

| Sujet | Risque | Statut |
|---|---|---|
| Garde côté frontend uniquement | Contournement par appel API direct | 🟡 middleware serveur à généraliser |
| Filtrage `clinicId` | Fuite inter-cliniques | 🟡 discipline de revue à instaurer |
| Fichiers dans `uploads/` | Accès direct aux radiographies | 🔴 à sécuriser |
| Comptes de test seed (`Admin@1234`…) | Oubli en production | 🟡 les désactiver hors dev (voir `DevOps/environments.md`) |
