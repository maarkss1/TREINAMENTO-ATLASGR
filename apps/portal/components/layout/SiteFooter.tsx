"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LifeBuoy, FileText, ShieldAlert, CheckCircle2, Tv, Cpu, Award } from "lucide-react";

export function SiteFooter() {
  const pathname = usePathname();

  // Ocultar o footer em rotas de foco (módulo da trilha)
  if (pathname?.startsWith("/trilha/") && pathname.split("/").length > 2) {
    return null;
  }

  return (
    <footer className="w-full border-t border-border bg-surface dark:border-white/10 dark:bg-[#08080a] py-12 select-none">
      <div className="mx-auto max-w-[1700px] px-6 sm:px-10 lg:px-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border dark:border-white/5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-xs font-mono text-muted dark:text-zinc-400 font-semibold">
              Status dos Sistemas: <strong className="text-foreground dark:text-white">Operação e Sensores 99.98% Online</strong>
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-muted dark:text-zinc-500 font-mono">
            <span>ÁUDIO ULTRA HD</span>
            <span>•</span>
            <span>QUALIDADE 4K</span>
            <span>•</span>
            <span>PGR INTEGRADO</span>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted dark:text-zinc-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="font-bold text-foreground dark:text-zinc-400 tracking-wider">ATLASGR ACADEMY STREAMING</span>
            <span>© {new Date().getFullYear()} AtlasGR Gerenciamento de Risco. Todos os direitos reservados.</span>
          </div>

          <nav aria-label="Links de Rodapé" className="flex flex-wrap items-center gap-6">
            <Link
              href="/ajuda"
              className="hover:text-atlas-orange transition-colors flex items-center gap-1.5"
            >
              <LifeBuoy size={13} /> Suporte Acadêmico
            </Link>
            <Link
              href="/termos"
              className="hover:text-atlas-orange transition-colors flex items-center gap-1.5"
            >
              <FileText size={13} /> Termos de Uso
            </Link>
            <Link
              href="/politica-de-privacidade"
              className="hover:text-atlas-orange transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert size={13} /> Conformidade LGPD
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
