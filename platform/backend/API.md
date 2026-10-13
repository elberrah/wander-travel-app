# API Wander (Google Apps Script)

Une seule adresse : l'URL de l'application web, collée dans `sync.js` (SYNC_URL).
Corps des requêtes POST : JSON envoyé en `text/plain`. "Admin" = champ `token` égal à `ADMIN_TOKEN`.

## GET
| action | accès | retour |
|---|---|---|
| `ping` | public | `{ok, time}` |
| `overrides` | public | modifications d'offres publiées (prix, photos, offres ajoutées ou supprimées) |
| `stats&token=` | admin | `{visits[], requests[]}` |
| `users&token=` | admin | liste des accès salariés (sans mot de passe) |

## POST
| action | accès | champs | effet |
|---|---|---|---|
| `login` | public | id, pw | vérifie l'accès, renvoie la session (30 jours) |
| `visit` | public | page, offer, vid | ajoute une ligne à « Visites » |
| `request` | public | fn, ln, em, co, ph, product, variant, date, nights, rooms, adults, children, babies, total | ligne dans « Demandes », email au salarié, email à NOTIFY_EMAIL |
| `save` | admin | overrides | publie les modifications d'offres |
| `status` | admin | row, status | change le statut d'une demande |
| `addUser` | admin | fn, ln, em, co | crée l'accès, envoie identifiant et mot de passe par email |
| `resetPw` | admin | row | nouveau mot de passe envoyé par email |
| `setActive` | admin | row, active | active ou désactive un accès |

## Mise en route
1. Google Sheet vide > Extensions > Apps Script > collez `apps-script.gs`.
2. Changez `ADMIN_TOKEN`, `NOTIFY_EMAIL`, `SITE_URL`.
3. Exécutez la fonction `setup` une fois et acceptez les autorisations.
4. Déployer > Nouveau déploiement > Application web. Exécuter en tant que : moi. Accès : tout le monde.
5. Collez l'URL dans `sync.js`, puis dans `admin.html` > Réglages > « Tester la connexion ».

## Autres services (facultatifs)
- **Prix Booking en direct** : `BOOKING_API = { url, key }` à la fin de `data.js`. Réponse attendue : `{"price": 1900, "updated": "2026-10-12T10:00:00Z"}`. Demande d'accès auprès de Booking.com (programme partenaires).
- **WhatsApp** : liens `wa.me`, aucune API à créer.
