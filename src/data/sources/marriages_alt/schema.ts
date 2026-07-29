import { z } from "zod";

export const marriagesAltRecordSchema = z.object({
  fod: z.string(),
  page: z.string(),

  date: z.string().optional().default(""),
  nmb: z.string().optional().default(""),
  about: z.string().optional().default(""),
  about_note: z.string().optional().default(""),
  husbandwife: z.string().optional().default(""),
  husbandwife_note: z.string().optional().default(""),
  trustees: z.string().optional().default(""),
  trustees_note: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  church: z.string().optional().default(""),

  // Derived from `fod` via `parseFod`
  fund: z.string(),
  inventory: z.string(),
  caseNumber: z.string(),
  caseKey: z.string(),
});

export type MarriageAltRecord = z.infer<typeof marriagesAltRecordSchema>;

