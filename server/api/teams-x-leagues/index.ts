import { defineEventHandler } from "h3";
import { useDrizzle } from "#server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const OR = [
    query.teamId && { teamId: Number(query.teamId) },
    query.leagueId && { leagueId: Number(query.leagueId) },
  ].filter(Boolean);

  const result = await useDrizzle().query.teamsXleagues?.findMany({
    columns: {},
    with: {
      team: {
        columns: { id: true, name: true, logo: true, location: true },
      },
      league: {
        columns: { id: true, name: true, season: true, logo: true, rank: true },
      },
    },
    where: { OR: OR as any },
  });

  return result;
});
