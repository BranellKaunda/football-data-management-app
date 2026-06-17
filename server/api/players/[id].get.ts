import { defineEventHandler } from "h3";
import { useDrizzle } from "#server/utils/drizzle";

export default defineEventHandler(async (event) => {
  const result = await useDrizzle().query.players?.findFirst({
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      photo: true,
      dob: true,
      position: true,
      weightKg: true,
      heightCm: true,
    },
    with: {
      playerTeams: {
        columns: {
          id: true,
          startDate: true,
          endDate: true,
          transfer: true,
          loan: true,
        },
        with: {
          team: {
            columns: {
              id: true,
              name: true,
              logo: true,
              location: true,
            },
          },
        },
        orderBy: { startDate: "desc" },
      },
    },
    where: {
      id: Number(event.context.params!.id),
    },
  });

  return result;
});
