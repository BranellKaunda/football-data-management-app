import { defineEventHandler } from "h3";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { startCase } from "es-toolkit/string";
import { useDrizzle } from "#server/utils/drizzle";
import { teams } from "#server/database/schema";
import { eq } from "drizzle-orm/sql/expressions/conditions";

const teamSchema = z.object({
  name: z.string().min(2).transform((val) =>
    val === val.toUpperCase() ? val : startCase(val),
  ),
  logo: z.string(),
  location: z.string().min(2).transform(startCase),
});

const patchTeamSchema = teamSchema.partial();

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = patchTeamSchema.parse(await readBody(event));
  const id = event.context.params?.id;

  const result = await db
    .update(teams)
    .set(body)
    .where(eq(teams.id, Number(id)))
    .returning();

  return result[0];
});
