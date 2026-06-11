import { useDrizzle } from "#server/utils/drizzle";
import { defineEventHandler } from "h3";
import { getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const leagues = await useDrizzle().query.leagues.findMany({
    columns: {
      id: true,
      name: true,
      season: true,
      rank: true,
    },

    where: {
      OR: [
        { id: query.id ? Number(query.id) : undefined },
        { name: query.name ? query.name : undefined },
        { season: query.season ? query.season : undefined },
      ],
    },
    orderBy: { season: "desc" },
  });

  return leagues;
});
