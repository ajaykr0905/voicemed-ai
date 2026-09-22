import { GoogleGenerativeAI } from "@google/generative-ai";
import { clinicalEntitiesSchema, type ClinicalEntities, type ExtractionRequest, type ReportRequest } from "@/lib/clinical-schema";
import { DEMO_ENTITIES } from "@/lib/demo-fixture";
import { MEDICAL_NER_SYSTEM_PROMPT, REPORT_SYSTEM_PROMPT } from "@/data/medical-prompts";

export interface ClinicalProvider {
  readonly mode: "demo" | "provider";
  extract(input: ExtractionRequest): Promise<ClinicalEntities>;
  report(input: ReportRequest): Promise<string>;
}

export class DemoClinicalProvider implements ClinicalProvider {
  readonly mode = "demo" as const;

  async extract(input: ExtractionRequest): Promise<ClinicalEntities> {
    void input;
    return clinicalEntitiesSchema.parse(structuredClone(DEMO_ENTITIES));
  }

  async report(input: ReportRequest): Promise<string> {
    const entities = clinicalEntitiesSchema.parse(input.entities);
    const list = (items: string[]) => items.length > 0 ? items.map((item) => `- ${item}`).join("\n") : "- None documented";
    return `# Draft Clinical Note
**Mode:** Synthetic demo
**Language:** ${input.language ?? "English"}

## Reported symptoms
${list(entities.symptoms.map((item) => `${item.text}${item.severity ? ` (${item.severity})` : ""}`))}

## Clinician documented diagnoses
${list(entities.diagnoses.map((item) => `${item.text}${item.icdCode ? ` (${item.icdCode})` : ""}`))}

## Documented vitals
${list(entities.vitals.map((item) => `${item.type}: ${item.value}`))}

## Documented medications
${list(entities.medications.map((item) => [item.name, item.dosage, item.frequency, item.duration].filter(Boolean).join(", ")))}

## Follow up
${entities.followUp ?? "None documented"}

---
*Synthetic demonstration only. This unreviewed draft is not a diagnosis or treatment recommendation.*`;
  }
}

export class GeminiClinicalProvider implements ClinicalProvider {
  readonly mode = "provider" as const;
  private readonly model;

  constructor(apiKey: string) {
    this.model = new GoogleGenerativeAI(apiKey).getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  async extract(input: ExtractionRequest): Promise<ClinicalEntities> {
    const prompt = `${MEDICAL_NER_SYSTEM_PROMPT}\n\nLanguage: ${input.language ?? "unknown"}\nTranscript:\n${input.transcript}`;
    const result = await this.model.generateContent(prompt);
    const raw = result.response.text().replace(/```(?:json)?/g, "").trim();
    return clinicalEntitiesSchema.parse(JSON.parse(raw));
  }

  async report(input: ReportRequest): Promise<string> {
    const prompt = `${REPORT_SYSTEM_PROMPT}\n\nLanguage: ${input.language ?? "unknown"}\nTranscript:\n${input.transcript ?? "Not supplied"}\n\nValidated entities:\n${JSON.stringify(input.entities)}`;
    const result = await this.model.generateContent(prompt);
    const report = result.response.text().trim();
    if (!report || report.length > 32_000) {
      throw new Error("Provider returned an invalid report");
    }
    return report;
  }
}

export function getClinicalProvider(): ClinicalProvider {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  return apiKey ? new GeminiClinicalProvider(apiKey) : new DemoClinicalProvider();
}
