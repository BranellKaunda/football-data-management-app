import { defineEventHandler } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { eq } from "drizzle-orm";
import { teamsXleagues } from "#server/database/schema";

export default defineEventHandler(async (event) => {
  const result = await useDrizzle().query.teamsXleagues.findFirst({
    where: eq(teamsXleagues.id, Number(event.context.params!.id)),
    with: {
      team: {
        columns: { id: true, name: true, logo: true, location: true },
      },
      league: {
        columns: { id: true, name: true, season: true, logo: true, rank: true },
      },
    },
  });

  return result;
});
