"use client";

import { motion } from "framer-motion";
import { Stethoscope, Pill, FlaskConical, HeartPulse, FileText } from "lucide-react";

interface Entities {
  symptoms?: { text: string; severity?: string }[];
  diagnoses?: { text: string; icdCode?: string }[];
  medications?: { name: string; dosage?: string; frequency?: string; duration?: string }[];
  labValues?: { test: string; value: number; unit: string }[];
  vitals?: { type: string; value: string }[];
  summary?: string;
}

const SECTION_CONFIG = [
  { key: "symptoms" as const, label: "Symptoms", icon: Stethoscope, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { key: "diagnoses" as const, label: "Diagnoses", icon: FileText, color: "text-red-600 bg-red-50 border-red-200" },
  { key: "medications" as const, label: "Medications", icon: Pill, color: "text-green-600 bg-green-50 border-green-200" },
  { key: "labValues" as const, label: "Lab Values", icon: FlaskConical, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { key: "vitals" as const, label: "Vitals", icon: HeartPulse, color: "text-orange-600 bg-orange-50 border-orange-200" },
];

export function EntityPanel({ entities }: { entities: Entities | null }) {
  if (!entities) return null;

  return (
    <div className="space-y-4">
      {entities.summary && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-indigo-800 mb-1">Clinical Summary</p>
          <p className="text-sm text-indigo-700">{entities.summary}</p>
        </motion.div>
      )}

      {SECTION_CONFIG.map(({ key, label, icon: Icon, color }) => {
        const items = entities[key];
        if (!items || (Array.isArray(items) && items.length === 0)) return null;

        return (
          <motion.div key={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`rounded-xl border p-4 ${color}`}>
            <div className="flex items-center gap-2 mb-3">
              <Icon className="h-4 w-4" />
              <span className="text-sm font-semibold">{label}</span>
              <span className="ml-auto text-xs font-medium opacity-60">{Array.isArray(items) ? items.length : 0}</span>
            </div>
            <div className="space-y-1.5">
              {key === "symptoms" && (entities.symptoms ?? []).map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{s.text}</span>
                  {s.severity && <span className="text-[10px] font-bold uppercase opacity-70">{s.severity}</span>}
                </div>
              ))}
              {key === "diagnoses" && (entities.diagnoses ?? []).map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{d.text}</span>
                  {d.icdCode && <span className="text-[10px] font-mono opacity-60">{d.icdCode}</span>}
                </div>
              ))}
              {key === "medications" && (entities.medications ?? []).map((m, i) => (
                <div key={i} className="text-sm">
                  <span className="font-medium">{m.name}</span>
                  {m.dosage && <span className="opacity-70"> &mdash; {m.dosage}</span>}
                  {m.frequency && <span className="opacity-70">, {m.frequency}</span>}
                  {m.duration && <span className="opacity-70"> for {m.duration}</span>}
                </div>
              ))}
              {key === "labValues" && (entities.labValues ?? []).map((l, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{l.test}</span>
                  <span className="font-mono font-medium">{l.value} {l.unit}</span>
                </div>
              ))}
              {key === "vitals" && (entities.vitals ?? []).map((v, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span>{v.type}</span>
                  <span className="font-mono font-medium">{v.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
