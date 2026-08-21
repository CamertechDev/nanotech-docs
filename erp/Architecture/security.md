# Sécurité

## Statut : 🟡 Proposé — mappage du modèle legacy vers une architecture moderne

## Point de départ : le modèle legacy déjà en place

Voir `Functional/permissions.md` pour le détail du modèle existant
(`tblUtilisateur` → `tblUtilisateurProfil` → `tblUtilisateurDroit`, + `tblUtilisateurModules`,
+ scoping par site via `tblSiteOperationModulesGB`). La recommandation est de **porter ce
modèle**, pas de le remplacer par un nouveau système de permissions inventé sans base métier.

## Authentification

🟡 Proposé : ASP.NET Core Identity (ou Azure AD B2C si un fournisseur d'identité géré est
budgétairement acceptable), émettant un JWT contenant :

```json
{
  "sub": "<UtilisateurID>",
  "profil": "<ProfilID>",
  "siteOperationId": "<SiteOperationID>",
  "societeId": "<SocieteID>",
  "modules": ["Foret", "Commandes", "..."]
}
```

## Autorisation

- **Filtrage par module** : middleware/attribut d'autorisation vérifiant `modules` du JWT
  contre le contexte de l'endpoint appelé.
- **Filtrage multi-site** : "global query filter" EF Core sur `SiteOperationID`/`SocieteID`,
  appliqué automatiquement à toutes les requêtes de lecture/écriture — évite qu'un
  développeur oublie le filtre dans un nouvel endpoint (risque de fuite de données
  inter-sites, cf. critique legacy sur la séparation des données par pays).

## Ce qui reste à clarifier (🔴 Lacune, voir aussi `permissions.md`)

- Un utilisateur peut-il être rattaché à plusieurs sites simultanément ?
- La granularité réelle des droits (par module ? par sous-menu ? par action CRUD ?) — le
  schéma laisse penser à une granularité fine (droits explicites en table), à confirmer avant
  de figer le modèle de claims.

## Recommandation de mise en œuvre

🟡 Proposé, cohérent avec la contrainte de ressources : commencer par un modèle
d'autorisation **simple et grossier** (module-level), et affiner vers plus de granularité
seulement si un besoin réel est démontré à l'usage — pas en anticipant toute la richesse du
modèle de droits legacy avant même d'avoir un premier module en production.
