"use client";

import { useEffect, useRef, useState } from "react";
import { Gauge, Hand, MessageSquare, Pause, Play, Square, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessibilityToolbarProps {
  currentText: string;
}

export function AccessibilityToolbar({ currentText }: AccessibilityToolbarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [activeSubtitle, setActiveSubtitle] = useState("");
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [librasActive, setLibrasActive] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => synthRef.current?.cancel();
  }, []);

  useEffect(() => {
    synthRef.current?.cancel();
    queueMicrotask(() => {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveSubtitle("");
    });
  }, [currentText]);

  function speakText(textToSpeak: string) {
    const synth = synthRef.current;
    if (!synth || !textToSpeak.trim()) return;

    synth.cancel();
    const cleanText = textToSpeak.replace(/[*_#`-]/g, " ").replace(/\s+/g, " ").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "pt-BR";
    utterance.rate = speechRate;

    const voices = synth.getVoices();
    const ptBRVoice = voices.find((voice) => voice.lang.toLowerCase().includes("pt-br"));
    if (ptBRVoice) utterance.voice = ptBRVoice;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setActiveSubtitle(cleanText);
    };

    utterance.onboundary = (event) => {
      if (event.name !== "word") return;
      const start = Math.max(0, event.charIndex - 24);
      const end = Math.min(cleanText.length, event.charIndex + 90);
      setActiveSubtitle(`${start > 0 ? "…" : ""}${cleanText.slice(start, end)}${end < cleanText.length ? "…" : ""}`);
    };

    const finish = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveSubtitle("");
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    synth.speak(utterance);
  }

  function handlePlay() {
    const synth = synthRef.current;
    if (!synth) return;
    if (isPaused) {
      synth.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }
    speakText(currentText);
  }

  function handlePause() {
    const synth = synthRef.current;
    if (!synth || !isPlaying) return;
    synth.pause();
    setIsPlaying(false);
    setIsPaused(true);
  }

  function handleStop() {
    synthRef.current?.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setActiveSubtitle("");
  }

  function cycleRate() {
    const rates = [1, 1.25, 1.5, 2];
    const nextRate = rates[(rates.indexOf(speechRate) + 1) % rates.length];
    setSpeechRate(nextRate);
    if (isPlaying) {
      window.setTimeout(() => speakText(currentText), 0);
    }
  }

  function toggleLibras() {
    setLibrasActive((prev) => !prev);

    // Injetar script do VLibras dinamicamente se ainda não existir no DOM
    if (!document.getElementById("vlibras-script")) {
      const script = document.createElement("script");
      script.id = "vlibras-script";
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;
      script.onload = () => {
        if ((window as unknown as { VLibras: { Widget: new (url: string) => void } }).VLibras) {
          new (window as unknown as { VLibras: { Widget: new (url: string) => void } }).VLibras.Widget("https://vlibras.gov.br/app");
        }
      };
      document.body.appendChild(script);

      // Injetar elementos div exigidos pelo VLibras
      if (!document.getElementById("vlibras-widget-container")) {
        const container = document.createElement("div");
        container.id = "vlibras-widget-container";
        container.innerHTML = `
          <div vw class="enabled">
            <div vw-access-button class="active"></div>
            <div vw-plugin-wrapper>
              <div class="vw-plugin-top-wrapper"></div>
            </div>
          </div>
        `;
        document.body.appendChild(container);
      }
    }

    const widget = document.getElementById("vlibras-widget-container");
    widget?.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border/60 bg-surface-2/80 p-2 shadow-sm backdrop-blur-md" aria-label="Ferramentas de acessibilidade da aula">
        <div className="flex items-center gap-1 border-r border-border/50 pr-2">
          {!isPlaying ? (
            <button type="button" onClick={handlePlay} className="flex items-center gap-1.5 rounded-xl bg-atlas-orange px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-atlas-orange-2 focus-visible-ring" title="Ouvir esta tela">
              <Play size={14} fill="currentColor" aria-hidden="true" />
              <span>{isPaused ? "Continuar voz" : "Ouvir tela"}</span>
            </button>
          ) : (
            <button type="button" onClick={handlePause} className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-amber-600 focus-visible-ring" title="Pausar narração">
              <Pause size={14} fill="currentColor" aria-hidden="true" />
              <span>Pausar</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button type="button" onClick={handleStop} className="rounded-xl border border-border bg-surface p-1.5 text-muted transition hover:text-foreground focus-visible-ring" title="Parar narração">
              <Square size={14} fill="currentColor" aria-hidden="true" />
            </button>
          )}

          <button type="button" onClick={cycleRate} className="flex items-center gap-1 rounded-xl border border-border bg-surface px-2 py-1 text-[11px] font-bold text-muted transition hover:text-foreground focus-visible-ring" title="Velocidade da leitura">
            <Gauge size={12} aria-hidden="true" />
            <span>{speechRate}x</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowSubtitles((visible) => !visible)}
          aria-pressed={showSubtitles}
          className={cn(
            "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition focus-visible-ring",
            showSubtitles ? "border-atlas-orange/40 bg-surface text-atlas-orange" : "border-border bg-surface text-muted hover:text-foreground",
          )}
          title="Exibir ou ocultar legenda da narração"
        >
          <MessageSquare size={14} aria-hidden="true" />
          <span>Legendas</span>
        </button>

        <button
          type="button"
          onClick={toggleLibras}
          aria-pressed={librasActive}
          className={cn(
            "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition focus-visible-ring",
            librasActive ? "border-indigo-500 bg-indigo-600 text-white shadow-sm" : "border-border bg-surface text-muted hover:text-foreground",
          )}
          title="Abrir o intérprete virtual de LIBRAS"
        >
          <Hand size={14} aria-hidden="true" />
          <span>LIBRAS</span>
        </button>
      </div>

      {showSubtitles && activeSubtitle && (
        <div className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-2xl -translate-x-1/2 rounded-2xl border border-white/20 bg-black/90 p-4 text-center text-white shadow-2xl backdrop-blur-xl" role="status" aria-live="polite">
          <div className="mb-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-atlas-orange">
            <span className="flex items-center gap-1"><Volume2 size={12} aria-hidden="true" /> Narração com legenda</span>
            <button type="button" onClick={() => setActiveSubtitle("")} className="rounded p-1 hover:text-white" aria-label="Fechar legenda">✕</button>
          </div>
          <p className="text-sm font-medium leading-relaxed tracking-wide text-zinc-100">{activeSubtitle}</p>
        </div>
      )}
    </>
  );
}
