import { defineEventHandler } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { readBody, setResponseStatus } from "h3";
import { matches } from "#server/database/schema";
import { matchSchema } from "#server/utils/validation/matchSchema";

const schema = matchSchema;

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));

  const result = await db
    .insert(matches)
    .values({
      ...body,
      matchDate: body.matchDate.toISOString(),
    })
    .returning();

  setResponseStatus(event, 201);

  return result[0];
});
