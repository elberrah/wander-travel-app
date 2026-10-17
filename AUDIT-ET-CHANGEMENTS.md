# Audit rapide du site de départ et modifications — 16 octobre 2026

## Source examinée

ZIP `b21505d1f13719973350d26cee9f32609736588d` (59 entrées, 8 routes initiales : `/`, `/services`, `/corporate`, `/fan-zone`, `/vip`, `/aviation`, `/destinations`, `/contact`).

### Défauts du code source
- Formulaire contact simulé, sans réception réelle.
- Ancien « devis IA » calculé par forfaits fixes et confirmation fictive.
- Navigation desktop chargée avec un bouton FR et devis non reliés.
- Liens légaux renvoyant vers Contact.
- Metadata SEO globale, sans description spécifique par service.
- Images locales manquantes de l'archive et médias distants peu contrôlés.
- `globals.css` avec `@apply border-border` incompatible dans certains contextes Tailwind v4.
- Paramétrage de l'export statique absent.

### Changements intégrés
- Nouvelles pages sur les univers conformément au brief V2, plus Destinations et Réalisations utiles au SEO.
- Une famille de 6 packages MICE avec Silver/Gold/Platinum et moment signature.
- Direction visuelle noir profond `#0A0A0A`, or `#C9A84C`, ivoire, composants responsives.
- Menu desktop + menu mobile plein écran avec CTA.
- Formulaire qualifiant avec gestion de l'état de succès/échec, sans fausse confirmation, et activation via endpoint explicite.
- Consentement modifiable, déclenchement GA4 après autorisation, Meta après autorisation + configuration.
- SEO : title/meta par page, JSON-LD TravelAgency/LocalBusiness, sitemap, robots, OpenGraph.
- Redirections permanentes des anciennes URL via Vercel à config inchangée pour le domaine.
- Nettoyage des anciens composants inutilisés et des pages Fan Zone actives ; conservation de la rubrique Fan Zone uniquement dans Réalisations.
- Aucun lien vers la plateforme Avantages existante. Aucune mention de financement.

## Vérification réalisée
- Syntaxe de 24 fichiers TS/TSX analysée par le parseur TypeScript : **0 erreur**.
- JavaScript de prévisualisation : **syntaxe validée** (`node --check`).
- `npm run build` : **non exécutable dans l'environnement**, commande `next` indisponible et registry npm inaccessible.
- Lighthouse : non exécuté (aucun score affirmé).
- Screenshots : non garantis (navigateur headless bloqué par chargements externes).
- Production Vercel / GitHub : non touchés.

## Liste des éléments à validation
1. Logo officiel et médias autorisés (incluant portrait fondateur).
2. Adresse précise V1/V2 et agrément ODV-9266.
3. Chiffres partenariats, 65 compagnies, 1 500 hôtels, assurances et accompagnement médical ; ne pas publier sans preuve.
4. Modalités contractuelles et convention Avantages Salariés.
5. Citation attribuée au fondateur.
6. Fiche juridique complète et conformité de données personnelles.
7. Réalisations authentiques anonymisées (secteur, effectif, défi, résultats, photos).
8. Validation du prestataire de réception des formulaires.

### Livrables
- Sources complètes et préparation de l'export statique.
- Fichier autonome `wander-preview.html` pour visualiser la structure et naviguer sur mobile ou ordinateur sans serveur.
- Aucun site publié, aucun engagement de mise en ligne.

## Intégration après validation du logo — 16/10/2026

- Validation reçue sur le logo doré à fond transparent et sur la maquette d’orientation « Modern Corporate Luxury ».
- Ajout de `public/brand/wander-logo-transparent.png`, `wander-logo.webp`, `wander-header.png`, `wander-header.webp`, `wander-embleme.png`.
- Remplacement de l’identité typographique provisoire par le logo intégré dans `Brand` (header et footer).
- Mise à jour de `src/app/icon.png`, `apple-icon.png`, `favicon.ico`.
- Nouveau hero et cinq cartes d’accès direct sur l’accueil, bandeau de bénéfices, styles adaptatifs. Toutes les pages existantes sont conservées.
- Mise à jour de `preview/index.html` et `preview/build-preview.js` : aperçu HTML autonome incluant les variantes de logo embarquées.
- Vérification syntaxique TS/TSX : OK. Vérification de la prévisualisation à 1440 et 390 pixels : sections produites et aucun débordement horizontal mesuré en rendu sans photos distantes.
- **Non réalisés** : build Next.js complet, test Lighthouse, validation de livraison e-mail, mise en production.

## Voyages Corporate — intégration photographique validée

- 11 images optimisées localement dans `public/media/corporate/` ; sélection finale utilisée dans 8 emplacements principaux de la page.
- `src/app/voyages-corporate/page.tsx` : hero, grille de prestations, galerie mobilité, image Fast Track, hôtellerie, méthode, FAQ et CTA.
- `src/app/globals.css` : styles dédiés et responsive de cette page.
- `preview/index.html`, `preview/style.css`, `preview/build-preview.js` : parcours de prévisualisation Corporate et médias intégrés dans le HTML autonome.
- Aucune intervention sur la plateforme Avantages Salariés ni sur les infrastructures.
- Validation visuelle reçue le 16 octobre 2026 ; build et droits de publication non encore certifiés.

## Wander MICE — sélection photographique validée (16/10/2026)

- Images reçues et sélection validée pour l’univers MICE. Intégration des versions WebP optimisées dans `public/media/mice/`.
- Nouveau bandeau MICE sur visuel Wander au coucher du soleil, espaces de réunion, préparation événementielle, expériences, quatre visuels signature et six packages détaillés avec leur visuel dédié.
- Enrichissement de la page `src/app/mice/page.tsx` et de la page dynamique `src/app/mice/[package]/page.tsx` ; styles responsive ajoutés.
- Les photos de convention comportant des marques ou noms de clients/prestataires ont été volontairement exclues de l’espace public. Les images d’ambiance produites numériquement sont identifiées comme illustrations, sans présentation trompeuse comme réalisations attestées.
- Prévisualisation autonome mise à jour (`wander-preview-mice-valide.html`) ; le projet et la version Corporate approuvée sont conservés.
- Pas de push, déploiement, modification de Vercel, du domaine, DNS, hébergement ou e-mails.
- Contrôle du rendu de la prévisualisation effectué à 1440 px et 390 px : six cartes MICE, pages packages, aucun débordement horizontal, aucune erreur JavaScript dans ce test.
- Build Next.js complet, Lighthouse, vérification des droits image et test de formulaire réel restent requis avant mise en production.


## Correction validée — typographie des six cartes MICE (16/10/2026)
- Titres Cormorant Garamond ivoire `#F7F2E8` avec échelle responsive et interlignage harmonisé.
- Signatures en or champagne clair `#E7CF92`; numéros et flèches en or `#D8BD79`.
- Dégradé noir progressif superposé à chaque photo pour assurer la lisibilité; alignement et espacement unifiés.
- Focus clavier visible et ajustements spécifiques smartphones 320–430 px.
- Images, contenus, parcours Corporate et accueil inchangés. Aucune mise en production.

### Kids & Juniors — étape suivante
- Nouvelle page éditoriale Kids & Juniors avec galeries de loisirs, quatre destinations, âges 7–17 ans et encadrement.
- Quatre nouvelles images WebP, un visuel paysage réutilisé sous forme d’illustration.
- Image en bord de plage recadrée pour éviter une indication de prestataire.
- Pas de visages d’enfants reconnaissables dans la nouvelle page.
- Prévisualisation locale autonome et responsive vérifiée à trois largeurs.
- Version en attente d’approbation ; pas de build Next.js certifié.
