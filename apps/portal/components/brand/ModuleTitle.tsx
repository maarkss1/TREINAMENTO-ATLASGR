import React from "react";
import { cn } from "@/lib/utils";

interface ModuleTitleProps {
  title: string;
  className?: string;
  logoClassName?: string;
}

export function ModuleTitle({ title, className }: ModuleTitleProps) {
  const cleanTitle = title.replace(/\s+/g, " ").trim();

  // Tratamento específico para "Bem-vindo à AtlasGR" garantindo separação visual perfeita
  if (/bem-vindo\s+[aà]\s*atlas/i.test(cleanTitle)) {
    return (
      <span className={cn("inline-flex flex-wrap items-center tracking-tight", className)}>
        <span className="text-atlas-orange font-black mr-2 sm:mr-3">Bem-vindo à</span>
        <span className="text-foreground dark:text-white font-black">AtlasGR</span>
      </span>
    );
  }

  // Substitui ATLASGR / AtlasGR / Atlasgr com destaque e espaçamento seguro
  const atlasMatch = cleanTitle.match(/^(.*?)(?:ATLASGR|Atlasgr|AtlasGR)(.*)$/i);

  if (!atlasMatch) {
    return <span className={cn("text-atlas-orange", className)}>{title}</span>;
  }

  const [, prefix, suffix] = atlasMatch;

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2.5 sm:gap-x-3.5 text-atlas-orange", className)}>
      {prefix && <span>{prefix.trim()}</span>}
      <span className="text-foreground dark:text-white font-black tracking-tight">AtlasGR</span>
      {suffix && <span>{suffix.trim()}</span>}
    </span>
  );
}
