import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null || !("text" in body)) {
      return NextResponse.json({ error: "Send { text, language }" }, { status: 400 });
    }

    const { text, language } = body as { text: string; language?: string };

    const response = NextResponse.json({
      message: "TTS is handled client-side via browser SpeechSynthesis API for the MVP. Use the speakText() utility.",
      text: text.slice(0, 200),
      language: language ?? "en",
      hint: "Upgrade path: integrate AI4Bharat Indic-Parler-TTS or VEXYL-TTS for production-quality Indian language speech synthesis.",
    });
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch {
    return NextResponse.json({ error: "TTS request failed" }, { status: 500 });
  }
}
