# Authentification — Wander Travel & Event

La plateforme est **entièrement privée** : aucune page, image, donnée ou API n'est
accessible sans compte. Un visiteur arrive toujours sur `/connexion`.

## 1. Architecture

| Élément | Choix | Pourquoi |
|---|---|---|
| Framework | Next.js 16 en **mode serveur** (`output: "standalone"`) | L'ancien export statique ne pouvait rien protéger : tout fichier était téléchargeable. |
| Authentification | **Better Auth 1.7** | Bibliothèque reconnue, faite pour Next.js : email + mot de passe, Google OAuth 2.0 / OpenID Connect, rôles, limitation des tentatives. |
| Base de données | **SQLite** (`better-sqlite3`), fichier hors du dossier web | Zéro service à administrer sur le VPS, sauvegarde = copie d'un fichier. |
| Emails | **SMTP** (nodemailer) | Confirmation d'adresse et mot de passe oublié, aux couleurs Wander. |

### Ce qui est protégé, et où

1. **`src/proxy.ts`** (exécuté avant chaque requête) : vérifie la session en base.
   Sans session → redirection vers `/connexion?callbackUrl=<page demandée>` (pages) ou `401` (API).
   Zones admin (`/admin/*`, `/plateforme/admin.html`) → rôle `admin` exigé.
2. **Chaque page / action privée revérifie côté serveur** (`src/lib/session.ts` : `requireUser`, `requireAdmin`),
   indépendamment du proxy.
3. **Plateforme Avantages Salariés** (`platform/`, hors de `public/`) : servie fichier par fichier
   par `src/app/plateforme/[[...path]]/route.ts` après contrôle de session. Les prix (`data.js`),
   photos et le tableau de bord ne sont plus lisibles sans compte. `backend/` et `scripts/` ne sont jamais servis.

### Pages

| URL | Rôle |
|---|---|
| `/connexion` | Connexion email/mot de passe + « Continuer avec Google » |
| `/inscription` | Création de compte (prénom, nom, email, entreprise, mot de passe) |
| `/verifier-email` | « Vérifiez votre boîte mail » + renvoi du lien |
| `/mot-de-passe-oublie` → `/reinitialiser-mot-de-passe` | Réinitialisation par lien email (1 h, usage unique) |
| `/deconnexion` | Déconnexion |
| `/espace` | Tableau de bord : accès aux espaces autorisés, compte, changement de mot de passe |
| `/admin/utilisateurs` | **Admin** : comptes, rôles, suspension, fermeture des sessions, suppression, création |
| `/plateforme/index.html` | Plateforme Avantages Salariés (catalogue, offres, demandes) |
| `/plateforme/admin.html` | **Admin** : tableau de bord offres / prix / demandes de la plateforme |

## 2. Sécurité

- **Mots de passe** : jamais stockés en clair — hachage **scrypt** salé. 10 à 128 caractères.
- **Sessions** : cookie `__Secure-wander.session_token` **HttpOnly, Secure, SameSite=Lax**, signé ; 7 jours,
  révocable à tout moment (déconnexion, suspension, changement / réinitialisation du mot de passe → toutes les sessions fermées).
- **Email obligatoirement confirmé** avant toute connexion par mot de passe.
- **Google OAuth 2.0 / OpenID Connect** avec PKCE (S256) et `state`. Profil créé automatiquement à la première connexion,
  reconnu ensuite. **Comptes au même email** : le compte Google n'est rattaché à un compte existant que si Google
  certifie l'adresse **et** que le compte Wander a déjà confirmé la sienne. Sinon refus explicite (protection contre
  la pré-création de compte par un tiers).
- **Anti-abus** : 5 connexions / minute / IP, 5 inscriptions / 10 min, 3 demandes de réinitialisation / 15 min
  (compteurs en base, survivent aux redémarrages) + limite Nginx sur `/api/auth/`.
- **Pas de divulgation des comptes** : « mot de passe oublié » et inscription répondent pareil que l'email existe ou non.
- **Redirections** : seule une page interne est acceptée après connexion (`//site-externe` → `/espace`).
- **CSRF** : contrôle de l'origine sur toutes les requêtes d'authentification ; actions admin en Server Actions.
- **Secrets** uniquement côté serveur (`/etc/wander/wander.env`, droits 640). Aucun identifiant OAuth/SMTP dans le code du navigateur.
- **Base** : `/var/lib/wander/wander.db` (dossier 700, fichier 600), jetons OAuth chiffrés.
- **En-têtes** : HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `noindex` ; pages privées en `Cache-Control: private, no-store`.
- L'application n'écoute que sur `127.0.0.1` : seul Nginx peut la joindre.

## 3. Mise en service

### 3.1 Google OAuth (10 minutes)

1. <https://console.cloud.google.com> → créer un projet « Wander ».
2. **API et services → Écran de consentement OAuth** : type *Externe*, nom « Wander Travel & Event »,
   email d'assistance `contact@wandertravel-event.com`, domaine autorisé `wandertravel-event.com`,
   champs d'application `openid`, `email`, `profile`. Publier l'application (statut *En production*).
3. **Identifiants → Créer → ID client OAuth** → *Application Web* :
   - Origines JavaScript autorisées : `https://wandertravel-event.com`
   - **URI de redirection autorisés** :
     - `https://wandertravel-event.com/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google` (développement)
4. Copier l'ID client et le code secret dans `/etc/wander/wander.env` (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`),
   puis `sudo systemctl restart wander`. Le bouton « Continuer avec Google » s'active automatiquement.

### 3.2 Emails (SMTP)

Renseigner dans `/etc/wander/wander.env` la boîte d'envoi (ex. `contact@wandertravel-event.com` chez l'hébergeur mail) :

```
SMTP_HOST=ssl0.ovh.net        # serveur SMTP de votre hébergeur mail
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@wandertravel-event.com
SMTP_PASS=********
MAIL_FROM="Wander Travel & Event <contact@wandertravel-event.com>"
```

Sans SMTP, aucun email ne part en production (erreur dans `journalctl -u wander`) : inscription et
mot de passe oublié ne peuvent pas aboutir. En développement, les liens s'affichent dans le terminal.

### 3.3 Premier administrateur

`ADMIN_EMAILS` (dans `wander.env`) liste les emails promus **automatiquement** administrateur à leur
première connexion, une fois l'adresse confirmée. Ensuite, les rôles se gèrent dans `/admin/utilisateurs`.
En secours, sur le serveur :

```
cd /var/www/wandertravel-event.com/app
sudo -u wander env DATABASE_PATH=/var/lib/wander/wander.db node promote-admin.mjs email@domaine.com
```

## 4. Déploiement

Depuis le poste Windows : `.\deploy_to_vps.ps1`. Le script envoie les sources commitées, le serveur
installe Node 22, construit l'application, la lance en service `systemd` (`wander`) derrière Nginx.
La base de données et `/etc/wander/wander.env` ne sont **jamais** écrasés.
Première fois : `sudo certbot --nginx -d wandertravel-event.com -d www.wandertravel-event.com`.

**Sauvegarde** : `sudo sqlite3 /var/lib/wander/wander.db ".backup /root/wander-$(date +%F).db"`
(ou copie du fichier service arrêté).

## 5. Développement local

```
cp .env.example .env.local     # puis BETTER_AUTH_SECRET=$(openssl rand -base64 32)
npm install
npm run dev                    # http://localhost:3000 → /connexion
```

## 6. Tests réalisés (navigateur Chromium, serveur de production)

34 contrôles automatisés réussis, dont : redirection de tout visiteur vers `/connexion` ; page demandée
retrouvée après connexion ; inscription → email → confirmation → connexion automatique ; connexion refusée
avant confirmation ; mauvais mot de passe ; mot de passe oublié → réinitialisation → ancien mot de passe refusé,
lien à usage unique ; déconnexion ; utilisateur refusé sur les zones admin (pages et API, 403) ; admin :
suspension (connexion refusée), réactivation, changement de rôle, création de compte ; cookie HttpOnly
illisible en JavaScript ; redirection externe neutralisée ; traversée de répertoire bloquée ; fichiers
backend jamais servis ; limitation des tentatives (429) ; affichage mobile sans défilement horizontal ;
redirection Google (OpenID, PKCE S256, URI de retour correcte, URL externe refusée).
