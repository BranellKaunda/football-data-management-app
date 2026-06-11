import { defineEventHandler } from "h3";
import { useDrizzle } from "#server/utils/drizzle";

export default defineEventHandler(async (event) => {
  return await useDrizzle().query.teams.findFirst({
    where: {
      id: Number(event.context.params!.id),
    },
  });
});
