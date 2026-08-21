# Cas d'utilisation

## Statut : 🔴 Lacune structurelle — squelette et méthode ✅ confirmés, contenu détaillé à compléter module par module

## Pourquoi ce fichier est un squelette

L'étude 2018 a analysé **393 formulaires** individuels sur le legacy. Reprendre
exhaustivement chaque cas d'utilisation dans cette documentation en une seule passe serait
:
1. Disproportionné par rapport aux ressources du projet (voir contrainte en tête de `intro.md`)
2. Risqué : sans lire le code VB réel, une liste de cas d'utilisation rédigée à partir des
   seuls noms de tables serait en grande partie inventée.

**La bonne pratique recommandée** : documenter les cas d'utilisation d'un module **juste avant
de le migrer**, avec un accès à l'application VB en fonctionnement (captures d'écran,
observation utilisateur), pas en amont de façon théorique.

## Gabarit à utiliser pour chaque module migré

```markdown
## Module : <nom>

### UC-<module>-01 : <Nom du cas d'utilisation>
- **Acteur principal** : <acteur, voir actors.md>
- **Déclencheur** : <événement qui démarre le cas d'usage>
- **Pré-conditions** : <état requis avant>
- **Scénario nominal** :
  1. ...
  2. ...
- **Extensions / cas d'erreur** : ...
- **Post-conditions** : <état du système après>
- **Règles de gestion associées** : <renvoi vers business-rules.md ou nouvelle règle documentée ici>
- **Tables SQL concernées** : <liste des tables tbl... impliquées>
- **Statut de migration** : à faire / en cours / fait
```

## Ce qu'on sait déjà (✅ Confirmé — comptage par module, spec1 §5, pptx slide 8)

Utile pour prioriser et dimensionner l'effort de documentation détaillée à venir :

| Module (legacy) | Formulaires | États | Exports |
|---|---|---|---|
| Administration | 59 | 31 | 4 |
| Forêt | 19 | 18 | 8 |
| Grumes/Usine (réception/tronçonnage/billonnage) | 26 | 14 | 12 |
| Débités | 40 | 21 | 5 |
| Fourches | 8 | 2 | 2 |
| Lamellés-collés | 27 | 10 | 6 |
| Commandes | 13 | 7 | 7 |
| Logistique | 14 | 19 | 12 |
| Transit | 19 | 4 | 3 |
| Facturation | 59 | 31 | 4 |
| Édition (états transverses) | 37 | 24 | 27 |

À noter : ces chiffres datent du **legacy pré-Expert-Bois** (15 modules). Les chiffres
équivalents pour Expert Bois (8 modules) figurent dans l'offre de migration Camertechdev
(pptx slide 8) — cohérents en ordre de grandeur mais pas directement comparables un-à-un
(consolidation de modules entre-temps).

## Priorisation recommandée pour la documentation détaillée

🟡 Proposé, en cohérence avec `Architecture/api.md` (intégrations externes prioritaires) :
1. Commandes (contrats) — interface avec INTERHOLCO
2. Forêt / Inventaire — interface avec GTG, complexité métier réelle (cubage)
3. Comptabilisation — interface avec SAGE
4. Puis le reste dans l'ordre de la roadmap de migration (voir `Architecture/deployment.md`)
