import "server-only";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware, getSessionFromCtx } from "better-auth/api";
import { db } from "./db";
import { sendResetPasswordEmail, sendVerificationEmail } from "./email";
import { isGoogleEnabled as googleEnabled } from "./auth-config";

const isProd = process.env.NODE_ENV === "production";
// Sur Vercel, l'adresse est déduite automatiquement si BETTER_AUTH_URL est absent.
// En prévisualisation : l'URL stable de la branche (les liens des emails y renvoient).
const vercelUrl =
  process.env.VERCEL_ENV === "production"
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
export const baseURL = process.env.BETTER_AUTH_URL || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
// Adresses de prévisualisation Vercel (déploiement et branche) acceptées en plus.
const vercelOrigins = [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
  .filter(Boolean)
  .map((h) => `https://${h}`);

// Emails promus administrateur automatiquement, une fois l'adresse vérifiée.
const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

// Compte de démonstration partagé (tests DRH) : son mot de passe ne peut pas
// être changé depuis la plateforme, pour qu'un testeur ne bloque pas les autres.
const demoEmail = (process.env.DEMO_EMAIL || "").trim().toLowerCase();

export const authOptions = {
  appName: "Wander Travel & Event",
  baseURL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: [
    baseURL,
    ...vercelOrigins,
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
      const ctx = await auth.$context;
      await ctx.internalAdapter.updateUser(user.id, { emailVerified: true });
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

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (!demoEmail) return;
      if (ctx.path === "/request-password-reset" && String(ctx.body?.email || "").toLowerCase() === demoEmail) {
        throw new APIError("FORBIDDEN", { message: "Compte de démonstration : mot de passe non modifiable." });
      }
      if (ctx.path === "/change-password" || ctx.path === "/change-email" || ctx.path === "/delete-user") {
        const s = await getSessionFromCtx(ctx);
        if (s?.user.email.toLowerCase() === demoEmail) {
          throw new APIError("FORBIDDEN", { message: "Compte de démonstration : modification non autorisée." });
        }
      }
    }),
  },

  databaseHooks: {
    session: {
      create: {
        after: async (session, ctx) => {
          if (!adminEmails.length || !ctx) return;
          const u = await ctx.context.internalAdapter.findUserById(session.userId);
          const role = (u as { role?: string | null } | null)?.role;
          if (u && u.emailVerified && role !== "admin" && adminEmails.includes(u.email.toLowerCase())) {
            await ctx.context.internalAdapter.updateUser(session.userId, { role: "admin" });
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
