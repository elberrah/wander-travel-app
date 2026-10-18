# Wander Travel & Event

Plateforme d'offres pour les salariés des entreprises partenaires : catalogue d'hôtels et de résidences, packages Omra et Istanbul, colonies de vacances, formulaire de demande de réservation par offre.

Site statique (HTML, CSS, JavaScript). Aucune étape de compilation.

## Structure

```
index.html        page d'accueil et catalogue
offre.html        fiche d'une offre (offre.html?id=...)
login.html        connexion et inscription des salariés
admin.html        tableau de bord (offres, prix, photos, demandes, salariés)
data.js           catalogue, prix et photos
sync.js           lien avec Google Sheets (SYNC_URL)
app.js, shop.js   catalogue, fiche offre, formulaire, comparateur Booking
motion.*, premium.*, style.css, refresh.css   présentation et animations
assets/photos/    photos copiées dans le projet
backend/          script Google Apps Script et documentation de l'API
scripts/          téléchargement des photos externes
vercel.json       en-têtes de sécurité et cache
```

## Mise en ligne : GitHub puis Vercel

1. **GitHub** : créez un dépôt vide (privé conseillé), puis dans ce dossier :
   ```
   git init
   git add .
   git commit -m "Wander : première version"
   git branch -M main
   git remote add origin https://github.com/VOTRE-COMPTE/wander.git
   git push -u origin main
   ```
2. **Vercel** : « Add New > Project », choisissez le dépôt. Framework : **Other**. Aucune commande de build, dossier de sortie : racine (`.`). Cliquez sur « Deploy ».
3. **Domaine** : Vercel > Settings > Domains, ajoutez votre nom de domaine.
4. Chaque `git push` sur `main` met le site en ligne automatiquement.

## Photos hébergées sur d'autres sites

Une soixantaine de photos sont encore chargées depuis les sites des hôtels (Hilton, Kalyptus, Aurocher, etc.). Elles ralentissent l'ouverture des pages et disparaissent si un site les retire. Pour les copier dans le projet, une seule fois, avant le premier envoi sur GitHub :

```
npm run photos
```

(Node 18 ou plus.) Le script télécharge chaque image dans `assets/photos/<offre>/` et met `data.js` à jour. Les photos refusées par un site restent en lien externe : le script les liste. Vérifiez que vous avez le droit d'utiliser ces images.

## Connexion à Google Sheets (demandes, comptes, prix modifiables)

Sans cette étape, le site fonctionne en accès libre : les demandes partent par WhatsApp ou email, et le tableau de bord enregistre dans le navigateur seulement.

1. Créez un Google Sheet, puis Extensions > Apps Script.
2. Collez `backend/apps-script.gs`. Changez `ADMIN_TOKEN` (mot de passe du tableau de bord), `NOTIFY_EMAIL` et `SITE_URL` (adresse du site Vercel).
3. Exécutez la fonction `setup` une fois et acceptez les autorisations.
4. Déployez en application web : exécuter en tant que vous, accès à tout le monde.
5. Collez l'adresse obtenue dans `sync.js`, ligne `SYNC_URL`, puis `git push`.
6. Ouvrez `admin.html`, onglet Réglages, bouton « Tester la connexion ».

Le détail des appels est dans `backend/API.md`. Ne mettez jamais votre vrai `ADMIN_TOKEN` dans un dépôt public : il se règle dans l'éditeur Google, pas dans GitHub.

## Sécurité : ce qu'il faut savoir

- Le site est statique. La connexion des salariés (`login.html`) filtre l'accès aux pages, mais les prix restent lisibles dans `data.js` pour quelqu'un de technique. Pour une protection complète, il faut un serveur.
- `admin.html` est une page publique protégée par le mot de passe du script Google. Elle porte `noindex` mais son adresse n'est pas secrète. Choisissez un mot de passe long.
- Les emails d'accès et de confirmation partent depuis votre compte Gmail (environ 100 par jour sur un compte gratuit).
- Les domaines d'entreprise acceptés sans validation se règlent dans `ALLOWED_DOMAINS` (`apps-script.gs`).

## À compléter

- `SYNC_URL` dans `sync.js`, quand le script Google est déployé.
- `BOOKING_API` à la fin de `data.js`, si vous obtenez un accès aux prix Booking en direct. Sans cela, les prix Booking se saisissent à la main.
- Photos manquantes sur plusieurs fiches (affichées en encadré « Photos bientôt disponibles »).
- Numéro WhatsApp et email de réservation : `+212 702 093 107` et `Resa@wandertravel-event.com`, à vérifier dans `index.html`, `offre.html` et `shop.js`.
