import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        transcript: "[Demo mode] Patient reports fever for 3 days, headache, and body pain. Blood pressure 130/85. Prescribed Paracetamol 500mg twice daily for 5 days. Follow up in one week.",
        language: "en",
        demo: true,
      });
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;
    const languageHint = formData.get("language") as string | null;

    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey });
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: languageHint || undefined,
      response_format: "verbose_json",
    });

    return NextResponse.json({
      transcript: transcription.text,
      language: transcription.language,
      duration: transcription.duration,
      demo: false,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Transcription failed";
    console.error("[transcribe]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
