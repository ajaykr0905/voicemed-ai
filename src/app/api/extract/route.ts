import { jsonNoStore, rateLimited } from "@/lib/api";
import { extractionRequestSchema } from "@/lib/clinical-schema";
import { getClinicalProvider } from "@/lib/providers/clinical";
import { requestKey, takeRequest } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rate = takeRequest(requestKey(request, "extract"));
  if (!rate.allowed) return rateLimited(rate.retryAfterSeconds);

  try {
    const parsed = extractionRequestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return jsonNoStore({ error: "A valid transcript and optional language are required." }, { status: 400 });
    }
    const provider = getClinicalProvider();
    const entities = await provider.extract(parsed.data);
    return jsonNoStore({ entities, mode: provider.mode });
  } catch (error) {
    console.error("[extract]", error instanceof Error ? error.message : "provider failure");
    return jsonNoStore({ error: "Structured extraction could not be completed." }, { status: 502 });
  }
}
