import { defineEventHandler } from "h3";
import { useDrizzle } from "#server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const result = await useDrizzle().query.playersXmatches.findFirst();

  return result;
});
