import { useDrizzle } from "#server/utils/drizzle";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const result = await useDrizzle().query.leagues?.findFirst({
    where: {
      id: Number(event.context.params!.id),
    },
  });

  return result;
});
