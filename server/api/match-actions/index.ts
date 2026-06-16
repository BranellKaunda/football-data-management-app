import { useDrizzle } from "#server/utils/drizzle";
import { defineEventHandler } from "h3";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const OR = [
    query.player_id && { playerId: query.player_id },
    query.player_id && { playerIdExtra: query.player_id },
    query.action && { action: `%${query.action}%` },
    query.minute && { minute: query.minute },
    query.match_id && { matchId: query.match_id },
    query.team_id && { teamId: query.team_id },
  ].filter(Boolean);

  const results = await useDrizzle().query.match_actions.findMany({
    where: {
      OR: OR as any,
    },
    columns: { id: true, action: true, minute: true },
    with: {
      player: {
        columns: { id: true, firstName: true, lastName: true, photo: true },
      },
      playerExtra: {
        columns: { id: true, firstName: true, lastName: true, photo: true },
      },
      team: {
        columns: { id: true, name: true, logo: true },
      },
      match: {
        columns: {
          id: true,
          matchDate: true,
          homeTeamGoals: true,
          awayTeamGoals: true,
        },
      },
    },
  });

  return results;
});
