import type { Config } from "drizzle-kit";
import { config } from "dotenv";

// Load .env.local manually (Next.js convention)
config({ path: ".env.local" });

export default {
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
