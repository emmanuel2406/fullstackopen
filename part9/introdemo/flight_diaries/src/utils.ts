import { Weather, Visibility } from "./types";
import * as z from "zod";

export const newEntrySchema = z.object({
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  date: z.string().date(),
  comment: z.string().optional(),
});
