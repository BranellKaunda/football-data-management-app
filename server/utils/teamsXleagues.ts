import { useDrizzle } from "#server/utils/drizzle";
import { teamsXleagues } from "#server/database/schema";
import { and, eq } from "drizzle-orm";

export default async function addTeamToLeague(
  teamId: number,
  leagueId: number,
) {
  const db = useDrizzle();

  const existing = await db
    .select()
    .from(teamsXleagues)
    .where(and(
      eq(teamsXleagues.teamId, teamId),
      eq(teamsXleagues.leagueId, leagueId),
    ))
    .limit(1);

  if (existing.length > 0) {
    return { created: false, record: existing[0] };
  }

  const [record] = await db
    .insert(teamsXleagues)
    .values({ teamId, leagueId })
    .returning();

  return { created: true, record };
}
