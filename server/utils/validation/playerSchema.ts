import * as z from "zod";
import { startCase } from "es-toolkit/string";

export const playerSchema = z.object({
  teamId: z.int().positive().optional(),
  firstName: z.string().min(2).transform(startCase),
  lastName: z.string().min(2).transform(startCase),
  dob: z.coerce.date(),
  position: z.string().min(2).transform(startCase),
  weightKg: z.number().int().positive(),
  heightCm: z.number().int().positive(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  transfer: z.boolean().optional(),
  loan: z.boolean().optional(),
});
