import { defineEventHandler, getQuery } from "h3";
import { useDrizzle } from "#server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const OR = [
    query.team_id && { teamId: Number(query.team_id) },
    query.league_id && { leagueId: Number(query.league_id) },
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
