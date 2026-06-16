import { defineEventHandler, readBody, setResponseStatus } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { players, playerTeams } from "#server/database/schema";
import { playerSchema } from "#server/utils/validation/playerSchema";

const schema = playerSchema;

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));

  const { teamId: _teamId, startDate: _startDate, endDate: _endDate, transfer: _transfer, loan: _loan, ...playerValues } = body;

  const result = await db
    .insert(players)
    .values({ ...playerValues, dob: body.dob!.toISOString() })
    .returning();

  const player = result[0];

  if (body.teamId) {
    await db.insert(playerTeams).values({
      playerId: player.id,
      teamId: body.teamId,
      startDate: body.startDate?.toISOString().split("T")[0] ??
        new Date().toISOString().split("T")[0],
      endDate: body.endDate?.toISOString().split("T")[0] ?? null,
      transfer: body.transfer ?? false,
      loan: body.loan ?? false,
    });
  }

  setResponseStatus(event, 201);

  return player;
});
