import { defineEventHandler, setResponseStatus } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { teamsXleagues } from "#server/database/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const id = event.context.params?.id;

  const result = await db
    .delete(teamsXleagues)
    .where(eq(teamsXleagues.id, Number(id)))
    .returning();

  if (event) setResponseStatus(event, 204);

  return result[0];
});
