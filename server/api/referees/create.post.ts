import { defineEventHandler } from "h3";
import { readBody, setResponseStatus } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { referees } from "#server/database/schema";
import * as z from "zod";
import { startCase } from "es-toolkit/string";

const schema = z.object({
  firstName: z.string().min(2).transform(startCase),
  lastName: z.string().min(2).transform(startCase),
  dob: z.coerce.date(),
  location: z.string().min(2).transform(startCase),
});

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));

  const result = await db
    .insert(referees)
    .values({ ...body, dob: body.dob.toISOString() })
    .returning();

  setResponseStatus(event, 201);

  return result[0];
});
