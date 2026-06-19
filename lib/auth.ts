import { betterAuth } from "better-auth/minimal";
import { Pool } from "pg";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { useDrizzle } from "../server/utils/drizzle";

const db = useDrizzle();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});
