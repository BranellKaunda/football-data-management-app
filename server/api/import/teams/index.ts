import { defineEventHandler, readMultipartFormData } from "h3";
import { parse } from "csv-parse/sync";
import createTeam from "#server/utils/team";

type MatchRecord = {
  date: string;
  home_team: string;
  away_team: string;
  home_goals: number;
  away_goals: number;
};

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  const fileField = form?.find((field) => field.name === "file");

  if (!fileField || !fileField.data) {
    return { error: "No file uploaded" };
  }

  const fileContent = typeof fileField.data === "string"
    ? fileField.data
    : Buffer.from(fileField.data).toString("utf8");

  // 5. change to object
  const records: MatchRecord[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  let inserted = 0;
  let skipped = 0;

  for (const match of records) {
    const home = match.home_team;
    const away = match.away_team;

    const homeTeam = await createTeam(home);
    const awayTeam = await createTeam(away);

    if (homeTeam.created) {
      inserted++;
    } else skipped++;

    if (awayTeam.created) {
      inserted++;
    } else skipped++;
  }

  return {
    inserted,
    skipped,
  };
});
