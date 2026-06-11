import { defineEventHandler } from "h3";
import { readBody, setResponseStatus } from "h3";
import * as z from "zod";
import { useDrizzle } from "#server/utils/drizzle";
import { match_actions } from "#server/database/schema";

const schema = z.object({
  playerId: z.int().positive(),
  playerIdExtra: z.int().positive().optional(),
  teamId: z.int().positive().optional(),
  matchId: z.int().positive(),
  action: z.enum([
    "Goal",
    "Own Goal",
    "Assist",
    "Yellow Card",
    "Second Yellow Card",
    "Red Card",
    "Substitution",
    "Penalty",
  ]),
  minute: z.int().min(0).max(120),
});

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));

  const result = await db.insert(match_actions).values(body).returning();

  setResponseStatus(event, 201);

  return result[0];
});
