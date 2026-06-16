# Wander Travel & Event — Deployment Automation Script (Strict Mode)
# Usage: .\deploy_to_vps.ps1
# OFFICIAL SOURCE ONLY: app2026wander -> VPS OVH (wandertravel-event.com)

echo "=== Wander Travel & Event: Start Deployment 2026 ==="

# 1. Check local files
if (-Not (Test-Path "out")) { echo "Error: 'out' directory missing. Run 'npx next build' first."; exit 1 }

# 2. Transfer to VPS using central SSH profile
echo "Configuring VPS web root permissions for transfer..."
ssh wander-vps "sudo chown -R ubuntu:ubuntu /var/www/wandertravel-event.com/out"

echo "Transferring build to VPS (wander-vps)..."
scp -r out/* wander-vps:/var/www/wandertravel-event.com/out/

# 3. Secure file permissions remotely
echo "Restoring VPS web root permissions for Nginx..."
ssh wander-vps "sudo chown -R www-data:www-data /var/www/wandertravel-event.com/out && sudo chmod -R 755 /var/www/wandertravel-event.com/out"

echo "=== Deployment Successfully Completed ==="
echo "Site Live: https://wandertravel-event.com"
