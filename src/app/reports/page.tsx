import Link from "next/link";
import { Database, FileDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const boundaries = [
  {
    icon: Database,
    title: "No application history",
    detail: "The public prototype does not save transcripts, extracted entities, audio, or generated drafts in a database or browser storage.",
  },
  {
    icon: ShieldCheck,
    title: "Human review is mandatory",
    detail: "Read aloud and download controls remain disabled until the reviewer explicitly confirms that the draft was checked.",
  },
  {
    icon: FileDown,
    title: "Export is explicit",
    detail: "A reviewed Markdown file is created only when the reviewer chooses Download. The application does not retain that file.",
  },
];

export default function DataPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Public demo boundary</p>
      <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Session only by design</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">VoiceMed AI is a portfolio prototype for synthetic data. It deliberately omits report history so reviewers can inspect the workflow without creating a hidden store of sensitive information.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {boundaries.map((boundary) => (
          <Card key={boundary.title}>
            <CardHeader><boundary.icon className="h-6 w-6 text-indigo-600" /><CardTitle className="mt-3 text-base">{boundary.title}</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-relaxed text-gray-600">{boundary.detail}</p></CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">Do not enter real patient data. Configuring third party provider keys sends the submitted content to those providers under their own terms. This prototype is not a medical device.</div>
      <Link href="/console"><Button className="mt-8">Open the synthetic demo</Button></Link>
    </div>
  );
}
