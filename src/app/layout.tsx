import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "VoiceMed AI | Human-reviewed documentation lab", template: "%s | VoiceMed AI" },
  description: "A synthetic-data prototype for multilingual transcription, schema-constrained extraction, and human-reviewed clinical documentation drafts.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
