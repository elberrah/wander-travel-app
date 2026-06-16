#!/bin/bash
set -e

# Variable Configuration
DOMAIN="wandertravel-event.com"
WWW_PATH="/var/www/$DOMAIN"
NGINX_CONF_PATH="/etc/nginx/sites-available/$DOMAIN"
NGINX_ENABLED_PATH="/etc/nginx/sites-enabled/$DOMAIN"

echo "=== Wander Travel & Event: Setup VPS Configuration ==="

# 1. Update & Dependencies
sudo apt-get update -y
sudo apt-get install -y unzip nginx certbot python3-certbot-nginx

# 2. Preparation of Directory
sudo mkdir -p $WWW_PATH
sudo chown -R ubuntu:ubuntu $WWW_PATH

# 3. Handle Static Export Deployment
if [ -f "/home/ubuntu/site.zip" ]; then
    echo "Decompressing site.zip..."
    sudo rm -rf $WWW_PATH/out/*
    sudo mkdir -p $WWW_PATH/out
    sudo unzip -o /home/ubuntu/site.zip -d $WWW_PATH/out
    sudo rm /home/ubuntu/site.zip
else
    echo "Error: site.zip not found in /home/ubuntu/"
    exit 1
fi

# 4. Nginx Configuration
if [ -f "/home/ubuntu/nginx.conf" ]; then
    echo "Installing Nginx configuration..."
    sudo mv /home/ubuntu/nginx.conf $NGINX_CONF_PATH
    sudo ln -sf $NGINX_CONF_PATH $NGINX_ENABLED_PATH
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t && sudo systemctl restart nginx
else
    echo "Error: nginx.conf not found in /home/ubuntu/"
    exit 1
fi

echo "=== Setup Completed Successfully ==="
echo "Prêt pour SSL : veuillez exécuter : sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
