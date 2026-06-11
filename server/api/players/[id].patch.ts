import { defineEventHandler } from "h3";
import { readBody } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { players } from "#server/database/schema";
import { eq } from "drizzle-orm";
import { playerSchema } from "#server/utils/validation/playerSchema";

const schema = playerSchema.partial();

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));
  const id = event.context.params?.id;

  const result = await db
    .update(players)
    .set({ ...body, dob: body.dob?.toISOString() })
    .where(eq(players.id, Number(id)))
    .returning();

  return result[0];
});
