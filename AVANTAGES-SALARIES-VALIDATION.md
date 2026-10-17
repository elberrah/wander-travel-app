# Wander — Avantages Salariés (prévisualisation privée, 16 octobre 2026)

## Périmètre

Cette itération enrichit uniquement la vitrine publique du site depuis la base locale précédente incluant l'accueil, Voyages Corporate, MICE et les corrections typographiques des six packages. Elle **ne modifie ni la plateforme Avantages Salariés existante, ni le domaine, ni DNS/SSL, ni l'hébergement, ni les e-mails**. Aucun déploiement ni push n'a été effectué.

## Modifications

- Refonte éditoriale de `/avantages-salaries` (page Next.js), en reprenant le vocabulaire corporate et la charte noir profond / or champagne / ivoire.
- Visuel de famille, trois publics (entreprises, collaborateurs, familles), galerie de résidences et villas, séjours Istanbul / Omra / bord de mer, teaser Kids & Juniors / Ifrane et bloc Jeudi Promo.
- Liens uniquement vers les pages publiques du site (`/contact`, `/kids-juniors`). Pas de lien public vers une plateforme collaborateurs, pas de développement de plateforme.
- Aucune offre de financement, aucun montant, aucun nom de partenaire hôtelier ou financier.
- FAQ dédiée, métadonnées et descriptions de photos.
- 13 images traitées en WebP dans `public/media/avantages/`; aucune image extérieure indispensable à cette page.
- CSS responsive en fin de `src/app/globals.css`.
- Nouvelle page autonome dans `preview/index.html`, sortie `WANDER_AVANTAGES_PREVISUALISATION.html` pour révision locale sans déploiement.

## Contrôles accomplis

- Transpilation du fichier TSX sans diagnostic syntaxique.
- Prévisualisation navigateur testée à **1440, 390 et 320 px** : 0 erreur JavaScript, 0 débordement horizontal détecté, 9 images du corps de page correctement chargées, 4 cartes résidences + 3 cartes destinations présentes.
- Menu et liens conservés, liens externes absents du corps de la page Avantages.

## Réserves non levées — ne pas publier

1. **Droits médias** : vérifier les droits web et commerciaux de chaque photographie, particulièrement les images provenant de banques tierces ou Getty Images. Les images présentent des lieux sans désigner d'établissement comme partenaire.
2. **Images d'enfants** : les affiches Ifrane fournies montrent des visages. Le brief V2 prévoit de ne pas afficher d'enfants identifiables sur le site public. Le visuel est conservé uniquement **dans la prévisualisation privée** ; avant toute publication, remplacer le visuel par une version cadrée sur les paysages ou anonymisée, approuvée par le commanditaire.
3. **Références commerciales** : toutes les affirmations sur la convention, la sélection des établissements et les périodes doivent être validées avec Wander ; les séjours internationaux sont présentés sans date ni prix.
4. **Formulaire** : endpoint et réception réelle de `contact@wandertravel-event.com` à configurer et tester par une personne habilitée ; les envois sont désactivés dans la prévisualisation autonome.
5. **Build et audits** : `npm run build` et les audits Lighthouse ne sont pas validés faute de dépendances `node_modules` dans le ZIP. Exécuter ces tests avant toute mise en production.
6. **Validation** : cette étape concerne exclusivement la page Avantages. Une autorisation écrite distincte est obligatoire pour toute publication en production.

## Médias intégrés

- `famille-piscine.webp` — ouverture.
- `residence-piscine.webp`, `villa-maroc.webp`, `residence-ocean.webp`, `residence-terrasse.webp` — résidences et villas.
- `istanbul.webp`, `omra.webp`, `sejour-littoral.webp` — destinations.
- `ifrane-hiver.webp`, `loisirs-aquatiques.webp` — teaser Kids & Juniors.
- `residence-jardins.webp`, `sejour-dakhla.webp`, `ifrane-promo.webp` — visuels secondaires de réserve, non affichés sur cette page.
