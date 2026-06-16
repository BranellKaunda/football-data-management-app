import { defineEventHandler } from "h3";
import { readBody } from "h3";
import { useDrizzle } from "#server/utils/drizzle";
import { players, playerTeams } from "#server/database/schema";
import { playerSchema } from "#server/utils/validation/playerSchema";
import { eq, and, isNull } from "drizzle-orm";

const schema = playerSchema.partial();

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  const body = schema.parse(await readBody(event));
  const id = Number(event.context.params!.id);

  const { teamId: _teamId, startDate: _startDate, endDate: _endDate, transfer: _transfer, loan: _loan, ...playerFields } = body;

  const result = await db
    .update(players)
    .set({ ...playerFields, dob: playerFields.dob?.toISOString() })
    .where(eq(players.id, id))
    .returning();

  if (body.teamId) {
    const current = await db
      .select()
      .from(playerTeams)
      .where(
        and(
          eq(playerTeams.playerId, id),
          isNull(playerTeams.endDate),
        ),
      )
      .limit(1);

    if (current.length > 0) {
      await db
        .update(playerTeams)
        .set({
          endDate: body.startDate
            ? body.startDate.toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
        })
        .where(eq(playerTeams.id, current[0].id));
    }

    await db.insert(playerTeams).values({
      playerId: id,
      teamId: body.teamId,
      startDate: body.startDate
        ? body.startDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      endDate: body.endDate?.toISOString().split("T")[0] ?? null,
      transfer: body.transfer ?? false,
      loan: body.loan ?? false,
    });
  }

  return result[0];
});
