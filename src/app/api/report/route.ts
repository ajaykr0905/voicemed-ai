import { jsonNoStore, rateLimited } from "@/lib/api";
import { reportRequestSchema } from "@/lib/clinical-schema";
import { getClinicalProvider } from "@/lib/providers/clinical";
import { requestKey, takeRequest } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const rate = takeRequest(requestKey(request, "report"));
  if (!rate.allowed) return rateLimited(rate.retryAfterSeconds);

  try {
    const parsed = reportRequestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return jsonNoStore({ error: "Validated entities are required to create a draft." }, { status: 400 });
    }
    const provider = getClinicalProvider();
    const report = await provider.report(parsed.data);
    return jsonNoStore({ report, mode: provider.mode, reviewRequired: true });
  } catch (error) {
    console.error("[report]", error instanceof Error ? error.message : "provider failure");
    return jsonNoStore({ error: "The draft note could not be generated." }, { status: 502 });
  }
}
