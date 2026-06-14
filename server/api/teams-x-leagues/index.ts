import { defineEventHandler, getQuery } from "h3";
import { useDrizzle } from "#server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const OR = [
    query.teamId && { teamId: Number(query.teamId) },
    query.leagueId && { leagueId: Number(query.leagueId) },
  ].filter(Boolean);

  const db = useDrizzle();

  const result = await db.query.teamsXleagues?.findMany({
    columns: {
      id: true,
    },
    with: {
      team: true,
      league: true,
    },
    where: { OR: OR as any },
  });

  return result;
});
