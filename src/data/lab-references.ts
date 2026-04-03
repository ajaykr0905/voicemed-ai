export interface LabReference {
  testName: string;
  loincCode: string;
  unit: string;
  normalRange: { min: number; max: number };
  maleRange?: { min: number; max: number };
  femaleRange?: { min: number; max: number };
  category: string;
  description: string;
}

export const labReferences: LabReference[] = [
  { testName: "Fasting Blood Glucose", loincCode: "1558-6", unit: "mg/dL", normalRange: { min: 70, max: 100 }, category: "Diabetes", description: "Blood sugar level after 8-12 hours of fasting" },
  { testName: "HbA1c", loincCode: "4548-4", unit: "%", normalRange: { min: 4.0, max: 5.6 }, category: "Diabetes", description: "Average blood sugar over past 2-3 months" },
  { testName: "Post-Prandial Glucose", loincCode: "1521-4", unit: "mg/dL", normalRange: { min: 70, max: 140 }, category: "Diabetes", description: "Blood sugar 2 hours after meal" },
  { testName: "Random Blood Sugar", loincCode: "2345-7", unit: "mg/dL", normalRange: { min: 70, max: 200 }, category: "Diabetes", description: "Blood sugar at any random time" },
  { testName: "Hemoglobin", loincCode: "718-7", unit: "g/dL", normalRange: { min: 12, max: 17 }, maleRange: { min: 13.5, max: 17.5 }, femaleRange: { min: 12, max: 16 }, category: "Hematology", description: "Oxygen-carrying protein in red blood cells" },
  { testName: "WBC Count", loincCode: "6690-2", unit: "cells/mcL", normalRange: { min: 4500, max: 11000 }, category: "Hematology", description: "White blood cell count indicating immune response" },
  { testName: "Platelet Count", loincCode: "777-3", unit: "lakhs/mcL", normalRange: { min: 1.5, max: 4.0 }, category: "Hematology", description: "Blood clotting cell count" },
  { testName: "RBC Count", loincCode: "789-8", unit: "million/mcL", normalRange: { min: 4.0, max: 6.0 }, maleRange: { min: 4.5, max: 5.5 }, femaleRange: { min: 4.0, max: 5.0 }, category: "Hematology", description: "Red blood cell count" },
  { testName: "ESR", loincCode: "4537-7", unit: "mm/hr", normalRange: { min: 0, max: 20 }, maleRange: { min: 0, max: 15 }, femaleRange: { min: 0, max: 20 }, category: "Hematology", description: "Erythrocyte sedimentation rate - inflammation marker" },
  { testName: "Total Cholesterol", loincCode: "2093-3", unit: "mg/dL", normalRange: { min: 0, max: 200 }, category: "Lipid Profile", description: "Total blood cholesterol level" },
  { testName: "HDL Cholesterol", loincCode: "2085-9", unit: "mg/dL", normalRange: { min: 40, max: 60 }, category: "Lipid Profile", description: "Good cholesterol - higher is better" },
  { testName: "LDL Cholesterol", loincCode: "2089-1", unit: "mg/dL", normalRange: { min: 0, max: 100 }, category: "Lipid Profile", description: "Bad cholesterol - lower is better" },
  { testName: "Triglycerides", loincCode: "2571-8", unit: "mg/dL", normalRange: { min: 0, max: 150 }, category: "Lipid Profile", description: "Fat in blood from recent meals" },
  { testName: "Serum Creatinine", loincCode: "2160-0", unit: "mg/dL", normalRange: { min: 0.6, max: 1.2 }, maleRange: { min: 0.7, max: 1.3 }, femaleRange: { min: 0.6, max: 1.1 }, category: "Kidney", description: "Kidney function marker" },
  { testName: "Blood Urea Nitrogen", loincCode: "3094-0", unit: "mg/dL", normalRange: { min: 7, max: 20 }, category: "Kidney", description: "Waste product filtered by kidneys" },
  { testName: "Uric Acid", loincCode: "3084-1", unit: "mg/dL", normalRange: { min: 3.5, max: 7.2 }, maleRange: { min: 3.5, max: 7.2 }, femaleRange: { min: 2.6, max: 6.0 }, category: "Kidney", description: "Waste product linked to gout risk" },
  { testName: "SGOT (AST)", loincCode: "1920-8", unit: "U/L", normalRange: { min: 5, max: 40 }, category: "Liver", description: "Liver enzyme - elevated in liver damage" },
  { testName: "SGPT (ALT)", loincCode: "1742-6", unit: "U/L", normalRange: { min: 7, max: 56 }, category: "Liver", description: "Liver enzyme - most specific for liver damage" },
  { testName: "Alkaline Phosphatase", loincCode: "6768-6", unit: "U/L", normalRange: { min: 44, max: 147 }, category: "Liver", description: "Enzyme from liver and bones" },
  { testName: "Total Bilirubin", loincCode: "1975-2", unit: "mg/dL", normalRange: { min: 0.1, max: 1.2 }, category: "Liver", description: "Breakdown product of hemoglobin" },
  { testName: "Serum Albumin", loincCode: "1751-7", unit: "g/dL", normalRange: { min: 3.5, max: 5.5 }, category: "Liver", description: "Protein made by liver - nutritional marker" },
  { testName: "Total Protein", loincCode: "2885-2", unit: "g/dL", normalRange: { min: 6.0, max: 8.3 }, category: "Liver", description: "Total protein in blood" },
  { testName: "TSH", loincCode: "3016-3", unit: "mIU/L", normalRange: { min: 0.4, max: 4.0 }, category: "Thyroid", description: "Thyroid stimulating hormone" },
  { testName: "Free T3", loincCode: "3051-0", unit: "pg/mL", normalRange: { min: 2.3, max: 4.1 }, category: "Thyroid", description: "Active thyroid hormone" },
  { testName: "Free T4", loincCode: "3024-7", unit: "ng/dL", normalRange: { min: 0.8, max: 1.8 }, category: "Thyroid", description: "Thyroid hormone precursor" },
  { testName: "Serum Calcium", loincCode: "17861-6", unit: "mg/dL", normalRange: { min: 8.5, max: 10.5 }, category: "Minerals", description: "Blood calcium level" },
  { testName: "Serum Sodium", loincCode: "2951-2", unit: "mEq/L", normalRange: { min: 136, max: 145 }, category: "Electrolytes", description: "Sodium level - fluid balance" },
  { testName: "Serum Potassium", loincCode: "2823-3", unit: "mEq/L", normalRange: { min: 3.5, max: 5.0 }, category: "Electrolytes", description: "Potassium level - heart and muscle function" },
  { testName: "Serum Iron", loincCode: "2498-4", unit: "mcg/dL", normalRange: { min: 60, max: 170 }, category: "Minerals", description: "Iron level in blood" },
  { testName: "Vitamin D (25-OH)", loincCode: "1989-3", unit: "ng/mL", normalRange: { min: 30, max: 100 }, category: "Vitamins", description: "Vitamin D status - bone health" },
  { testName: "Vitamin B12", loincCode: "2132-9", unit: "pg/mL", normalRange: { min: 200, max: 900 }, category: "Vitamins", description: "B12 level - nerve function" },
  { testName: "Ferritin", loincCode: "2276-4", unit: "ng/mL", normalRange: { min: 12, max: 300 }, maleRange: { min: 20, max: 500 }, femaleRange: { min: 12, max: 150 }, category: "Minerals", description: "Iron storage protein" },
  { testName: "CRP (C-Reactive Protein)", loincCode: "1988-5", unit: "mg/L", normalRange: { min: 0, max: 3 }, category: "Inflammation", description: "Inflammation marker" },
  { testName: "Prothrombin Time", loincCode: "5902-2", unit: "seconds", normalRange: { min: 11, max: 13.5 }, category: "Coagulation", description: "Blood clotting time" },
  { testName: "Blood Urea", loincCode: "3091-6", unit: "mg/dL", normalRange: { min: 15, max: 40 }, category: "Kidney", description: "Waste product from protein metabolism" },
  { testName: "eGFR", loincCode: "33914-3", unit: "mL/min", normalRange: { min: 90, max: 120 }, category: "Kidney", description: "Estimated kidney filtration rate" },
  { testName: "HCT (Hematocrit)", loincCode: "4544-3", unit: "%", normalRange: { min: 36, max: 48 }, maleRange: { min: 40, max: 54 }, femaleRange: { min: 36, max: 48 }, category: "Hematology", description: "Percentage of blood that is red blood cells" },
  { testName: "MCV", loincCode: "787-2", unit: "fL", normalRange: { min: 80, max: 100 }, category: "Hematology", description: "Mean red blood cell volume" },
  { testName: "MCH", loincCode: "785-6", unit: "pg", normalRange: { min: 27, max: 33 }, category: "Hematology", description: "Mean hemoglobin per red blood cell" },
  { testName: "MCHC", loincCode: "786-4", unit: "g/dL", normalRange: { min: 32, max: 36 }, category: "Hematology", description: "Mean hemoglobin concentration in red blood cells" },
  { testName: "Fasting Insulin", loincCode: "1979-4", unit: "mIU/L", normalRange: { min: 2, max: 25 }, category: "Diabetes", description: "Insulin level after fasting" },
  { testName: "VLDL Cholesterol", loincCode: "2091-7", unit: "mg/dL", normalRange: { min: 5, max: 40 }, category: "Lipid Profile", description: "Very low density lipoprotein cholesterol" },
  { testName: "GGT", loincCode: "2324-2", unit: "U/L", normalRange: { min: 0, max: 45 }, category: "Liver", description: "Gamma-glutamyl transferase - liver/bile duct marker" },
  { testName: "Direct Bilirubin", loincCode: "1968-7", unit: "mg/dL", normalRange: { min: 0, max: 0.3 }, category: "Liver", description: "Conjugated bilirubin" },
  { testName: "Phosphorus", loincCode: "2777-1", unit: "mg/dL", normalRange: { min: 2.5, max: 4.5 }, category: "Minerals", description: "Blood phosphorus level" },
  { testName: "Magnesium", loincCode: "2601-3", unit: "mg/dL", normalRange: { min: 1.7, max: 2.2 }, category: "Minerals", description: "Blood magnesium level" },
  { testName: "Amylase", loincCode: "1798-8", unit: "U/L", normalRange: { min: 28, max: 100 }, category: "Pancreas", description: "Enzyme from pancreas and salivary glands" },
  { testName: "Lipase", loincCode: "3040-3", unit: "U/L", normalRange: { min: 0, max: 160 }, category: "Pancreas", description: "Pancreatic enzyme - pancreatitis marker" },
  { testName: "PSA (Prostate Specific Antigen)", loincCode: "2857-1", unit: "ng/mL", normalRange: { min: 0, max: 4 }, category: "Oncology", description: "Prostate screening marker (males)" },
  { testName: "Urine Albumin", loincCode: "1754-1", unit: "mg/L", normalRange: { min: 0, max: 30 }, category: "Kidney", description: "Protein in urine - early kidney damage marker" },
];

export const labCategories = [...new Set(labReferences.map((r) => r.category))];

export function getLabStatus(testName: string, value: number, gender?: "male" | "female"): "normal" | "low" | "high" | "unknown" {
  const ref = labReferences.find((r) => r.testName.toLowerCase() === testName.toLowerCase());
  if (!ref) return "unknown";
  const range = gender === "male" && ref.maleRange ? ref.maleRange : gender === "female" && ref.femaleRange ? ref.femaleRange : ref.normalRange;
  if (value < range.min) return "low";
  if (value > range.max) return "high";
  return "normal";
}
