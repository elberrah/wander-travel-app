#!/bin/bash
# Wander Travel & Event — installation / mise à jour sur le VPS (Ubuntu).
# Construit l'application SUR le serveur (module natif SQLite compilé pour Linux).
# Attend dans /home/ubuntu : site.zip (sources), nginx.conf, wander.service, wander_proxy_params
set -euo pipefail

DOMAIN="wandertravel-event.com"
WWW_PATH="/var/www/$DOMAIN"
APP_DIR="$WWW_PATH/app"
BUILD_DIR="$WWW_PATH/build"
DATA_DIR="/var/lib/wander"
ENV_FILE="/etc/wander/wander.env"
UPLOAD="/home/ubuntu"

echo "=== Wander : installation du serveur sécurisé ==="

# 1. Dépendances (Node 22 LTS, Nginx, Certbot, outils de compilation)
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
fi
sudo apt-get update -y
sudo apt-get install -y nodejs unzip nginx certbot python3-certbot-nginx build-essential

# 2. Utilisateur système et dossiers (base de données hors du web, accès restreint)
id wander >/dev/null 2>&1 || sudo useradd --system --home "$DATA_DIR" --shell /usr/sbin/nologin wander
sudo mkdir -p "$WWW_PATH" "$DATA_DIR" /etc/wander
sudo chown wander:wander "$DATA_DIR" && sudo chmod 700 "$DATA_DIR"

# 3. Secrets : créés une seule fois, jamais écrasés
if [ ! -f "$ENV_FILE" ]; then
  SECRET=$(openssl rand -base64 32)
  sudo tee "$ENV_FILE" >/dev/null <<ENV
BETTER_AUTH_SECRET=$SECRET
BETTER_AUTH_URL=https://$DOMAIN
BETTER_AUTH_TRUSTED_ORIGINS=https://www.$DOMAIN
DATABASE_PATH=$DATA_DIR/wander.db
ADMIN_EMAILS=contact@wandertravel-event.com
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SMTP_HOST=
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=
SMTP_PASS=
MAIL_FROM="Wander Travel & Event <contact@wandertravel-event.com>"
ENV
  echo ">>> $ENV_FILE créé : complétez Google OAuth et SMTP, puis : sudo systemctl restart wander"
fi
sudo chown root:wander "$ENV_FILE" && sudo chmod 640 "$ENV_FILE"

# 4. Construction
[ -f "$UPLOAD/site.zip" ] || { echo "Erreur : $UPLOAD/site.zip introuvable"; exit 1; }
sudo rm -rf "$BUILD_DIR" && sudo mkdir -p "$BUILD_DIR" && sudo chown ubuntu:ubuntu "$BUILD_DIR"
unzip -q -o "$UPLOAD/site.zip" -d "$BUILD_DIR"
(cd "$BUILD_DIR" && npm ci --no-audit --no-fund && npm run build)

# 5. Mise en place (la base de données n'est jamais touchée)
sudo rm -rf "$APP_DIR.new" && sudo cp -r "$BUILD_DIR/.next/standalone" "$APP_DIR.new"
sudo chown -R root:wander "$APP_DIR.new" && sudo chmod -R o-rwx "$APP_DIR.new"
sudo rm -rf "$APP_DIR.old"; [ -d "$APP_DIR" ] && sudo mv "$APP_DIR" "$APP_DIR.old"
sudo mv "$APP_DIR.new" "$APP_DIR"
sudo rm -rf "$WWW_PATH/out" "$BUILD_DIR" "$UPLOAD/site.zip"   # ancien export statique public

# 6. Service systemd
sudo cp "$UPLOAD/wander.service" /etc/systemd/system/wander.service
sudo systemctl daemon-reload
sudo systemctl enable wander
sudo systemctl restart wander

# 7. Nginx (reverse proxy)
sudo cp "$UPLOAD/wander_proxy_params" /etc/nginx/wander_proxy_params
sudo cp "$UPLOAD/nginx.conf" "/etc/nginx/sites-available/$DOMAIN"
sudo ln -sf "/etc/nginx/sites-available/$DOMAIN" "/etc/nginx/sites-enabled/$DOMAIN"
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

sleep 2
curl -fsS -o /dev/null -w "Application : HTTP %{http_code}\n" http://127.0.0.1:3000/connexion || { sudo journalctl -u wander -n 40 --no-pager; exit 1; }
echo "=== Installation terminée ==="
echo "HTTPS (première fois) : sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
echo "Promouvoir un admin   : cd $APP_DIR && sudo -u wander env DATABASE_PATH=$DATA_DIR/wander.db node promote-admin.mjs email@domaine.com"
