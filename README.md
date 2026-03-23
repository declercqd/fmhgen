# FMH Générateur de cartes

Outil de génération de cartes visuelles pour la **France Masters Hockey**. Produit des images PNG 1080×1080 prêtes pour les réseaux sociaux.

🔗 **[fmhgen.netlify.app](https://fmhgen.netlify.app)**

## Outils disponibles

- **Carte Joueur** — Portrait individuel avec photo, nom, numéro et poste
- **Carte Groupe** — Grille de 1 à 6 joueurs avec titre, catégorie et pied de page

## Utilisation

1. Ouvrir l'application sur [fmhgen.netlify.app](https://fmhgen.netlify.app)
2. Télécharger le modèle CSV et le remplir avec les données de l'équipe
3. Importer le CSV dans l'outil choisi
4. Ajouter les photos, choisir un thème, et exporter en PNG

### Format du CSV

Séparateur : point-virgule (`;`)

```
prénom;nom;numéro;poste;Catégorie
Jean;DUPONT;1;Gardien de But;M45
```

## Déploiement

Tout push sur `main` déclenche automatiquement un déploiement via GitHub Actions vers Netlify. Les credentials sont stockés dans les secrets GitHub du dépôt (`NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`).
