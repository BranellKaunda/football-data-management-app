import { getQuery } from "h3";
import { useDrizzle } from "#server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const AND = [
    query.teamId && {
      OR: [{ homeTeamId: query.teamId }, { awayTeamId: query.teamId }],
    },
    query.competitionId && { competitionId: query.competitionId },
    query.date && { matchDate: query.date },
    query.status && { status: query.status },
  ].filter(Boolean);

  const limit = query.limit ? Number(query.limit) : undefined;
  const offset = query.offset ? Number(query.offset) : undefined;

  const results = await useDrizzle().query.matches.findMany({
    columns: {
      id: true,
      matchDate: true,
      status: true,
      homeTeamGoals: true,
      awayTeamGoals: true,
    },
    with: {
      homeTeam: true,
      awayTeam: true,
      competition: true,
      referee: true,
      players: {
        columns: { id: true, firstName: true, lastName: true, teamId: true },
      },
    },
    where: AND.length > 0 ? { AND: AND as any } : undefined,
    orderBy: { matchDate: "desc" },
    ...(limit && { limit }),
    ...(offset && { offset }),
  });

  return results;
});
