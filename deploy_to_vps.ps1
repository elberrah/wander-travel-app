# Wander Travel & Event — Déploiement (Strict Mode)
# Usage : .\deploy_to_vps.ps1
# OFFICIAL SOURCE ONLY: app2026wander -> VPS OVH (wandertravel-event.com)
# Envoie les sources validées (git) : le serveur construit l'application lui-même.

$ErrorActionPreference = "Stop"
echo "=== Wander Travel & Event : déploiement 2026 ==="

# 1. Sources : uniquement ce qui est commité (aucun .env, aucune base locale)
if (git status --porcelain) { echo "Erreur : modifications non commitées. Commitez avant de déployer."; exit 1 }
git archive --format=zip -o site.zip HEAD

# 2. Transfert vers le VPS (profil SSH central)
echo "Transfert vers wander-vps..."
scp site.zip nginx.conf server_setup.sh deploy/wander.service deploy/wander_proxy_params wander-vps:/home/ubuntu/

# 3. Construction et redémarrage sur le serveur
ssh wander-vps "bash /home/ubuntu/server_setup.sh"
Remove-Item site.zip

echo "=== Déploiement terminé ==="
echo "Site : https://wandertravel-event.com"
