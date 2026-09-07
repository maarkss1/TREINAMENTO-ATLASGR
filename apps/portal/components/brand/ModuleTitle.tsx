import React from "react";
import { BASE_PATH } from "@/lib/basePath";
import { cn } from "@/lib/utils";

interface ModuleTitleProps {
  title: string;
  className?: string;
  logoClassName?: string;
}

export function ModuleTitle({ title, className, logoClassName }: ModuleTitleProps) {
  // Substitui ATLASGR / AtlasGR / Atlasgr pelo logotipo oficial da Atlas
  const atlasMatch = title.match(/^(.*?)(?:ATLASGR|Atlasgr|AtlasGR)(.*)$/i);

  if (!atlasMatch) {
    return <span className={cn("text-atlas-orange", className)}>{title}</span>;
  }

  const [, prefix, suffix] = atlasMatch;

  return (
    <span className={cn("inline-flex flex-wrap items-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 text-atlas-orange", className)}>
      {prefix && <span>{prefix}</span>}
      <img
        src={`${BASE_PATH}/brand/atlas-logo-negative.svg`}
        alt="Atlas"
        className={cn(
          "inline-block h-[0.78em] w-auto align-baseline mb-0.5 sm:mb-1.5 drop-shadow-[0_2px_14px_rgba(255,86,24,0.35)] shrink-0",
          logoClassName
        )}
      />
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
