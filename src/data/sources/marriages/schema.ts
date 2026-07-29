import { z } from "zod";

export const marriageRecordSchema = z.object({
  fod: z.string(),
  page: z.string(),
  year: z.string().optional().default(""),
  month: z.string().optional().default(""),
  "№": z.string().optional().default(""),
  day: z.string().optional().default(""),
  husband: z.string().optional().default(""),
  husband_age: z.string().optional().default(""),
  husband_note: z.string().optional().default(""),
  wife: z.string().optional().default(""),
  wife_age: z.string().optional().default(""),
  wife_note: z.string().optional().default(""),
  trustees: z.string().optional().default(""),
  trustees_note: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  priest: z.string().optional().default(""),
  church: z.string().optional().default(""),
  fund: z.string(),
  inventory: z.string(),
  caseNumber: z.string(),
  caseKey: z.string(),
});

export type MarriageRecord = z.infer<typeof marriageRecordSchema>;
