import { z } from "zod";

export const birthRecordSchema = z.object({
  fod: z.string(),
  page: z.string(),
  m: z.string().optional().default(""),
  f: z.string().optional().default(""),
  year: z.string().optional().default(""),
  month: z.string().optional().default(""),
  born: z.string().optional().default(""),
  baptism: z.string().optional().default(""),
  name: z.string().optional().default(""),
  parents: z.string().optional().default(""),
  parents_note: z.string().optional().default(""),
  godparents: z.string().optional().default(""),
  godparents_note: z.string().optional().default(""),
  notes: z.string().optional().default(""),
  priest: z.string().optional().default(""),
  place1: z.string().optional().default(""),
  place2: z.string().optional().default(""),
  place3: z.string().optional().default(""),
  place4: z.string().optional().default(""),
  church: z.string().optional().default(""),
  fund: z.string(),
  caseKey: z.string(),
  caseLabel: z.string(),
});

export type BirthRecord = z.infer<typeof birthRecordSchema>;

export type ParsedFod = {
  fund: string;
  inventory: string;
  caseNumber: string;
  caseKey: string;
  caseLabel: string;
};
