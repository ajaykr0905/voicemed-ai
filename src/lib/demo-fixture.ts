import type { ClinicalEntities } from "@/lib/clinical-schema";

export const DEMO_TRANSCRIPT =
  "Synthetic example. The patient reports fever for three days, headache, and body pain. Blood pressure is 130 over 85. The clinician documented viral pyrexia and prescribed paracetamol 500 milligrams twice daily for five days, with follow up in one week.";

export const DEMO_ENTITIES: ClinicalEntities = {
  symptoms: [
    { text: "Fever", severity: "moderate" },
    { text: "Headache", severity: "mild" },
    { text: "Body pain", severity: "moderate" },
  ],
  diagnoses: [{ text: "Viral pyrexia", icdCode: "R50.9" }],
  medications: [{
    name: "Paracetamol",
    dosage: "500 mg",
    frequency: "Twice daily",
    duration: "5 days",
  }],
  labValues: [],
  vitals: [{ type: "Blood pressure", value: "130/85 mmHg" }],
  procedures: [],
  followUp: "Review in one week",
  summary: "Synthetic documentation example with fever, headache, body pain, blood pressure, and an explicitly documented treatment plan.",
};
