import { defineEventHandler, getQuery } from "h3";
import { useDrizzle } from "#server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const AND = [
    query.player_id && { playerId: Number(query.player_id) },
    query.team_id && { teamId: Number(query.team_id) },
    query.active === "true" && { endDate: { isNull: true } },
  ].filter(Boolean);

  const result = await useDrizzle().query.playerTeams?.findMany({
    columns: {
      id: true,
      startDate: true,
      endDate: true,
      transfer: true,
      loan: true,
    },
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
    where: AND.length > 0 ? { AND: AND as any } : undefined,
    orderBy: { startDate: "desc" },
  });

  return result;
});
