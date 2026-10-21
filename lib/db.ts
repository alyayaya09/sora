/**
 * lib/db.ts
 * Drizzle ORM + Supabase Postgres connection
 * Server-only — NEVER import on client
 */
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString || connectionString.startsWith("GANTI")) {
  // DB not configured yet — will throw at call-time, not at import-time
  // This prevents build-time crash when DATABASE_URL is placeholder
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = connectionString && !connectionString.startsWith("GANTI")
  ? postgres(connectionString, { prepare: false })
  : null as unknown as ReturnType<typeof postgres>;

export const db = client ? drizzle(client) : null as unknown as ReturnType<typeof drizzle>;
