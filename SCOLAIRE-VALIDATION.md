# Wander Scolaire — revue de prévisualisation

Date : 16 octobre 2026. **Statut : prêt pour revue visuelle, non publié.**

## Livré
- Page `/scolaire` enrichie à partir du projet de refonte Wander V2 validé (filiation `b21505d`).
- Hero, piliers pédagogique / logistique / sécurité, trois destinations illustrées, Marbella en carte typographique, voyage de fin d'études distingué des destinations, équitation, quatre étapes, FAQ, CTA.
- Design Modern Corporate Luxury cohérent avec les autres pages, CSS responsive 320 à 1440 px (vérification effective par navigateur à réaliser).
- Prévisualisation HTML autonome intégrant les images localement.
- Photos de démonstration : Maroc nature, Andalousie (rue méditerranéenne d'illustration), Istanbul, activité équestre. Les photos proviennent des visuels déjà transmis pour d'autres univers Wander et ne prouvent pas qu'un séjour scolaire a été effectivement réalisé.
- Aucun nom de client, d'école ou de prestataire, aucune offre de financement, aucun lien vers la plateforme collaborateurs.
- Aucun portrait reconnaissable d'enfant sur la page.

## Contrôles effectués
- Transpilation syntaxique TypeScript JSX, aucun diagnostic.
- Analyse syntaxique des scripts JS de la prévisualisation, aucune erreur.
- Exécution isolée du générateur HTML de la page, sortie non vide avec contenu attendu.

## À effectuer avant mise en production
- Confirmer les droits commerciaux de chaque photographie et la localisation exacte des visuels (image Andalousie = photographie d'illustration non certifiée comme prise dans le programme présenté).
- Contrôler les affirmations commerciales, itinéraires, encadrement, assurances, agréments et conditions spécifiques aux voyages scolaires.
- Tester réellement le responsive 320 / 390 / 430 / 1440 pixels avec un navigateur pouvant accéder à la preview : environnement actuel bloqué par l'administration du navigateur (`ERR_BLOCKED_BY_ADMINISTRATOR`).
- Réaliser `npm install` + `npm run build` + Lighthouse sur un environnement de CI adapté : dépendances `node_modules` absentes ici.
- Vérifier la réception réelle de la demande de devis, cookies et SEO.
- Prévisualisation sécurisée Vercel et autorisation écrite distincte avant publication.

Aucune intervention domaine / DNS / SSL / e-mail / hébergement.
