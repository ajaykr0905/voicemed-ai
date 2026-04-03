"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, FileText, Volume2, Download, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VoiceRecorder } from "@/components/voice-recorder";
import { LanguageSelector } from "@/components/language-selector";
import { EntityPanel } from "@/components/entity-panel";
import { speakText } from "@/lib/audio";
import { languages } from "@/data/languages";

type Stage = "idle" | "transcribing" | "extracting" | "reporting" | "done";

interface Entities {
  symptoms?: { text: string; severity?: string }[];
  diagnoses?: { text: string; icdCode?: string }[];
  medications?: { name: string; dosage?: string; frequency?: string; duration?: string }[];
  labValues?: { test: string; value: number; unit: string }[];
  vitals?: { type: string; value: string }[];
  summary?: string;
}

export default function ConsolePage() {
  const [language, setLanguage] = useState("hi");
  const [stage, setStage] = useState<Stage>("idle");
  const [transcript, setTranscript] = useState("");
  const [entities, setEntities] = useState<Entities | null>(null);
  const [report, setReport] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setStage("idle");
    setTranscript("");
    setEntities(null);
    setReport("");
    setError("");
  };

  const handleRecording = useCallback(async (blob: Blob) => {
    setError("");
    try {
      setStage("transcribing");
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      const lang = languages.find((l) => l.code === language);
      if (lang) formData.append("language", lang.whisperCode);

      const transcRes = await fetch("/api/transcribe", { method: "POST", body: formData });
      const transcData = await transcRes.json();
      if (transcData.error) throw new Error(transcData.error);
      setTranscript(transcData.transcript);

      setStage("extracting");
      const extRes = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcData.transcript, language }),
      });
      const extData = await extRes.json();
      if (extData.error) throw new Error(extData.error);
      setEntities(extData.entities);

      setStage("reporting");
      const repRes = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entities: extData.entities, language, transcript: transcData.transcript }),
      });
      const repData = await repRes.json();
      if (repData.error) throw new Error(repData.error);
      setReport(repData.report);

      setStage("done");

      const saved = JSON.parse(localStorage.getItem("voicemed-reports") ?? "[]");
      saved.unshift({ id: Date.now().toString(), language, timestamp: new Date().toISOString(), transcript: transcData.transcript, entities: extData.entities, report: repData.report });
      localStorage.setItem("voicemed-reports", JSON.stringify(saved.slice(0, 50)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStage("idle");
    }
  }, [language]);

  const stageLabels: Record<Stage, string> = {
    idle: "",
    transcribing: "Transcribing speech...",
    extracting: "Extracting medical entities...",
    reporting: "Generating report...",
    done: "Complete",
  };

  const processing = stage !== "idle" && stage !== "done";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Voice Console</h1>
          <p className="text-sm text-gray-600 mt-1">Record, transcribe, and generate medical reports</p>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector value={language} onChange={setLanguage} />
          {stage === "done" && (
            <Button variant="outline" size="sm" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" /> New Recording
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-8">
            <VoiceRecorder onRecordingComplete={handleRecording} disabled={processing} />
          </Card>

          {processing && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
              <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
              <span className="text-sm font-medium text-indigo-700">{stageLabels[stage]}</span>
            </motion.div>
          )}

          {transcript && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader><CardTitle className="text-sm">Transcript</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{transcript}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <AnimatePresence>
            {entities && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <EntityPanel entities={entities} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          {report ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4" /> Clinical Report</CardTitle>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => speakText(report.replace(/[#*|_\-]/g, ""), language)} aria-label="Read aloud">
                        <Volume2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => { const blob = new Blob([report], { type: "text/markdown" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `report-${Date.now()}.md`; a.click(); }} aria-label="Download">
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm prose-gray max-w-none prose-headings:text-sm prose-headings:font-semibold prose-p:my-1 prose-ul:my-1 prose-table:text-xs">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 mb-4">
                <FileText className="h-8 w-8 text-indigo-300" />
              </div>
              <p className="font-medium text-gray-400">Clinical report will appear here</p>
              <p className="text-xs text-gray-300 mt-1">Record a clinical note to get started</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
