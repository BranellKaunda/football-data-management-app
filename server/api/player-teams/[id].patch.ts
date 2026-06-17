import { defineEventHandler, readBody } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { playerTeams } from "#server/database/schema";
import { eq } from "drizzle-orm";
import * as z from "zod";

const playerTeamsSchema = z.object({
  teamId: z.int().positive(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  transfer: z.boolean().optional(),
  loan: z.boolean().optional(),
});

const schema = playerTeamsSchema.partial();

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));
  const id = event.context.params?.id;

  const result = await db
    .update(playerTeams)
    .set({
      ...body,
      startDate: body.startDate?.toISOString(),
      endDate: body.endDate?.toISOString(),
    })
    .where(eq(playerTeams.id, Number(id)))
    .returning();

  return result[0];
});
