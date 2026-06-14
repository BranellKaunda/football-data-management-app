import { useDrizzle } from "#server/utils/drizzle";
import { teamsXleagues } from "#server/database/schema";

export default async function addTeamToLeague(
  teamId: number,
  leagueId: number,
) {
  const db = useDrizzle();

  const existing = await db.query.teamsXleagues.findFirst({
    where: { teamId, leagueId },
  });

  if (existing) {
    return { created: false, record: existing };
  }

  const [record] = await db
    .insert(teamsXleagues)
    .values({ teamId, leagueId })
    .returning();

  return { created: true, record };
}
