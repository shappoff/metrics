import { z } from "zod";

export const birthAltRecordSchema = z.object({
  fod: z.string(),
  page: z.string(),
  m: z.string().optional().default(""),
  f: z.string().optional().default(""),
  born: z.string().optional().default(""),
  baptism: z.string().optional().default(""),
  name: z.string().optional().default(""),
  parents: z.string().optional().default(""),
  parents_note: z.string().optional().default(""),
  godparents: z.string().optional().default(""),
  godparents_note: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  priest: z.string().optional().default(""),
  church: z.string().optional().default(""),

  // Derived from `fod` via `parseFod`
  fund: z.string(),
  inventory: z.string(),
  caseNumber: z.string(),
  caseKey: z.string(),
});

export type BirthAltRecord = z.infer<typeof birthAltRecordSchema>;
