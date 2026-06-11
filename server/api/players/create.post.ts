import { defineEventHandler } from "h3";
import { readBody, setResponseStatus } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { players } from "#server/database/schema";
import { playerSchema } from "#server/utils/validation/playerSchema";

const schema = playerSchema;

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));

  const result = await db
    .insert(players)
    .values({ ...body, dob: body.dob.toISOString() })
    .returning();

  setResponseStatus(event, 201);

  return result[0];
});
