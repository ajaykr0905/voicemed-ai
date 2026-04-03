import { describe, it, expect } from "vitest";
import { languages, primaryLanguages } from "@/data/languages";
import { labReferences, labCategories, getLabStatus } from "@/data/lab-references";
import { MEDICAL_NER_SYSTEM_PROMPT, REPORT_SYSTEM_PROMPT } from "@/data/medical-prompts";

describe("languages data", () => {
  it("has 22 languages", () => {
    expect(languages).toHaveLength(22);
  });

  it("every language has required fields", () => {
    for (const lang of languages) {
      expect(lang.code.length).toBeGreaterThan(0);
      expect(lang.name.length).toBeGreaterThan(0);
      expect(lang.nativeName.length).toBeGreaterThan(0);
      expect(lang.whisperCode.length).toBeGreaterThan(0);
    }
  });

  it("includes Hindi and English", () => {
    expect(languages.some((l) => l.code === "hi")).toBe(true);
    expect(languages.some((l) => l.code === "en")).toBe(true);
  });

  it("primaryLanguages is a subset of languages", () => {
    for (const pl of primaryLanguages) {
      expect(languages.some((l) => l.code === pl.code)).toBe(true);
    }
  });

  it("has no duplicate codes", () => {
    const codes = languages.map((l) => l.code);
    expect(new Set(codes).size).toBe(codes.length);
  });
});

describe("lab references", () => {
  it("has at least 40 tests", () => {
    expect(labReferences.length).toBeGreaterThanOrEqual(40);
  });

  it("every test has required fields", () => {
    for (const ref of labReferences) {
      expect(ref.testName.length).toBeGreaterThan(0);
      expect(ref.loincCode.length).toBeGreaterThan(0);
      expect(ref.unit.length).toBeGreaterThan(0);
      expect(ref.normalRange.min).toBeLessThanOrEqual(ref.normalRange.max);
      expect(ref.category.length).toBeGreaterThan(0);
    }
  });

  it("has multiple categories", () => {
    expect(labCategories.length).toBeGreaterThanOrEqual(5);
  });

  it("getLabStatus returns correct status", () => {
    expect(getLabStatus("Hemoglobin", 14)).toBe("normal");
    expect(getLabStatus("Hemoglobin", 8)).toBe("low");
    expect(getLabStatus("Hemoglobin", 20)).toBe("high");
    expect(getLabStatus("NonExistentTest", 5)).toBe("unknown");
  });

  it("getLabStatus respects gender-specific ranges", () => {
    expect(getLabStatus("Hemoglobin", 13, "male")).toBe("low");
    expect(getLabStatus("Hemoglobin", 13, "female")).toBe("normal");
  });
});

describe("medical prompts", () => {
  it("NER prompt contains required entity types", () => {
    expect(MEDICAL_NER_SYSTEM_PROMPT).toContain("symptoms");
    expect(MEDICAL_NER_SYSTEM_PROMPT).toContain("diagnoses");
    expect(MEDICAL_NER_SYSTEM_PROMPT).toContain("medications");
    expect(MEDICAL_NER_SYSTEM_PROMPT).toContain("labValues");
    expect(MEDICAL_NER_SYSTEM_PROMPT).toContain("vitals");
  });

  it("report prompt contains report structure", () => {
    expect(REPORT_SYSTEM_PROMPT).toContain("Clinical Report");
    expect(REPORT_SYSTEM_PROMPT).toContain("Diagnosis");
    expect(REPORT_SYSTEM_PROMPT).toContain("Medications");
  });
});
