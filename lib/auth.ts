/**
 * lib/auth.ts
 * Better Auth server configuration
 * Docs: https://www.better-auth.com/docs/installation
 */
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  // Email + password auth
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // disable for demo / MVP
  },

  // Secret untuk signing token — wajib ada di .env.local
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Cookie name prefix
  advanced: {
    cookiePrefix: "sora",
  },
});
