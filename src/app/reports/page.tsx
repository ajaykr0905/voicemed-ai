"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Clock, Globe, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { languages } from "@/data/languages";

interface SavedReport {
  id: string;
  language: string;
  timestamp: string;
  transcript: string;
  report: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<SavedReport[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("voicemed-reports") ?? "[]");
      setReports(saved);
    } catch { /* ignore */ }
  }, []);

  const deleteReport = (id: string) => {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    localStorage.setItem("voicemed-reports", JSON.stringify(updated));
    if (selected === id) setSelected(null);
  };

  const activeReport = reports.find((r) => r.id === selected);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Report History</h1>
        <p className="text-sm text-gray-600 mt-1">{reports.length} saved reports (stored locally)</p>
      </div>

      {reports.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-16 text-center">
          <FileText className="h-12 w-12 text-gray-200 mb-4" />
          <p className="text-gray-400 font-medium">No reports yet</p>
          <p className="text-xs text-gray-300 mt-1">Generate a report from the Voice Console to see it here.</p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-1">
            {reports.map((r, i) => {
              const lang = languages.find((l) => l.code === r.language);
              return (
                <motion.button
                  key={r.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(r.id)}
                  className={`w-full rounded-xl border p-4 text-left transition-all cursor-pointer ${selected === r.id ? "border-indigo-500 bg-indigo-50 shadow-sm" : "border-border bg-white hover:bg-gray-50"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{r.transcript.slice(0, 60)}...</p>
                      <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(r.timestamp).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{lang?.name ?? r.language}</span>
                      </div>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); deleteReport(r.id); }} className="shrink-0 rounded p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 cursor-pointer" aria-label="Delete">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.button>
              );
            })}
          </div>
          <div className="lg:col-span-2">
            {activeReport ? (
              <Card>
                <CardHeader><CardTitle className="text-sm flex items-center gap-2"><FileText className="h-4 w-4" /> Report</CardTitle></CardHeader>
                <CardContent>
                  <div className="prose prose-sm prose-gray max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{activeReport.report}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="flex items-center justify-center p-16 text-center">
                <p className="text-gray-400 text-sm">Select a report to view</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
