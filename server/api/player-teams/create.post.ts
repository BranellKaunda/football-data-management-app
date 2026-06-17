import { defineEventHandler, readBody, setResponseStatus } from "h3";
import * as z from "zod";
import { useDrizzle } from "#server/utils/drizzle";
import { playerTeams } from "#server/database/schema";
import { eq, and, isNull } from "drizzle-orm";

const playerTeamsSchema = z.object({
  playerId: z.int().positive(),
  teamId: z.int().positive(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  transfer: z.boolean().optional().default(false),
  loan: z.boolean().optional().default(false),
});

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = playerTeamsSchema.parse(await readBody(event));

  const result = await db
    .insert(playerTeams)
    .values({
      ...body,
      startDate: body.startDate.toISOString(),
      endDate: body.endDate?.toISOString() || null,
    })
    .returning();

  setResponseStatus(event, 201);

  return result[0];
});
