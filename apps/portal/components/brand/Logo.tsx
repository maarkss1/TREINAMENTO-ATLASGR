import { cn } from "@/lib/utils";
import { BASE_PATH } from "@/lib/basePath";

// Logomarca oficial da ATLASGR, baixada de atlasgr.com.br (public/brand/*.svg).
// Plain <img> (não next/image): no modo unoptimized do static export, o
// next/image não reescreve o src com o basePath do GitHub Pages.
export function Logo({ className, withWordmark = true }: { className?: string; withWordmark?: boolean }) {
  if (!withWordmark) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE_PATH}/brand/atlas-favicon.svg`} alt="ATLASGR" width={28} height={19} />
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center shrink-0 min-w-[140px] h-[31px]", className)} role="img" aria-label="ATLASGR">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_PATH}/brand/atlas-logo.svg`}
        alt=""
        aria-hidden="true"
        width={140}
        height={31}
        className="block dark:hidden shrink-0 w-[140px] h-[31px]"
      />
      {/* Variante negativa oficial: preserva o símbolo laranja e o nome branco. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_PATH}/brand/atlas-logo-negative.svg`}
        alt=""
        aria-hidden="true"
        width={140}
        height={31}
        className="hidden dark:block shrink-0 w-[140px] h-[31px]"
      />
    </span>
  );
}
