import { defineEventHandler, readMultipartFormData } from "h3";
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

  const fileContent = typeof fileField.data === "string"
    ? fileField.data
    : Buffer.from(fileField.data).toString("utf8");

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
    } else {
      skipped++;
    }

    const { homeTeamId, awayTeamId, competitionId: leagueId } = result.record;
    await Promise.all([
      addTeamToLeague(homeTeamId, leagueId),
      addTeamToLeague(awayTeamId, leagueId),
    ]);
  }

  return {
    inserted,
    skipped,
  };
});
