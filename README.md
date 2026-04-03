# VoiceMed AI

Voice-powered medical documentation for India's 22 languages.

Doctors speak in Hindi, Tamil, Telugu, or any Indian language. VoiceMed AI transcribes the speech, extracts medical entities (symptoms, diagnoses, medications, lab values, vitals), and generates structured clinical reports -- in seconds.

## The Problem

India has 1 doctor per 1,000 people. Rural doctors spend 30-40% of their time on paperwork. All medical software demands English, but doctors speak in their local language. Result: handwritten notes that are illegible, lost, and never digitized.

## How It Works

1. **Speak** -- Record in any of 22 Indian languages
2. **Transcribe** -- Whisper ASR converts speech to text
3. **Extract** -- Gemini extracts symptoms, diagnoses, medications, lab values, vitals
4. **Report** -- A structured clinical report is generated with ICD codes and lab references
5. **Verify** -- Report is read back in the source language via TTS

## Tech Stack

- **Next.js 15** + TypeScript + Tailwind CSS v4
- **OpenAI Whisper** for speech-to-text (22+ Indian languages)
- **Google Gemini 2.0 Flash** for medical entity extraction
- **NidaanKosha dataset** -- 50 lab tests with Indian population reference ranges
- **Framer Motion** for animations
- **Vitest** for testing

## Getting Started

```bash
npm install

# Add your API keys
cp .env.example .env.local
# Edit .env.local with your OpenAI and Gemini API keys

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app works in **demo mode** without API keys -- all API routes return realistic sample data.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with pitch, stats, how-it-works |
| `/console` | Voice recording console -- the core product |
| `/reports` | Previously generated reports (localStorage) |
| `/reference` | 50 lab test reference ranges from NidaanKosha |
| `/about` | Problem statement, tech stack, data sources |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/transcribe` | POST | Audio blob to text via Whisper |
| `/api/extract` | POST | Transcript to structured medical entities via Gemini |
| `/api/report` | POST | Entities to formatted clinical report via Gemini |
| `/api/tts` | POST | TTS info (client-side SpeechSynthesis for MVP) |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | No (demo mode) | OpenAI API key for Whisper transcription |
| `GOOGLE_GEMINI_API_KEY` | No (demo mode) | Google Gemini key for entity extraction |

## Data Sources

- [NidaanKosha-100k](https://huggingface.co/datasets/ekacare/NidaanKosha-100k-V1.0) -- 6.8M lab readings from Indian patients
- [AI4Bharat](https://ai4bharat.iitm.ac.in/) -- Indian language speech and NLP models
- [BHASHINI](https://bhashini.gov.in/) -- India's multilingual digital infrastructure

## Disclaimer

VoiceMed AI is a clinical documentation aid. It does not provide medical diagnoses. All output must be reviewed by qualified healthcare professionals.
