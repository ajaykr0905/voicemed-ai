import { NextResponse } from "next/server";

export function jsonNoStore(body: unknown, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export function rateLimited(retryAfterSeconds: number) {
  const response = jsonNoStore(
    { error: "Too many requests. Please wait before trying again." },
    { status: 429 },
  );
  response.headers.set("Retry-After", String(retryAfterSeconds));
  return response;
}
