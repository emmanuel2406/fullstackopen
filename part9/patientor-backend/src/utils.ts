import { Gender } from "./types";
import * as z from "zod";

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const patientSchema = newPatientSchema.extend({
  id: z.string(),
  entries: z.array(z.unknown()),
});
