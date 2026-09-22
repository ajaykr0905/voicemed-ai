import { describe, expect, it } from "vitest";
import { extractionRequestSchema, clinicalEntitiesSchema } from "@/lib/clinical-schema";
import { DEMO_ENTITIES, DEMO_TRANSCRIPT } from "@/lib/demo-fixture";
import { DemoClinicalProvider } from "@/lib/providers/clinical";

describe("clinical contracts", () => {
  it("accepts the public synthetic fixture", () => {
    expect(clinicalEntitiesSchema.parse(DEMO_ENTITIES)).toEqual(DEMO_ENTITIES);
    expect(extractionRequestSchema.parse({ transcript: DEMO_TRANSCRIPT, language: "en" }).transcript).toBe(DEMO_TRANSCRIPT);
  });

  it("rejects oversized and unexpected input", () => {
    expect(extractionRequestSchema.safeParse({ transcript: "x".repeat(12_001) }).success).toBe(false);
    expect(extractionRequestSchema.safeParse({ transcript: "valid", secret: "unexpected" }).success).toBe(false);
  });

  it("rejects malformed provider output", () => {
    expect(clinicalEntitiesSchema.safeParse({ diagnoses: [{ text: "" }] }).success).toBe(false);
    expect(clinicalEntitiesSchema.safeParse({ symptoms: [], unknown: true }).success).toBe(false);
  });
});

describe("deterministic provider", () => {
  it("returns schema-valid fields and an explicitly synthetic draft", async () => {
    const provider = new DemoClinicalProvider();
    const entities = await provider.extract({ transcript: DEMO_TRANSCRIPT, language: "en" });
    expect(clinicalEntitiesSchema.safeParse(entities).success).toBe(true);
    const report = await provider.report({ entities, transcript: DEMO_TRANSCRIPT, language: "en" });
    expect(report).toContain("Synthetic demo");
    expect(report).toContain("not a diagnosis");
  });
});
