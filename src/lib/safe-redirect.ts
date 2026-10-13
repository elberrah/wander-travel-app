// N'accepte qu'un chemin interne ("/..."), jamais une URL externe ou "//domaine".
export function safeCallbackUrl(value: string | null | undefined, fallback = "/espace") {
  if (!value || typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  if (/[\r\n\t]/.test(value)) return fallback;
  if (/^\/(connexion|inscription|mot-de-passe-oublie|reinitialiser-mot-de-passe|verifier-email)(\/|\?|$)/.test(value)) return fallback;
  return value;
}
