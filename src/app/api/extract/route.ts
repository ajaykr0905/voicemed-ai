import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MEDICAL_NER_SYSTEM_PROMPT } from "@/data/medical-prompts";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null || !("transcript" in body)) {
      return NextResponse.json({ error: "Send { transcript, language }" }, { status: 400 });
    }

    const { transcript, language } = body as { transcript: string; language?: string };
    if (!transcript?.trim()) {
      return NextResponse.json({ error: "Empty transcript" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        entities: {
          symptoms: [
            { text: "Fever", severity: "moderate" },
            { text: "Headache", severity: "mild" },
            { text: "Body pain", severity: "moderate" },
          ],
          diagnoses: [{ text: "Viral Pyrexia", icdCode: "R50.9" }],
          medications: [{ name: "Paracetamol", dosage: "500mg", frequency: "Twice daily", duration: "5 days" }],
          vitals: [{ type: "BP", value: "130/85 mmHg" }],
          summary: "Patient with viral fever, headache and body pain. BP mildly elevated. Prescribed antipyretics.",
        },
        demo: true,
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: MEDICAL_NER_SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Ready to extract medical entities. Send me the clinical transcript." }] },
      ],
    });

    const prompt = language
      ? `Language: ${language}\n\nTranscript: "${transcript}"`
      : `Transcript: "${transcript}"`;

    const result = await chat.sendMessage(prompt);
    let responseText = result.response.text();

    responseText = responseText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const entities = JSON.parse(responseText);
    return NextResponse.json({ entities, demo: false });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Extraction failed";
    console.error("[extract]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
