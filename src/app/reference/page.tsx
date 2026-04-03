"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, FlaskConical } from "lucide-react";
import { labReferences, labCategories } from "@/data/lab-references";

export default function ReferencePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return labReferences.filter((r) => {
      const matchesSearch = !search || r.testName.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === "All" || r.category === category;
      return matchesSearch && matchesCat;
    });
  }, [search, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Lab Reference Ranges</h1>
        <p className="text-sm text-gray-600 mt-1">{labReferences.length} tests from NidaanKosha (Indian population data)</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tests..." className="w-full rounded-lg border border-border bg-white pl-10 pr-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" aria-label="Search tests" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <button onClick={() => setCategory("All")} className={`rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${category === "All" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>All</button>
          {labCategories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${category === c ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">Test</th>
                <th className="px-5 py-3 font-medium">Normal Range</th>
                <th className="px-5 py-3 font-medium">Unit</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">LOINC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {filtered.map((r, i) => (
                <motion.tr key={r.loincCode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i * 0.02, 0.3) }} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium text-gray-900">{r.testName}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{r.description}</div>
                  </td>
                  <td className="px-5 py-3 font-mono text-gray-700">{r.normalRange.min} – {r.normalRange.max}</td>
                  <td className="px-5 py-3 text-gray-600">{r.unit}</td>
                  <td className="px-5 py-3"><span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">{r.category}</span></td>
                  <td className="px-5 py-3 font-mono text-xs text-gray-400 hidden sm:table-cell">{r.loincCode}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center"><FlaskConical className="h-10 w-10 text-gray-200 mx-auto mb-3" /><p className="text-gray-400 text-sm">No tests match your search</p></div>
        )}
      </div>
    </div>
  );
}
