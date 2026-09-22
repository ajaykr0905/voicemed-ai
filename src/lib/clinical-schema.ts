import { z } from "zod";

const shortText = z.string().trim().min(1).max(240);

export const clinicalEntitiesSchema = z.object({
  symptoms: z.array(z.object({
    text: shortText,
    original: z.string().trim().max(240).optional(),
    severity: z.enum(["mild", "moderate", "severe"]).optional(),
  })).max(20).default([]),
  diagnoses: z.array(z.object({
    text: shortText,
    original: z.string().trim().max(240).optional(),
    icdCode: z.string().trim().max(32).optional(),
  })).max(20).default([]),
  medications: z.array(z.object({
    name: shortText,
    dosage: z.string().trim().max(120).optional(),
    frequency: z.string().trim().max(120).optional(),
    duration: z.string().trim().max(120).optional(),
  })).max(20).default([]),
  labValues: z.array(z.object({
    test: shortText,
    value: z.number().finite(),
    unit: z.string().trim().min(1).max(40),
  })).max(30).default([]),
  vitals: z.array(z.object({
    type: shortText,
    value: shortText,
  })).max(20).default([]),
  procedures: z.array(z.object({ text: shortText })).max(20).default([]),
  followUp: z.string().trim().max(1000).optional(),
  summary: z.string().trim().max(1000).optional(),
}).strict();

export const extractionRequestSchema = z.object({
  transcript: z.string().trim().min(1).max(12_000),
  language: z.string().trim().max(16).optional(),
}).strict();

export const reportRequestSchema = z.object({
  entities: clinicalEntitiesSchema,
  language: z.string().trim().max(16).optional(),
  transcript: z.string().trim().max(12_000).optional(),
}).strict();

export type ClinicalEntities = z.infer<typeof clinicalEntitiesSchema>;
export type ExtractionRequest = z.infer<typeof extractionRequestSchema>;
export type ReportRequest = z.infer<typeof reportRequestSchema>;
