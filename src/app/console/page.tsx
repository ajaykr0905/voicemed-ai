"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, FileText, FlaskConical, Loader2, RotateCcw, ShieldCheck, Volume2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EntityPanel } from "@/components/entity-panel";
import { LanguageSelector } from "@/components/language-selector";
import { VoiceRecorder } from "@/components/voice-recorder";
import { languages } from "@/data/languages";
import type { ClinicalEntities } from "@/lib/clinical-schema";
import { DEMO_TRANSCRIPT } from "@/lib/demo-fixture";
import { speakText } from "@/lib/audio";

type Stage = "idle" | "transcribing" | "extracting" | "reporting" | "done";
type Mode = "demo" | "provider" | null;

export default function ConsolePage() {
  const [language, setLanguage] = useState("en");
  const [stage, setStage] = useState<Stage>("idle");
  const [transcript, setTranscript] = useState("");
  const [entities, setEntities] = useState<ClinicalEntities | null>(null);
  const [report, setReport] = useState("");
  const [mode, setMode] = useState<Mode>(null);
  const [reviewed, setReviewed] = useState(false);
  const [error, setError] = useState("");

  const reset = () => {
    setStage("idle");
    setTranscript("");
    setEntities(null);
    setReport("");
    setMode(null);
    setReviewed(false);
    setError("");
  };

  const runPipeline = useCallback(async (input: string) => {
    setTranscript(input);
    setReviewed(false);
    setStage("extracting");
    const extractionResponse = await fetch("/api/extract", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript: input, language }),
    });
    const extraction = await extractionResponse.json();
    if (!extractionResponse.ok) throw new Error(extraction.error || "Extraction failed");
    setEntities(extraction.entities);
    setMode(extraction.mode);

    setStage("reporting");
    const reportResponse = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entities: extraction.entities, language, transcript: input }),
    });
    const draft = await reportResponse.json();
    if (!reportResponse.ok) throw new Error(draft.error || "Draft generation failed");
    setReport(draft.report);
    setMode(draft.mode);
    setStage("done");
  }, [language]);

  const handleRecording = useCallback(async (blob: Blob) => {
    setError("");
    try {
      setStage("transcribing");
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      const selectedLanguage = languages.find((item) => item.code === language);
      if (selectedLanguage) formData.append("language", selectedLanguage.whisperCode);
      const response = await fetch("/api/transcribe", { method: "POST", body: formData });
      const transcription = await response.json();
      if (!response.ok) throw new Error(transcription.error || "Transcription failed");
      setMode(transcription.mode);
      await runPipeline(transcription.transcript);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The workflow could not be completed.");
      setStage("idle");
    }
  }, [language, runPipeline]);

  const runSyntheticDemo = async () => {
    setError("");
    try {
      await runPipeline(DEMO_TRANSCRIPT);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The demo could not be completed.");
      setStage("idle");
    }
  };

  const downloadReviewedDraft = () => {
    if (!reviewed) return;
    const blob = new Blob([report], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reviewed-draft-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const stageLabels: Record<Stage, string> = {
    idle: "",
    transcribing: "Transcribing speech",
    extracting: "Validating structured fields",
    reporting: "Preparing a reviewable draft",
    done: "Draft ready for review",
  };
  const processing = stage !== "idle" && stage !== "done";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <section className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" aria-label="Safety notice">
        <strong>Research prototype.</strong> Use synthetic data only. VoiceMed AI assists documentation and does not diagnose, recommend treatment, or replace professional review.
      </section>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Documentation Lab</h1>
            {mode && <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700">{mode === "demo" ? "Synthetic demo" : "Provider mode"}</span>}
          </div>
          <p className="mt-1 text-sm text-gray-600">Speech to validated fields to a human reviewed draft</p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector value={language} onChange={setLanguage} />
          {stage === "done" && <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="h-3.5 w-3.5" /> Reset</Button>}
        </div>
      </div>

      {error && <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><strong>Unable to continue:</strong> {error}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-8">
            <VoiceRecorder onRecordingComplete={handleRecording} disabled={processing} />
            <div className="mt-6 border-t border-gray-100 pt-6 text-center">
              <p className="mb-3 text-xs text-gray-500">No microphone or API key needed</p>
              <Button variant="outline" onClick={runSyntheticDemo} disabled={processing}>
                <FlaskConical className="h-4 w-4" /> Run synthetic example
              </Button>
            </div>
          </Card>

          {processing && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4" aria-live="polite"><Loader2 className="h-5 w-5 animate-spin text-indigo-600" /><span className="text-sm font-medium text-indigo-700">{stageLabels[stage]}</span></motion.div>}

          {transcript && <Card><CardHeader><CardTitle className="text-sm">Transcript</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{transcript}</p></CardContent></Card>}

          <AnimatePresence>{entities && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><EntityPanel entities={entities} /></motion.div>}</AnimatePresence>
        </div>

        <div>
          {report ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4" /> Unreviewed draft</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" disabled={!reviewed} onClick={() => speakText(report.replace(/[#*|_\-]/g, ""), language)} aria-label="Read reviewed draft aloud"><Volume2 className="h-3.5 w-3.5" /></Button>
                      <Button size="sm" variant="outline" disabled={!reviewed} onClick={downloadReviewedDraft} aria-label="Download reviewed draft"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm prose-gray max-w-none prose-headings:text-sm prose-headings:font-semibold prose-p:my-1 prose-ul:my-1 prose-table:text-xs"><ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown></div>
                  <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-950">
                    <input type="checkbox" checked={reviewed} onChange={(event) => setReviewed(event.target.checked)} className="mt-0.5 h-4 w-4" />
                    <span><strong className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Human review completed</strong>I checked the transcript, fields, and draft. Enable export only after this review.</span>
                  </label>
                  <p className="mt-3 text-xs text-gray-500">This session is not saved by the application. Export is an explicit user action.</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="flex min-h-[400px] flex-col items-center justify-center p-12 text-center"><div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50"><FileText className="h-8 w-8 text-indigo-300" /></div><p className="font-medium text-gray-400">A reviewable draft will appear here</p><p className="mt-1 text-xs text-gray-300">Run the synthetic example to inspect the complete flow</p></Card>
          )}
        </div>
      </div>
    </div>
  );
}
