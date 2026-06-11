import { useDrizzle } from "#server/utils/drizzle";
import { defineEventHandler } from "h3";
import { readBody, setResponseStatus } from "h3";
import * as z from "zod";
import { startCase } from "es-toolkit";
import { leagues } from "#server/database/schema";

const leagueSchema = z.object({
  name: z.string().min(3).max(50).transform(startCase),
  season: z.string().min(4).max(9),
  rank: z.number().positive(),
});

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = leagueSchema.parse(await readBody(event));

  const result = await db.insert(leagues).values(body).returning();

  setResponseStatus(event, 201);

  return result[0];
});
