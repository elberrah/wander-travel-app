"use client";

import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";

// Aucune clé secrète ici : le client ne parle qu'à /api/auth (même origine).
export const authClient = createAuthClient({
  plugins: [adminClient(), inferAdditionalFields({ user: { company: { type: "string", required: false } } })],
});
