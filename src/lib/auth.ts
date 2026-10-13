import "server-only";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import { sendResetPasswordEmail, sendVerificationEmail } from "./email";
import { isGoogleEnabled as googleEnabled } from "./auth-config";

const isProd = process.env.NODE_ENV === "production";
const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

// Emails promus administrateur automatiquement, une fois l'adresse vérifiée.
const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);


export const authOptions = {
  appName: "Wander Travel & Event",
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    baseURL,
    ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean),
  ],
  database: db,
  // Erreurs OAuth (lien expiré, refus Google...) affichées sur la page de connexion.
  onAPIError: { errorURL: "/connexion" },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
    autoSignIn: false,
    resetPasswordTokenExpiresIn: 60 * 60,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail(user.email, user.name, url);
    },
    // Le lien de réinitialisation a été reçu dans la boîte mail : l'adresse est prouvée.
    onPasswordReset: async ({ user }) => {
      db.prepare("UPDATE user SET emailVerified = 1 WHERE id = ?").run(user.id);
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail(user.email, user.name, url);
    },
  },

  socialProviders: googleEnabled
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          prompt: "select_account",
        },
      }
    : {},

  account: {
    // Un compte Google n'est rattaché à un compte existant (même email) que si
    // Google certifie l'adresse ET que le compte local a déjà vérifié la sienne.
    // Sinon : refus, l'utilisateur doit d'abord se connecter par mot de passe.
    accountLinking: {
      enabled: true,
      trustedProviders: [],
      requireLocalEmailVerified: true,
      allowDifferentEmails: false,
    },
    encryptOAuthTokens: true,
  },

  user: {
    additionalFields: {
      company: { type: "string", required: false, input: true },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 jours
    updateAge: 60 * 60 * 24, // prolongée au plus une fois par jour
    freshAge: 60 * 15,
  },

  rateLimit: {
    enabled: isProd || process.env.AUTH_RATE_LIMIT === "true",
    storage: "database",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-in/social": { window: 60, max: 10 },
      "/sign-up/email": { window: 60 * 10, max: 5 },
      "/request-password-reset": { window: 60 * 15, max: 3 },
      "/reset-password": { window: 60 * 15, max: 5 },
      "/send-verification-email": { window: 60 * 15, max: 3 },
      "/change-password": { window: 60, max: 5 },
    },
  },

  advanced: {
    cookiePrefix: "wander",
    useSecureCookies: isProd,
    defaultCookieAttributes: { httpOnly: true, sameSite: "lax", secure: isProd, path: "/" },
    ipAddress: { ipAddressHeaders: ["x-real-ip", "x-forwarded-for"] },
  },

  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          if (!adminEmails.length) return;
          const u = db.prepare("SELECT email, emailVerified, role FROM user WHERE id = ?").get(session.userId) as
            | { email: string; emailVerified: number; role: string | null }
            | undefined;
          if (u && u.emailVerified && u.role !== "admin" && adminEmails.includes(u.email.toLowerCase())) {
            db.prepare("UPDATE user SET role = 'admin' WHERE id = ?").run(session.userId);
          }
        },
      },
    },
  },

  plugins: [
    admin({ defaultRole: "user", adminRoles: ["admin"], bannedUserMessage: "Ce compte a été suspendu. Contactez Wander." }),
    nextCookies(),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth(authOptions);

export type Session = typeof auth.$Infer.Session;
