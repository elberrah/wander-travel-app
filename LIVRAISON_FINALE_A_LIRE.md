# WANDER TRAVEL & EVENT — LIVRAISON DE TRAVAIL FINALE

## Cette livraison contient
- Accueil premium (logo Wander et visuels locaux, remplaçant les photos stock externes principales)
- MICE et les 6 packages Silver/Gold/Platinum
- Voyages Corporate (avion, salon, chauffeurs et hébergements)
- Avantages Salariés (vitrine uniquement, sans lien public vers la plateforme préexistante, sans financement)
- Kids & Juniors et Scolaire (visuels illustratifs sans portraits identifiables d’enfants)
- Triangle d’Or (concept visuel de Casablanca, explicitement illustratif)
- VIP & Aviation (nouvelle page dédiée /vip, services sur demande)
- Destinations, Réalisations historiques anonymisées, À propos, Contact, pages légales
- Navigation accessible, pied de page, gestion des cookies, sitemap et robots
- Prévisualisation HTML autonome, et fichiers sources Next.js pour mise en préproduction.

## Important : publication NON autorisée à ce stade
Ce pack n’a PAS été publié ni poussé vers Vercel/GitHub. Il ne modifie ni domaine, ni DNS, ni SSL, ni hébergement, ni e-mails.

## Blocages externes de production (à fournir / confirmer)

1. **Réception des devis :** un endpoint HTTPS contrôlé et sécurisé est nécessaire pour que les formulaires transmettent réellement les demandes à `contact@wandertravel-event.com`. Configurer `NEXT_PUBLIC_FORM_ENDPOINT` et la destination chez le prestataire, avec anti-spam, consentement et test d’e-mail reçu. Tant qu'il manque, le formulaire prépare un e-mail dans le logiciel du visiteur — il n'annonce aucun envoi automatique.
2. **Informations légales :** vérifier l'adresse exacte « 36 Rue Ouled Mhanna, RDC Mag. 02, Casablanca », le RC, l’ICE, les numéros fiscaux, la forme juridique, l’agrément officiel, le responsable du traitement, durées de conservation et obligations CNDP. Ne pas publier les pages légales non validées.
3. **Droits médias :** confirmer licences, autorisations de toutes les photos et illustrations destinées au site commercial, en particulier la Fan Zone, les images d’enfants, les photos de résidences et les compositions générées. Le site n'affiche pas de noms clients/prestataires dans les textes publics.
4. **Compilation :** lancer `npm ci`, `npm run build` et `npm run lint` avec un accès au registre npm. Le build n’a pas pu être réalisé dans l’environnement de création (registre non disponible / dépendances absentes).
5. **Recette navigateur réelle :** test mobile 320/375/390/430 px, desktop, clavier, liens, formulaire réel, responsive, Lighthouse et Safari/Chrome avant publication. Le navigateur automatisé de cet environnement a bloqué le test ; ne pas interpréter cela comme une recette visuelle réussie.
6. **Tracking :** vérifier la conformité légale des cookies et du blocage de Google Analytics G-ZL06HET5SK avant consentement (le code le charge conditionnellement). Configurer Search Console et le plan de site avec les accès autorisés, sans toucher aux DNS sans accord explicite.
7. **Réalisations :** les études de cas factuelles (secteurs, jauges, résultats) doivent être fournies et vérifiées, anonymisées ; aucun chiffre ou témoignage client n’a été inventé.

## Tests effectués ici
- Analyse syntaxique de 25 fichiers TS/TSX du projet (par transpilation TypeScript)
- Analyse syntaxique des scripts de la prévisualisation HTML
- Inventaire des chemins médias locaux référencés
- Génération et vérification de l’archive ZIP
- Aucun test de livraison e-mail, aucun build Next.js complet et aucune mise en production.

## Prévisualiser le site
Ouvrir `preview/WANDER_PREVISUALISATION_FINALE.html` dans un navigateur. La version HTML est une représentation interactive autonome destinée à la validation graphique ; la version déployable est celle du projet Next.js à la racine.

## Configurer le projet
```
npm ci
cp .env.example .env.local
# Renseigner NEXT_PUBLIC_FORM_ENDPOINT après configuration d'un service de réception autorisé
npm run build
```
Ne pas pousser vers la branche de production sans validation écrite du propriétaire.
