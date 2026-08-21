---
sidebar_position: 2
title: Stack et backend Supabase
---

## Stack technique

| Composant | Technologie |
| --- | --- |
| Application | Flutter (Dart 3.12+), multiplateforme |
| État | flutter_bloc, equatable |
| Navigation | go_router |
| Injection | get_it |
| Backend | Supabase (Auth, PostgreSQL, Storage, Edge Functions) |
| Enregistrement audio | package `record` |
| Partage PDF | package `share_plus` |
| Déploiement web | Vercel |

## Tables principales

| Table | Rôle |
| --- | --- |
| `artisans` | Profils, rôles, paramètres acompte, IBAN |
| `clients` | Carnet client par artisan |
| `devis` | En-tête devis, statut, langue, urgence |
| `lignes_devis` | Lignes matériel et main d'œuvre, TVA par ligne |
| `agenda` | Chantiers planifiés (1 entrée max par devis accepté) |
| `fournisseurs` | Référentiel global |
| `materiaux_catalogue` | Produits prédéfinis |
| `tarifs_artisan` | Prix négociés privés (RLS par artisan) |
| `propositions_prix_web` | Comparaisons web (Phase 2 persistance) |

## Rôles métier

| Rôle | Description |
| --- | --- |
| `super_admin` | Administration plateforme |
| `owner` | Patron artisan |
| `operateur` | Membre d'équipe rattaché à un patron |
| `developpeur` | Accès technique |

## Edge Functions

| Fonction | Rôle |
| --- | --- |
| `devis-vocal` | Transcription Whisper, analyse GPT, matching catalogue, injection tarifs |
| `generer-pdf-devis` | Génération PDF, upload bucket `devis-pdf` |
| `envoyer-devis-email` | Envoi Resend + marquage envoyé (optionnel en prod) |
| `traduire-devis-client` | Traduction du brouillon vers le français |
| `invite-membre` | Invitation membre d'équipe |

## Storage

| Bucket | Contenu |
| --- | --- |
| `audio-devis` | Fichiers audio de dictée |
| `devis-pdf` | PDF générés (`{artisanId}/{devisId}.pdf`) |

## Statuts devis

| Statut | Signification |
| --- | --- |
| `brouillon` | En cours de rédaction ou non encore marqué envoyé |
| `envoye` | Transmis au client, `date_envoi` renseignée |
| `accepte` | Validé par l'artisan, déclenche la planification chantier |
| `refuse` | Refusé par l'artisan après retour client |

## Sécurité et points d'attention

:::warning Configuration sensible
Les clés Supabase anonymes sont encore en dur dans le code client. Une migration vers `--dart-define` et `core/config/env.dart` est recommandée avant une exposition publique large.
:::

* Row Level Security (RLS) sur les tables métier
* Tarifs artisan visibles uniquement par leur propriétaire
* Identifiants de test pré-remplis en développement (`LoginPage`)
* L'écran admin appelle encore Supabase directement (refactoring Phase 2)

## Migrations

Les scripts SQL vivent dans `supabase/migrations/` du dépôt ArtDevis. Migrations notables :

* Catalogue et tarifs (`20260809`, seeds `20260813`)
* Agenda chantiers (`20260823`, contrainte unicité devis `20260824`)
* Corrections varchar et grants admin (`20260830`, `20260831`)

Commande d'application :

```bash
supabase link --project-ref jmokgfcucyygmhmmhoxn
supabase db push
```
