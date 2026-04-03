"use client";

import { primaryLanguages, type Language } from "@/data/languages";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  value: string;
  onChange: (code: string) => void;
}

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted shrink-0" aria-hidden="true" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer",
        )}
        aria-label="Select language"
      >
        {primaryLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
}
