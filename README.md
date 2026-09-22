# VoiceMed AI

An evidence-first prototype for multilingual speech capture, schema-constrained clinical entity extraction, draft generation, and mandatory human review.

VoiceMed AI is a documentation aid and research project. It does not diagnose, recommend treatment, replace professional judgment, or qualify as a medical device. The public demo is designed for synthetic data only.

## What is implemented

- Deterministic no-key workflow with a public synthetic fixture.
- Optional OpenAI transcription and Gemini extraction/report adapters with server-side secrets.
- Strict Zod contracts for request bodies and provider-generated clinical entities.
- Input size limits, supported audio-type checks, no-store responses, and process-local burst limiting.
- Explicit unreviewed state and a required human-review checkbox before read aloud or download.
- No database, report history, browser storage, or application-managed audio retention.
- Unit and contract tests plus a Playwright test for the complete review gate.

## Architecture

```text
synthetic fixture or microphone
              |
              v
     transcription adapter
              |
              v
       validated transcript
              |
              v
       clinical provider
              |
              v
      strict entity schema
              |
              v
        unreviewed draft
              |
              v
       explicit human review
              |
              v
       user initiated export
```

Provider output is never rendered as trusted structure until it passes the schema. The zero-key path remains deterministic, so a reviewer can inspect the product when external providers are unavailable.

## Run locally

```bash
npm ci
npm run check
npm run dev
```

Open `http://localhost:3000/console` and select **Run synthetic example**.

Optional provider configuration:

```bash
cp .env.example .env.local
```

Secrets stay server-side. Do not add real patient data to the public prototype.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

The browser test verifies that export remains disabled until the human-review state is explicit.

## Security and privacy boundaries

- The application does not persist audio, transcripts, entities, or generated drafts.
- API responses use `Cache-Control: no-store`.
- Audio is limited to supported types and 10 MB.
- Text payloads and output arrays have bounded schemas.
- The in-memory rate limiter is suitable only as a best-effort demo guard. A multi-instance production service needs a shared store.
- Configuring an external provider sends submitted content to that provider under its terms.

## Limitations

- The no-key mode demonstrates workflow contracts, not model accuracy.
- No clinical accuracy or latency metric is claimed yet.
- The language selector is broader than the checked evaluation coverage.
- Public provider evaluation, threat modeling, durable distributed rate limiting, and independent clinical review remain release gates.

## Clean-room statement

The code and synthetic fixtures are independent public portfolio work. They contain no employer, customer, or patient data.

## License

MIT
