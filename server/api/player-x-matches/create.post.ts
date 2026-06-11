import { defineEventHandler } from "h3";
import { readBody, setResponseStatus } from "h3";
import * as z from "zod";
import { useDrizzle } from "#server/utils/drizzle";
import { playersXmatches } from "#server/database/schema";

const playersXmatchesSchema = z.object({
  playerId: z.int().positive(),
  matchId: z.int().positive(),
});

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = playersXmatchesSchema.parse(await readBody(event));

  const result = await db.insert(playersXmatches).values(body).returning();

  setResponseStatus(event, 201);

  return result[0];
});
