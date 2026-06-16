import { defineEventHandler } from "h3";
import { getQuery } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { isNull } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  if (query.teamId) {
    const AND = [
      query.teamId && { teamId: Number(query.teamId) },
      query.endDate && { endDate: { isNull: true } },
      query.year && { startDate: { lte: `${query.year}-12-31` } },
      query.year && {
        OR: [
          { endDate: { gte: `${query.year}-01-01` } },
          { endDate: { isNull: true } },
        ],
      },
    ].filter(Boolean);

    const results = await useDrizzle().query.playerTeams?.findMany({
      columns: {
        id: true,
        startDate: true,
        endDate: true,
        transfer: true,
        loan: true,
      },
      with: {
        player: true,
        team: true,
      },
      where: { AND: AND as any },
    });

    return results;
  }

  const OR = [
    query.name && { firstName: { ilike: `%${query.name}%` } },
    query.name && { lastName: { ilike: `%${query.name}%` } },
    query.position && { position: { ilike: `%${query.position}%` } },
    query.dob && { dob: query.dob },
  ].filter(Boolean);

  const players = await useDrizzle().query.players?.findMany({
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      position: true,
      dob: true,
    },
    where: OR.length > 0 ? { OR: OR as any } : undefined,
    orderBy: { firstName: "asc" },
  });

  return players;
});
