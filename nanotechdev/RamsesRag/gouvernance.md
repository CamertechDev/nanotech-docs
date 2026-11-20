---
sidebar_position: 10
---

# Gouvernance

RAMSES RAG est un produit **multi-tenant installé chez le client** (ou en SaaS NaNo-IA).
La gouvernance couvre qui entre, ce qu'il voit, ce qui sort, et qui intervient.

Cette page ne remplace pas un avis juridique. Elle décrit **ce que le code fait**.

## Acteurs

| Acteur | Origine | Siège | Portée |
|---|---|---:|---|
| **Operator** | Installation NaNo-IA | Non | Plateforme. Jamais membre du tenant. Cookie distinct. |
| **Propriétaire** | Premier code de licence | Oui | Son tenant. Seul à gérer les Admins délégués. |
| **Admin délégué** | Nommé par le propriétaire | Oui | Membres, départements, réglages. Pas le propriétaire, pas un autre Admin. |
| **Membre** | Invitation ou IdP | Oui | Ses documents et ses départements. |
| **Support** | Operator, durée limitée | Non | `/plateforme` : chunking, formats, diagnostics. **Pas** les documents privés. |

L'Admin du tenant n'utilise pas `/operator`. L'Operator n'utilise pas `/parametres`.
Un Support n'a pas la vue documentaire complète de l'Admin — par conception.

## Licence et sièges

- JWT **RS256**. Clé privée chez l'éditeur. Vérification par `Jwt:PublicKeyPem` sur l'instance.
- Claims contrôlées : `tenantId`, `tier`, `seatsMax`, `validUntil`.
- Palier `Individuel` : un siège. Palier `Entreprise` : `seatsMax` signé.
- Invitations et codes en attente **comptent** dans le plafond.
- Claim `features` : **lu puis oublié**. Les modules Calebasse / Studio ne sont pas encore
  filtrés par le plan commercial (Essentiel vs Professionnel).
- Aucune licence de démonstration automatique. `demo-admin` / `demo-membre` : comptes de
  labo, sans mot de passe seedé.

Facturation : **plan + sièges**. Aucun compteur de jetons ni de questions. Les limites GPU
sont des garde-fous d'infrastructure, pas une facture.

## Identité

Trois scénarios (phase 4) :

1. **PME locale** — pas d'IdP, éventuellement pas d'email d'entreprise. `login_code` public
   + `login_name` + mot de passe choisi par l'utilisateur. Pas d'adresse fictive
   `nom@domaine-inventé`. Fiche d'activation imprimable.
2. **Entreprise locale, plusieurs sièges** — invitations email ou fiches, au moins un
   département métier.
3. **Federated** — OIDC, domaines email. Pas de mot de passe local pour ces comptes.

Secrets d'activation et de récupération : CSPRNG, stockés en HMAC-SHA-256 versionné
(`IdentityTokens__Pepper`), expiration, consommation atomique. Jamais un secret en clair
en base.

Session : cookie applicatif, CSRF sur les mutations, DataProtection persisté (GCS en Cloud
Run, volume en Compose) pour que le recyclage d'instance n'invalide pas tous les cookies.

Politiques de sécurité du tenant : texte publié aux utilisateurs. **Accusé obligatoire des
politiques bloquantes** et historique immuable des versions : pas encore livrés.

## Isolation documentaire (RLS)

PostgreSQL Row Level Security sur documents, chunks, vases, artefacts. L'API ne « filtre
pas après coup » : la base refuse la ligne.

| Visibilité | `owner_user_id` | `department_id` | Qui lit |
|---|---|---|---|
| Personnel | renseigné | — | Propriétaire + Admin du tenant |
| Département | — | renseigné | Membres du département + Admin |
| Organisation | NULL | NULL | Vue Admin. Un Membre **ne liste pas** ces documents. |

Règles non négociables :

- un vase n'est **pas** un droit d'accès ;
- la RLS est revérifiée à **chaque** question et chaque génération Studio ;
- le Support ne voit pas les documents personnels ;
- un Operator n'est pas un utilisateur du tenant (`/auth/me` → 401) ;
- un tour `system` envoyé par le navigateur est rejeté (400). Le prompt système est
  serveur.

Connecteur lecteur réseau (prompt 3) : l'Admin choisit un **libellé** de racine, jamais le
chemin UNC. Le scan tourne côté serveur. Pas d'indexation de bases métier chiffrées.

## Intervention Support

1. L'Operator crée un compte Support nominatif, motif obligatoire, durée 1–72 h (défaut 8 h).
2. L'Admin du client voit une **bannière de transparence** (accès ouvert, pas les documents
   lus).
3. Le Support règle chunking et formats, teste l'inférence en OnPremise, ne chat pas sur le
   corpus privé.
4. Expiration ou révocation : session coupée.

Les documents du client **restent sur son infrastructure** (ou le projet NaNo-IA dédié en
SaaS). Le jeu de questions QA et la fiche de chunking ne recopient pas d'extraits
personnels (Loi 25 / RGPD : rester factuel, ne pas inventer une certification).

## Ce qui sort de l'instance

| Canal | Contrôle |
|---|---|
| Réponse de chat | Stream vers le navigateur authentifié. Pas d'URL publique. |
| Export DOCX/PPTX/PDF | `GET /exports/{id}` + cookie. Fichier lié au compte (et au vase si chat de vase). |
| Aperçu LibreOffice | Réseau Compose interne, profil `preview`. Pas d'Office Online, pas d'egress. |
| Inférence | Questions et extraits vers Ollama. En hybride (moteur dans le SaaS, documents chez le client), le dire **avant** de retenir le scénario. |
| Logs | Types d'erreur, durées, formats. **Pas** le corps des documents ni les prompts complets dans les preuves QA. |

## Audit

Les mutations Admin (invitation, désactivation, délégation, politiques) sont auditées
**sans** mot de passe, code d'activation ni contenu documentaire.

Désactiver un membre coupe les sessions et libère le siège. Pas de suppression physique
ordinaire des documents (traçabilité).

## Restes de gouvernance

| Sujet | État |
|---|---|
| Accusé de lecture des politiques bloquantes | Non livré |
| Historique immuable des versions de politique | Non livré |
| Application du claim `features` | Non livré |
| Cache sémantique (partage GPU entre employés) | V2 |
| Recherche Web dans un vase | Hors v1 (donnée externe dans un corpus privé) |
