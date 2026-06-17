import { defineEventHandler } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { eq } from "drizzle-orm";
import { playerTeams } from "#server/database/schema";

export default defineEventHandler(async (event) => {
  const result = await useDrizzle().query.playerTeams?.findFirst({
    with: {
      player: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
          photo: true,
          position: true,
        },
      },
      team: {
        columns: {
          id: true,
          name: true,
          logo: true,
          location: true,
        },
      },
    },
    where: { id: Number(event.context.params?.id) },
  });

  return result;
});
