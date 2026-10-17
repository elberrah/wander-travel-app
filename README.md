# Wander Travel & Event — Refonte V2 (PRÉVISUALISATION UNIQUEMENT)

> Source de travail : archive transmise `wander-travel-app-b21505d1f13719973350d26cee9f32609736588d.zip` — commit d'origine annoncé `b21505d`.
> Aucun déploiement, push GitHub, changement DNS, SSL, domaine, e-mail ou hébergement n'a été effectué.

## Livrables

- **Site Next.js** (App Router, React 19, Tailwind CSS v4) ; export statique `output: 'export'`.
- **Prévisualisation autonome** : fichier `wander-preview.html` livré séparément pour navigation immédiate dans un navigateur ; l'interface de preview simule les pages et désactive tout envoi.
- **16 fichiers `page.tsx`** couvrant les 15 routes statiques et la route dynamique des six packages MICE, soit **21 URL de contenu**.
- **6 packages** détaillés (Team Day, Team Offsite, Conference, Sales Kickoff, Leadership Retreat, Recognition Night) et niveaux Silver, Gold, Platinum.
- Pages Avantages Salariés, Kids & Juniors, Scolaire, Triangle d'Or, Voyages Corporate, Destinations, Réalisations, À propos, Contact et pages légales.
- Menu « Univers » desktop et navigation mobile, FAQ, appels à l'action, formulaire, cookies, SEO technique, redirections permanentes des anciennes routes.

## Précautions essentielles

1. Aucun accès à `avantages.wandertravel-event.com` n'est affiché ou fourni ; la plateforme existe déjà et reste hors périmètre.
2. La Fan Zone n'est visible qu'au titre de **réalisation passée** ; aucune page ni campagne commerciale Fan Zone active.
3. Pas de financement ni de tarifs publics, hors la mention « tarifs sur devis, sous réserve de disponibilité et de confirmation ».
4. Aucune photo réelle de client, d'enfant identifiable ou de réalisation non vérifiée. Les images Unsplash distantes sont **illustratives uniquement** et doivent être remplacées ou autorisées avant publication.
5. Le **logo officiel** est absent de l'archive ; l'en-tête conserve un *wordmark typographique provisoire* dans l'esprit de la version source. Fournir le logo doré officiel en SVG/PNG autorisé avant publication.
6. Les données d'adresse **diffèrent entre les briefs V1 et V2**. La V2 (`36 Rue Vevey, Oulad M’Hanna`) est affichée ici, **à valider**.
7. Les affirmations commerciales (50+ établissements, agrément ODV-9266, garanties Kids, parcours fondateur, convention, citation) restent à vérifier avant publication.
8. Les mentions légales, politique de confidentialité et cookies nécessitent une validation juridique avant mise en ligne.

## Démarrage local avec accès à npm

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Ouvrir http://localhost:3000 — les pages seront accessibles localement.

Pour un export statique :

```bash
npm run build
# Les fichiers exportés seront dans out/
```

**État de vérification ici** : syntaxe TS/TSX contrôlée (0 erreur de parsing) ; `npm run build` non vérifié car `node_modules` non fourni et réseau npm indisponible (`next: not found`). Il faut un build vert et la recette avant la publication. Aucun score Lighthouse n'est revendiqué.

## Formulaire

Dans `.env.local`, définir `NEXT_PUBLIC_FORM_ENDPOINT` vers un service de collecte autorisé compatible `multipart/form-data` et CORS (ex. Formspree / endpoint tiers vérifié). Configurer côté prestataire la livraison à `contact@wandertravel-event.com`. Tant que l'endpoint est absent, le site **n'affiche jamais une fausse réussite** et fournit des alternatives e-mail et WhatsApp. Faire un vrai test d'arrivée, d'échec, de spam et de consentement avant publication.

## Consentement

GA4 `G-ZL06HET5SK` est injecté côté navigateur seulement après acceptation de l'analytique. Meta Pixel ne peut être injecté qu'après consentement marketing **et** configuration de `NEXT_PUBLIC_META_PIXEL_ID`. Le gestionnaire stocke le choix localement et permet de rouvrir le bandeau. Un audit réglementaire des cookies et des outils externes reste indispensable.

## Images et typographies

Les images actuelles sont des URL illustratives tierces. Les remplacer par des images authentiques sous droits, compressées en WebP/AVIF, servi localement si possible. La fonte serif souhaitée est `Cormorant Garamond` avec repli Georgia, et la sans-serif `Inter` avec repli système ; aucun fichier de police n'est livré et aucune fonte distante n'est chargée avant consentement. Auto-héberger les fontes autorisées ultérieurement.

## Recette avant accord écrit

- [x] Logo officiel validé intégré et versions web optimisées
- [ ] Photographies et portraits autorisés
- [ ] Vérification de l'adresse, agrément, chiffres et citation du fondateur
- [ ] Mentions légales et confidentialité validées
- [ ] Endpoint opérationnel : e-mail effectivement reçu et antispam testé
- [ ] `npm ci`, `npm run build` vert sans warning bloquant
- [ ] Inspection responsive 320/375/390/430px + tablette et desktop
- [ ] Lighthouse mobile réel : performances, accessibilité, SEO et bonnes pratiques
- [ ] Test clavier, contraste, alt, menu mobile, clic WhatsApp
- [ ] Robots preview = noindex + preview Vercel protégée
- [ ] Test des redirections Vercel et vérification sitemap/robots
- [ ] Validation écrite de la preview **avant toute mise en production**

## URLs / redirections

Anciennes URL prévues en 301 dans `vercel.json` : `/corporate` vers `/mice`, `/services` vers `/mice`, `/vip` vers `/triangle-dor`, `/aviation` vers `/voyages-corporate`, `/fan-zone` vers `/realisations`.

Les fichiers d'origine fournis dans l'archive et les modifications sont décrits dans `AUDIT-ET-CHANGEMENTS.md`.

## Validation artistique du 16 octobre 2026

Le commanditaire a validé le logo retravaillé sur fond transparent et la direction artistique de la maquette premium. Cette validation autorise leur **intégration dans la branche locale**, pas la publication en production. Les mises à jour incluent l’emblème et le logo dans les composants de navigation/footer, le favicon, l’accueil (hero et cartes des univers), les styles responsive et la prévisualisation HTML autonome. Le mockup produit précédemment est une **référence de direction artistique**, non une capture de l’interface fonctionnelle. Tous chiffres non validés (100+, 50+ clients, etc.) restent exclus des nouvelles sections.

Pour reconstruire la prévisualisation autonome dans l’environnement du projet : `node preview/build-preview.js`. L’HTML généré est `wander-preview-logo-valide.html` (dans `/mnt/data` sur cet environnement). Le formulaire et les photos restent à tester et valider avant déploiement.

## Validation de la page Voyages Corporate — 16/10/2026

Le commanditaire a validé les visuels intégrés dans la rubrique **Voyages Corporate** (avion commercial, salon Fast Track, flotte, accueil chauffeur, van VIP, photographies d’hébergement). Les images ont été converties en WebP et stockées dans `public/media/corporate/` ; la page `/voyages-corporate` et la prévisualisation autonome correspondante utilisent ces fichiers locaux.

- Avion au coucher du soleil : **hero** de la page Corporate.
- Flotte noire, chauffeur ouvrant la porte, intérieur de van beige : **Transferts Prestige**.
- Salon d’aéroport : **Fast Track & salons VIP**.
- Piscine de resort, séjours océan / Dakhla / Atlas : **Hôtellerie Corporate**.
- Les photos d’hôtels affichant explicitement une marque n’ont pas été retenues pour le site public.

**Réserves inchangées :** vérifier les droits de diffusion et le caractère illustratif des photos ; l’envoi du formulaire doit être configuré et testé ; le build Next.js et la recette responsive/Lighthouse restent à exécuter dans un environnement disposant des dépendances. Cette validation n’autorise **aucune mise en production**.

Prévisualisation HTML incluse sous `preview-corporate-valide.html` dans le ZIP livré (aucune installation nécessaire).

## Wander MICE — média validés pour prévisualisation

Les illustrations reçues pour MICE sont intégrées localement dans `public/media/mice/` et les pages `/mice` et `/mice/[package]`. Les visuels avec noms de clients n’ont pas été ajoutés. Les images générées illustrent des concepts, pas des preuves photographiques d’événements passés. Un nouveau fichier autonome `wander-preview-mice-valide.html` permet de naviguer entre toutes les sections et les 6 formats MICE.

**Statut :** validation artistique des choix photos uniquement, pas d’autorisation de production. Les droits de publication des images, le build Next.js complet, le formulaire réel et la recette Lighthouse doivent être vérifiés indépendamment.


## Itération Avantages Salariés — 16/10/2026

Nouvelle page `/avantages-salaries` construite avec les photographies fournies par le commanditaire. Voir `AVANTAGES-SALARIES-VALIDATION.md` pour la liste des fichiers et les limites de publication. La prévisualisation autonome est disponible dans `preview/WANDER_AVANTAGES_PREVISUALISATION.html`. Aucun hébergement, domaine ou plateforme existante n’a été modifié.


## Étape : Wander Kids & Juniors — sélection photographique (16 octobre 2026)

Page `/kids-juniors` personnalisée avec une vue aérienne d’aire de loisirs en bord de mer, un parc aquatique en vue générale, un visuel de nature et une photo de restauration. Le visuel du groupe d’enfants dans la piscine et l’affiche Ifrane présentant des visages reconnaissables sont exclus du site public de démonstration. Les fichiers utilisés sont compressés en WebP.

La prévisualisation indépendante de cette étape se trouve dans `preview/WANDER_KIDS_JUNIORS_PREVISUALISATION.html` (navigation par liens internes et formulaire désactivé). Des conditions de séjour et d’utilisation commerciale des visuels doivent être confirmées.

Contrôles réalisés : 24 fichiers TS/TSX vérifiés (parsing), preview Chromium testée à 1440, 390 et 320 px : pas de débordement horizontal ni d’erreur JavaScript. Build Next.js complet non effectué faute de dépendances npm. Aucune publication en production.

## Version intégrale de travail — Triangle d’Or (16 octobre 2026)
La version intégrale inclut la page `/triangle-dor` mise à jour avec trois visuels illustratifs optimisés, un parcours d’expériences culturelles et événementielles, les prestations d’accueil et les étapes de coordination. Les compositions IA sont présentées explicitement comme des concepts visuels et non des événements réellement réalisés. Aucune photo de mineurs ni marque tierce visible des autres fichiers reçus n’a été ajoutée. **Ne pas mettre en production sans contrôle complet des droits et validation écrite.**
