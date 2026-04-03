"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getMicrophoneAccess, createMediaRecorder } from "@/lib/audio";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  disabled?: boolean;
}

export function VoiceRecorder({ onRecordingComplete, disabled }: VoiceRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [levels, setLevels] = useState<number[]>(Array(20).fill(4));
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const updateLevels = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const step = Math.floor(data.length / 20);
    const newLevels = Array.from({ length: 20 }, (_, i) => Math.max(4, (data[i * step] / 255) * 40));
    setLevels(newLevels);
    animRef.current = requestAnimationFrame(updateLevels);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await getMicrophoneAccess();
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const recorder = createMediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        onRecordingComplete(blob);
        stream.getTracks().forEach((t) => t.stop());
        audioCtx.close();
      };

      recorder.start(100);
      recorderRef.current = recorder;
      setRecording(true);
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
      updateLevels();
    } catch (err) {
      console.error("Microphone access failed:", err);
    }
  }, [onRecordingComplete, updateLevels]);

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current !== null) clearInterval(timerRef.current);
    cancelAnimationFrame(animRef.current);
    setLevels(Array(20).fill(4));
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-end justify-center gap-[3px] h-12" aria-hidden="true">
        {levels.map((h, i) => (
          <motion.div
            key={i}
            className={cn("w-1.5 rounded-full", recording ? "bg-red-500" : "bg-gray-200")}
            animate={{ height: h }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </div>

      <div className="relative">
        {recording && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/20"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <Button
          size="icon"
          onClick={recording ? stopRecording : startRecording}
          disabled={disabled}
          className={cn(
            "relative z-10 h-20 w-20 rounded-full text-white shadow-lg",
            recording
              ? "bg-red-500 hover:bg-red-600 shadow-red-500/25"
              : "bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-indigo-500/25",
          )}
          aria-label={recording ? "Stop recording" : "Start recording"}
        >
          {recording ? <Square className="h-7 w-7" /> : <Mic className="h-8 w-8" />}
        </Button>
      </div>

      <div className="text-center">
        {recording ? (
          <p className="text-sm font-medium text-red-600 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Recording {formatTime(duration)}
          </p>
        ) : (
          <p className="text-sm text-muted">Tap to start recording</p>
        )}
      </div>
    </div>
  );
}
