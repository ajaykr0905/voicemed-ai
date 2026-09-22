"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mic, ArrowRight, Languages, Brain, FileText, Volume2, Shield, Zap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { languages } from "@/data/languages";
import { labReferences } from "@/data/lab-references";

const stats = [
  { label: "Language options", value: languages.length, icon: Languages },
  { label: "Synthetic lab references", value: labReferences.length, icon: Database },
  { label: "Review required", value: "100%", icon: Shield },
];

const steps = [
  { icon: Mic, title: "Capture", desc: "Record a synthetic note or use the deterministic no-key example.", color: "from-indigo-500 to-violet-500" },
  { icon: Brain, title: "Structure", desc: "Validate explicitly documented symptoms, diagnoses, medications, and vitals against a schema.", color: "from-violet-500 to-purple-500" },
  { icon: FileText, title: "Draft", desc: "Render validated fields as a concise, clearly labelled unreviewed note.", color: "from-purple-500 to-pink-500" },
  { icon: Volume2, title: "Review", desc: "Require human confirmation before read aloud or download is enabled.", color: "from-pink-500 to-rose-500" },
];

const features = [
  { icon: Languages, title: "Multilingual inputs", desc: "Twenty two language options make the interface testable across common Indian language selections." },
  { icon: Brain, title: "Schema constrained output", desc: "Provider output is rejected unless it matches the documented clinical entity schema." },
  { icon: Database, title: "Reference explorer", desc: `${labReferences.length} public lab reference entries are exposed as a separate, reviewable dataset.` },
  { icon: Shield, title: "Session only", desc: "The public prototype saves no report history and asks reviewers to use synthetic data only." },
  { icon: FileText, title: "Explicit draft state", desc: "Generated content is labelled unreviewed and export stays locked until a human review step." },
  { icon: Zap, title: "Deterministic demo", desc: "The complete no-key flow works with a fixed synthetic fixture when model providers are unavailable." },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-violet-50 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-6">
              <Mic className="h-3.5 w-3.5" /> Human reviewed AI documentation lab
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-[1.1]">
              Turn speech into a{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">reviewable draft</span>,
              with clear safety boundaries
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              A synthetic-data prototype for multilingual transcription, schema-constrained extraction, draft generation, and mandatory professional review.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/console">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20">
                  <Mic className="h-4 w-4" /> Run synthetic demo
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">How It Works <ArrowRight className="h-4 w-4" /></Button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-14 grid grid-cols-3 gap-4 max-w-lg">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="rounded-xl border border-indigo-100 bg-white/80 backdrop-blur-sm p-4 text-center shadow-sm">
                <s.icon className="h-5 w-5 text-indigo-500 mx-auto mb-2" aria-hidden="true" />
                <p className="text-2xl font-bold text-indigo-600">{s.value}</p>
                <p className="text-[11px] text-gray-500">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">Four steps from speech to structured medical report.</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm text-center">
              <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-sm`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Step {i + 1}</div>
              <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Features</h2>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 mb-4"><f.icon className="h-5 w-5" /></div>
                <h3 className="font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Inspect the complete workflow</h2>
        <p className="mt-3 text-gray-600">No account or provider key is required for the deterministic synthetic example.</p>
        <Link href="/console">
          <Button size="lg" className="mt-6 bg-indigo-600 hover:bg-indigo-500">
            <Mic className="h-4 w-4" /> Open documentation lab
          </Button>
        </Link>
      </section>
    </div>
  );
}
