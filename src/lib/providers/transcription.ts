import OpenAI from "openai";
import { DEMO_TRANSCRIPT } from "@/lib/demo-fixture";

export type TranscriptionResult = {
  transcript: string;
  language: string;
  duration?: number;
  mode: "demo" | "provider";
};

export interface TranscriptionProvider {
  transcribe(file: File | null, language?: string): Promise<TranscriptionResult>;
}

class DemoTranscriptionProvider implements TranscriptionProvider {
  async transcribe(): Promise<TranscriptionResult> {
    return { transcript: DEMO_TRANSCRIPT, language: "en", mode: "demo" };
  }
}

class OpenAITranscriptionProvider implements TranscriptionProvider {
  private readonly client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async transcribe(file: File | null, language?: string): Promise<TranscriptionResult> {
    if (!file) {
      throw new Error("No audio file provided");
    }
    const transcription = await this.client.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language: language || undefined,
      response_format: "verbose_json",
    });
    return {
      transcript: transcription.text,
      language: transcription.language,
      duration: transcription.duration,
      mode: "provider",
    };
  }
}

export function getTranscriptionProvider(): TranscriptionProvider {
  const apiKey = process.env.OPENAI_API_KEY;
  return apiKey ? new OpenAITranscriptionProvider(apiKey) : new DemoTranscriptionProvider();
}
