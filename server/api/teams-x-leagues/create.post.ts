import { defineEventHandler, readBody, setResponseStatus } from "h3";
import * as z from "zod";
import { useDrizzle } from "#server/utils/drizzle";
import { teamsXleagues } from "#server/database/schema";

const teamsXleaguesSchema = z.object({
  teamId: z.int().positive(),
  leagueId: z.int().positive(),
});

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = teamsXleaguesSchema.parse(await readBody(event));

  const result = await db.insert(teamsXleagues).values(body).returning();

  setResponseStatus(event, 201);

  return result[0];
});
