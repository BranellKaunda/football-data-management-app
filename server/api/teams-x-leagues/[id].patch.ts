import { defineEventHandler, readBody } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { teamsXleagues } from "#server/database/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";

const teamsXleaguesSchema = z.object({
  teamId: z.int().positive(),
  leagueId: z.int().positive(),
});

const schema = teamsXleaguesSchema.partial();

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));
  const id = event.context.params?.id;

  const result = await db
    .update(teamsXleagues)
    .set(body)
    .where(eq(teamsXleagues.id, Number(id)))
    .returning();

  return result[0];
});
