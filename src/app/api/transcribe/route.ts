import { jsonNoStore, rateLimited } from "@/lib/api";
import { getTranscriptionProvider } from "@/lib/providers/transcription";
import { requestKey, takeRequest } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_AUDIO_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "audio/mp4",
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
]);

export async function POST(request: Request) {
  const rate = takeRequest(requestKey(request, "transcribe"), 8);
  if (!rate.allowed) return rateLimited(rate.retryAfterSeconds);

  try {
    const provider = getTranscriptionProvider();
    if (!process.env.OPENAI_API_KEY) {
      return jsonNoStore(await provider.transcribe(null));
    }

    const declaredLength = Number(request.headers.get("content-length") ?? "0");
    if (declaredLength > MAX_AUDIO_BYTES + 64_000) {
      return jsonNoStore({ error: "Audio must be 10 MB or smaller." }, { status: 413 });
    }

    const formData = await request.formData();
    const audio = formData.get("audio");
    const languageValue = formData.get("language");
    const language = typeof languageValue === "string" ? languageValue.slice(0, 16) : undefined;
    if (!(audio instanceof File)) {
      return jsonNoStore({ error: "An audio file is required." }, { status: 400 });
    }
    if (audio.size === 0 || audio.size > MAX_AUDIO_BYTES || !ALLOWED_TYPES.has(audio.type)) {
      return jsonNoStore({ error: "Use a supported audio file no larger than 10 MB." }, { status: 400 });
    }

    return jsonNoStore(await provider.transcribe(audio, language));
  } catch (error) {
    console.error("[transcribe]", error instanceof Error ? error.message : "provider failure");
    return jsonNoStore({ error: "Transcription could not be completed." }, { status: 502 });
  }
}
