import { defineEventHandler, getQuery } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { teamsXleagues, teams, leagues } from "#server/database/schema";
import { eq, and } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const conditions = [];
  if (query.teamId) {
    conditions.push(eq(teamsXleagues.teamId, Number(query.teamId)));
  }
  if (query.leagueId) {
    conditions.push(eq(teamsXleagues.leagueId, Number(query.leagueId)));
  }

  const db = useDrizzle();

  const result = await db
    .select({
      id: teamsXleagues.id,
      teamId: teamsXleagues.teamId,
      leagueId: teamsXleagues.leagueId,
      team: {
        id: teams.id,
        name: teams.name,
        logo: teams.logo,
        location: teams.location,
      },
      league: {
        id: leagues.id,
        name: leagues.name,
        season: leagues.season,
        logo: leagues.logo,
        rank: leagues.rank,
      },
    })
    .from(teamsXleagues)
    .innerJoin(teams, eq(teamsXleagues.teamId, teams.id))
    .innerJoin(leagues, eq(teamsXleagues.leagueId, leagues.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return result;
});
