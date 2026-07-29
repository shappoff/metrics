import { z } from "zod";

export const deathRecordSchema = z.object({
  fod: z.string(),
  page: z.string(),
  year: z.string().optional().default(""),
  month: z.string().optional().default(""),
  m: z.string().optional().default(""),
  f: z.string().optional().default(""),
  died: z.string().optional().default(""),
  buried: z.string().optional().default(""),
  name: z.string().optional().default(""),
  age: z.string().optional().default(""),
  name_note: z.string().optional().default(""),
  reason: z.string().optional().default(""),
  buried_place: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  source_link: z.string().optional().default(""),
  archive: z.string().optional().default(""),
  priest: z.string().optional().default(""),
  place1: z.string().optional().default(""),
  place2: z.string().optional().default(""),
  church: z.string().optional().default(""),
  fund: z.string(),
  inventory: z.string(),
  caseNumber: z.string(),
  caseKey: z.string(),
});

export type DeathRecord = z.infer<typeof deathRecordSchema>;
