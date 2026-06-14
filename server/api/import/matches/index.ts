import { defineEventHandler, readMultipartFormData } from "h3";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import createMatch from "#server/utils/match";
import addTeamToLeague from "#server/utils/teamsXleagues";

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
  const compField = form?.find((field) => field.name === "competitionId");

  if (!fileField || !fileField.data) {
    return { error: "No file uploaded" };
  }

  const rawCompetitionId = compField?.data?.toString()?.trim() || "";
  const competitionId = rawCompetitionId ? Number(rawCompetitionId) : 0;

  if (!competitionId || isNaN(competitionId)) {
    return { error: "Invalid competition ID" };
  }

  const fileName = fileField.filename ?? fileField.name;
  const buffer = Buffer.isBuffer(fileField.data)
    ? fileField.data
    : Buffer.from(fileField.data as ArrayBuffer);

  const filePath = path.join(process.cwd(), "data", fileName);

  fs.writeFileSync(filePath, buffer);

  const fileContent = fs.readFileSync(filePath, "utf8");

  const records: MatchRecord[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  let inserted = 0;
  let skipped = 0;

  for (const match of records) {
    const homeGoals = parseInt(match.home_goals, 10);
    const awayGoals = parseInt(match.away_goals, 10);

    if (isNaN(homeGoals) || isNaN(awayGoals)) {
      skipped++;
      continue;
    }

    const result = await createMatch(
      match.home_team,
      match.away_team,
      match.date,
      homeGoals,
      awayGoals,
      competitionId,
    );

    if (result.created) {
      inserted++;
      const { homeTeamId, awayTeamId, competitionId: leagueId } = result.record;
      await Promise.all([
        addTeamToLeague(homeTeamId, leagueId),
        addTeamToLeague(awayTeamId, leagueId),
      ]);
    } else {
      skipped++;
    }
  }

  return {
    inserted,
    skipped,
  };
});
