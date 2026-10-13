// Réglages lisibles sans charger le serveur d'authentification.
export const isGoogleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
