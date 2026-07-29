import { z } from "zod";

export const deathAltRecordSchema = z.object({
  fod: z.string(),
  page: z.string(),
  died: z.string().optional().default(""),
  buried: z.string().optional().default(""),
  m: z.string().optional().default(""),
  f: z.string().optional().default(""),
  who: z.string().optional().default(""),
  who_note: z.string().optional().default(""),
  about: z.string().optional().default(""),
  about_note: z.string().optional().default(""),
  where: z.string().optional().default(""),
  where_note: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  church: z.string().optional().default(""),
  fund: z.string(),
  inventory: z.string(),
  caseNumber: z.string(),
  caseKey: z.string(),
});

export type DeathAltRecord = z.infer<typeof deathAltRecordSchema>;
