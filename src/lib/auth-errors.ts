// Messages d'erreur compréhensibles (codes Better Auth -> français).
const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Email ou mot de passe incorrect.",
  INVALID_EMAIL: "Adresse email invalide.",
  INVALID_PASSWORD: "Mot de passe incorrect.",
  EMAIL_NOT_VERIFIED: "Adresse email non confirmée. Un nouveau lien de confirmation vient de vous être envoyé.",
  USER_ALREADY_EXISTS: "Un compte existe déjà avec cet email. Connectez-vous ou utilisez « Mot de passe oublié ».",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Un compte existe déjà avec cet email. Connectez-vous ou utilisez « Mot de passe oublié ».",
  PASSWORD_TOO_SHORT: "Le mot de passe doit contenir au moins 10 caractères.",
  PASSWORD_TOO_LONG: "Le mot de passe est trop long (128 caractères maximum).",
  INVALID_TOKEN: "Ce lien n'est plus valide. Faites une nouvelle demande.",
  TOKEN_EXPIRED: "Ce lien a expiré. Faites une nouvelle demande.",
  BANNED_USER: "Ce compte a été suspendu. Contactez Wander.",
  CREDENTIAL_ACCOUNT_NOT_FOUND: "Ce compte utilise la connexion Google. Cliquez sur « Continuer avec Google ».",
  INVALID_CALLBACK_URL: "Adresse de redirection refusée.",
  INVALID_ORIGIN: "Requête refusée (origine non autorisée).",
  // Erreurs de retour Google (?error=...)
  account_not_linked:
    "Un compte Wander existe déjà avec cet email mais n'est pas encore confirmé. Connectez-vous avec votre mot de passe et confirmez votre email, puis réessayez avec Google.",
  unable_to_link_account: "Impossible de rattacher ce compte Google. Connectez-vous avec votre mot de passe.",
  email_not_verified: "Google n'a pas confirmé cette adresse email. Utilisez un autre compte.",
  email_not_found: "Google n'a pas transmis d'adresse email.",
  account_already_linked_to_different_user: "Ce compte Google est déjà rattaché à un autre utilisateur.",
  banned: "Ce compte a été suspendu. Contactez Wander.",
  access_denied: "Connexion Google annulée.",
  state_mismatch: "La connexion Google a expiré. Réessayez.",
  please_restart_the_process: "La connexion Google a expiré. Réessayez.",
  invalid_code: "La connexion Google a échoué. Réessayez.",
};

export function authErrorMessage(err?: { code?: string; status?: number; message?: string } | string | null) {
  if (!err) return "";
  if (typeof err === "string") {
    const key = err.trim().replace(/\s+/g, "_");
    return MESSAGES[key] || MESSAGES[key.toLowerCase()] || "La connexion a échoué. Réessayez.";
  }
  if (err.status === 429) return "Trop de tentatives. Patientez quelques minutes avant de réessayer.";
  if (err.code && MESSAGES[err.code]) return MESSAGES[err.code];
  if (err.message && /banned/i.test(err.message)) return MESSAGES.BANNED_USER;
  return "Une erreur est survenue. Réessayez dans un instant.";
}
