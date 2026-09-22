"use client";

import { motion } from "framer-motion";
import { Mic, Brain, Database, Shield, Globe, Zap } from "lucide-react";

const stack = [
  { icon: Mic, name: "Transcription adapter", desc: "Deterministic demo mode with an optional OpenAI Whisper provider" },
  { icon: Brain, name: "Clinical provider adapter", desc: "Schema-validated demo mode with optional Gemini extraction and drafting" },
  { icon: Database, name: "Public reference explorer", desc: "A separate, inspectable set of lab reference entries" },
  { icon: Globe, name: "Next.js + TypeScript", desc: "Full-stack routes, typed contracts, and a no-key demo path" },
  { icon: Zap, name: "Tailwind CSS v4 + Framer Motion", desc: "Modern UI with accessible, responsive design" },
  { icon: Shield, name: "Public-demo boundary", desc: "Synthetic-data-only guidance, no report history, explicit review before export" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">About VoiceMed AI</h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          VoiceMed AI explores a narrow engineering question: how can a multilingual speech workflow produce structured documentation while making uncertainty and review state visible?
        </p>
        <p className="mt-3 text-lg text-gray-600 leading-relaxed">
          It is an <strong>end-to-end research prototype</strong>, not a diagnosis system or medical device. The default path uses synthetic fixtures, provider output is schema validated, and a human review gate is required before export.
        </p>
      </motion.div>

      <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Tech Stack</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {stack.map((s) => (
            <div key={s.name} className="flex items-start gap-3 rounded-xl border border-border p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600"><s.icon className="h-5 w-5" /></div>
              <div><p className="font-medium text-gray-900">{s.name}</p><p className="text-sm text-gray-500">{s.desc}</p></div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Data Sources</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-5">
            <h3 className="font-semibold text-gray-900">NidaanKosha-100k</h3>
            <p className="mt-1 text-sm text-gray-600">6.8M+ lab readings from 100K Indian patients. LOINC-mapped, anonymized, CC-BY-SA-4.0.</p>
            <a href="https://huggingface.co/datasets/ekacare/NidaanKosha-100k-V1.0" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-indigo-600 hover:underline">View on HuggingFace</a>
          </div>
          <div className="rounded-xl border border-border p-5">
            <h3 className="font-semibold text-gray-900">AI4Bharat</h3>
            <p className="mt-1 text-sm text-gray-600">1,704 hours of speech data across 22 Indian languages from 10,496 speakers. IIT Madras initiative.</p>
            <a href="https://ai4bharat.iitm.ac.in/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs text-indigo-600 hover:underline">Visit AI4Bharat</a>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 rounded-xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-amber-800 mb-2">Medical Disclaimer</h2>
        <p className="text-sm text-amber-700 leading-relaxed">
          VoiceMed AI is a clinical documentation aid and <strong>does not provide medical diagnoses</strong>. All extracted entities
          and generated reports must be reviewed and verified by qualified healthcare professionals. Do not make treatment
          decisions based solely on AI-generated output. The NidaanKosha reference ranges are population-level statistics
          and may not apply to individual patients.
        </p>
      </motion.section>
    </div>
  );
}
