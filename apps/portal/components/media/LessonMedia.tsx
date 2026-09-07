"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Captions,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Sparkles,
  Radio,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoLessonProps {
  youtubeId: string;
  title: string;
  caption: string;
  transcript?: string[];
  source?: string;
}

export function VideoLesson({
  youtubeId,
  title,
  caption,
  transcript = [],
  source,
}: VideoLessonProps) {
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [useInteractiveFallback, setUseInteractiveFallback] = useState(false);

  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[#0E1017] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
      <div className="aspect-video relative bg-[#090A0E] overflow-hidden flex items-center justify-center">
        {playing ? (
          useInteractiveFallback ? (
            /* Player Interativo Atlas Masterclass (Fallback de Alta Fidelidade) */
            <div className="relative w-full h-full bg-gradient-to-br from-[#12141F] via-[#090A0E] to-[#16131D] flex flex-col items-center justify-center p-8 text-center select-none">
              <div className="absolute inset-0 bg-[url('/brand/grid-pattern.svg')] opacity-10 pointer-events-none" />
              <div className="w-16 h-16 rounded-2xl bg-atlas-orange/20 border border-atlas-orange/40 flex items-center justify-center text-atlas-orange mb-4 shadow-[0_0_25px_rgba(255,86,24,0.3)] animate-pulse">
                <Radio size={32} />
              </div>
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-atlas-orange mb-1">
                MASTERCLASS INTERATIVA ATLASGR
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display max-w-xl">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md">
                Este módulo utiliza briefing narrado multimídia com pontos de decisão operacional. Acompanhe pela transcrição executiva abaixo.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowTranscript(true)}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-zinc-200 transition-colors shadow-lg"
                >
                  Abrir Roteiro Completo
                </button>
                <button
                  type="button"
                  onClick={() => setPlaying(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition-colors"
                >
                  Voltar à Capa
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&hl=pt-BR&cc_lang_pref=pt&cc_load_policy=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onError={() => setUseInteractiveFallback(true)}
                className="h-full w-full"
              />
              <button
                type="button"
                onClick={() => setUseInteractiveFallback(true)}
                className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 hover:bg-black text-zinc-300 hover:text-white text-[10px] font-mono border border-white/20 backdrop-blur-md transition-colors"
                title="Alternar para briefing interativo"
              >
                Vídeo indisponível? Ver Briefing
              </button>
            </div>
          )
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative flex h-full w-full items-center justify-center overflow-hidden"
            aria-label={`Reproduzir: ${title}`}
          >
            {/* Background Cyber / Video Poster */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1A1C28] via-[#0E1017] to-[#1F1713]" />
            <div className="absolute inset-0 bg-[url('/brand/grid-pattern.svg')] opacity-15 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-atlas-orange/15 rounded-full blur-[80px] pointer-events-none" />

            {/* Play Button Glow */}
            <span className="relative z-10 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-transform duration-300 group-hover:scale-110">
              <Play size={32} className="fill-black ml-1" aria-hidden="true" />
            </span>

            {/* Bottom Title Overlay */}
            <div className="absolute bottom-5 left-6 right-6 z-10 text-left">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-atlas-orange/20 text-atlas-orange border border-atlas-orange/30 backdrop-blur-md mb-2 inline-block">
                Masterclass Vídeo & Briefing
              </span>
              <h3 className="text-base sm:text-lg font-black text-white font-display drop-shadow-md">
                {title}
              </h3>
            </div>
          </button>
        )}
      </div>

      <figcaption className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-atlas-orange">
              Sessão Multimídia
            </p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-zinc-300">
              {caption}
            </p>
          </div>

          {transcript.length > 0 && (
            <button
              type="button"
              onClick={() => setShowTranscript((value) => !value)}
              aria-expanded={showTranscript}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-zinc-300 transition-colors hover:border-atlas-orange/40 hover:text-white"
            >
              <Captions size={15} aria-hidden="true" /> {showTranscript ? "Ocultar Roteiro" : "Ler Transcrição"}
            </button>
          )}
        </div>

        {showTranscript && transcript.length > 0 && (
          <div
            className="mt-5 rounded-2xl border border-white/10 bg-black/50 p-6 space-y-3"
            aria-label={`Transcrição de ${title}`}
          >
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
              Roteiro & Transcrição Oficial
            </p>
            {transcript.map((paragraph, index) => (
              <p key={index} className="text-sm font-medium leading-relaxed text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

interface AudioLessonProps {
  title: string;
  text: string;
  caption?: string;
}

export function AudioLesson({ title, text, caption }: AudioLessonProps) {
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [rate, setRate] = useState(1);
  const [progressPct, setProgressPct] = useState(0);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const cleanText = useMemo(
    () => text.replace(/[*_#`]/g, " ").replace(/\s+/g, " ").trim(),
    [text]
  );

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => synthRef.current?.cancel();
  }, []);

  function play() {
    const synth = synthRef.current;
    if (!synth) return;

    if (status === "paused") {
      synth.resume();
      setStatus("playing");
      return;
    }

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "pt-BR";
    utterance.rate = rate;

    const voices = synth.getVoices();
    const ptBRVoice = voices.find((item) => item.lang.toLowerCase().includes("pt-br"));
    if (ptBRVoice) utterance.voice = ptBRVoice;

    utterance.onboundary = (e) => {
      if (cleanText.length > 0) {
        setProgressPct(Math.min(100, Math.round((e.charIndex / cleanText.length) * 100)));
      }
    };

    utterance.onend = () => {
      setStatus("idle");
      setProgressPct(100);
    };

    utterance.onerror = () => {
      setStatus("idle");
    };

    synth.speak(utterance);
    setStatus("playing");
  }

  function pause() {
    synthRef.current?.pause();
    setStatus("paused");
  }

  function restart() {
    synthRef.current?.cancel();
    setStatus("idle");
    setProgressPct(0);
    window.setTimeout(play, 50);
  }

  return (
    <section
      className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#12131C] via-[#0E1016] to-[#12131C] p-6 shadow-xl select-none"
      aria-label={`Podcast: ${title}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Side: Audio Meta & Animated Visualizer */}
        <div className="flex items-start gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-atlas-orange/15 border border-atlas-orange/30 text-atlas-orange shadow-glow">
            <Volume2 size={24} aria-hidden="true" />
            {/* Equalizer Visualizer Bars */}
            {status === "playing" && (
              <div className="absolute -bottom-1 flex items-end gap-0.5 h-3">
                <span className="w-1 bg-atlas-orange rounded-full animate-[bounce_0.6s_infinite_100ms] h-2.5" />
                <span className="w-1 bg-atlas-orange rounded-full animate-[bounce_0.5s_infinite_200ms] h-3" />
                <span className="w-1 bg-atlas-orange rounded-full animate-[bounce_0.7s_infinite_300ms] h-2" />
                <span className="w-1 bg-atlas-orange rounded-full animate-[bounce_0.4s_infinite_150ms] h-3" />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-widest bg-atlas-orange/20 text-atlas-orange border border-atlas-orange/30">
                Atlas Podcast
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                ÁUDIO EXECUTIVO
              </span>
            </div>

            <h4 className="mt-1 font-display text-lg sm:text-xl font-black text-white">
              {title}
            </h4>

            {caption && (
              <p className="text-xs text-zinc-400 mt-1 font-medium max-w-xl">
                {caption}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Playback Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={restart}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Reiniciar áudio"
            aria-label="Reiniciar áudio"
          >
            <RotateCcw size={16} />
          </button>

          {status === "playing" ? (
            <button
              type="button"
              onClick={pause}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-black px-5 py-2.5 text-xs font-black hover:bg-zinc-200 transition-colors shadow-lg"
            >
              <Pause size={16} className="fill-black" /> Pausar
            </button>
          ) : (
            <button
              type="button"
              onClick={play}
              className="inline-flex items-center gap-2 rounded-xl bg-atlas-orange text-white px-5 py-2.5 text-xs font-black hover:bg-atlas-orange/90 transition-colors shadow-glow"
            >
              <Play size={16} className="fill-white" /> {status === "paused" ? "Continuar" : "Ouvir Podcast"}
            </button>
          )}

          <button
            type="button"
            onClick={() => setRate((current) => (current >= 1.75 ? 1 : current + 0.25))}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-mono font-bold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Ajustar velocidade da narração"
          >
            {rate.toFixed(2)}x
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {status !== "idle" && (
        <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-atlas-orange rounded-full shadow-[0_0_8px_#FF5618] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      )}

      {/* Transcript Accordion */}
      <details className="mt-4 rounded-xl border border-white/5 bg-black/40 p-4 text-xs">
        <summary className="cursor-pointer font-mono font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
          Ler Texto do Roteiro em Áudio
        </summary>
        <p className="mt-3 text-zinc-300 leading-relaxed font-medium">
          {cleanText}
        </p>
      </details>
    </section>
  );
}
