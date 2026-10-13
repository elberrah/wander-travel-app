# Wander Travel App

Application de voyage Wander Travel Event.

## Site web
https://wandertravel-event.com

## Description
Application de gestion et de réservation de voyages pour Wander Travel and Events.

**Plateforme privée** : tout accès exige un compte (email + mot de passe confirmé, ou Google).
Rôles Administrateur / Utilisateur. Détails, sécurité et mise en service : [docs/AUTHENTIFICATION.md](docs/AUTHENTIFICATION.md).

## Démarrage

```
cp .env.example .env.local   # renseigner BETTER_AUTH_SECRET (openssl rand -base64 32)
npm install
npm run dev                  # http://localhost:3000
```

Production : `npm run build` puis `npm start` (serveur Node). Déploiement VPS : `.\deploy_to_vps.ps1`.

- `src/` : site Next.js, pages d'authentification, espace et administration
- `platform/` : plateforme Avantages Salariés (servie uniquement après connexion)
- `deploy/`, `nginx.conf`, `server_setup.sh` : mise en production
