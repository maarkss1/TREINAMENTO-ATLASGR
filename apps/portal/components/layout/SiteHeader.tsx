"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Rocket, Search, Bookmark, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useOnboardingStore } from "@/lib/store";
import { levelProgress } from "@/lib/gamification";
import { cn } from "@/lib/utils";
import { PushNotificationsPanel } from "@/components/innovation/PushNotificationsPanel";
import { SpotlightSearchModal } from "@/components/streaming/SpotlightSearchModal";
import { ModuleDetailModal } from "@/components/streaming/ModuleDetailModal";
import type { ModuleMeta } from "@/lib/types";

const links = [
  { href: "/", label: "Início" },
  { href: "/trilha", label: "Trilhas & Módulos" },
  { href: "/produtos", label: "Produtos" },
  { href: "/shorts", label: "Shorts" },
  { href: "/dashboard", label: "Cockpit" },
  { href: "/ranking", label: "Ranking" },
  { href: "/glossario", label: "Glossário" },
  { href: "/certificado", label: "Certificado" },
];

export function SiteHeader({ hideNavLinks = false }: { hideNavLinks?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleMeta | null>(null);

  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const registration = useOnboardingStore((s) => s.registration);
  const xp = useOnboardingStore((s) => s.xp);
  const myList = useOnboardingStore((s) => s.myList || []);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setHidden(true); // scrolling down
        setMenuOpen(false); // auto close menu on scroll down
      } else {
        setHidden(false); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        queueMicrotask(() => setMenuOpen(false));
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    queueMicrotask(() => setMenuOpen(false));
  }, [pathname]);

  const { current } = levelProgress(xp);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 h-16 transition-all duration-300",
          scrolled
            ? "border-b border-border dark:border-white/10 bg-background/85 dark:bg-black/85 backdrop-blur-2xl shadow-md dark:shadow-xl"
            : "bg-gradient-to-b from-background/90 via-background/40 to-transparent dark:from-black/90 dark:via-black/50 dark:to-transparent border-b border-transparent",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="mx-auto flex h-full max-w-[1700px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
          {/* Logo Brand + Nav Links (Grouped with generous spacing) */}
          <div className="flex items-center gap-6 xl:gap-8 min-w-0">
            <Link href="/" className="group flex items-center shrink-0">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Logo />
              </div>
            </Link>

            {/* Navigation Links (Netflix & Apple Style) */}
            {!hideNavLinks && (
              <nav
                aria-label="Navegação principal"
                className="hidden items-center gap-3.5 xl:gap-5 lg:flex"
              >
                {links.map((l) => {
                  const isActive = l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "text-xs xl:text-[13px] font-semibold transition-all relative py-1.5 whitespace-nowrap focus-visible-ring rounded-sm",
                        isActive
                          ? "text-foreground font-black dark:text-white"
                          : "text-muted hover:text-foreground dark:text-zinc-400 dark:hover:text-white"
                      )}
                    >
                      {l.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-atlas-orange rounded-full shadow-[0_0_8px_#FF5618]" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Utility Right Bar */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger (Spotlight) */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-2 hover:bg-zinc-200 text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-zinc-300 dark:hover:text-white text-xs font-medium border border-border dark:border-white/15 backdrop-blur-md transition-all"
              aria-label="Abrir busca"
            >
              <Search size={14} />
              <span className="hidden md:inline">Buscar</span>
              <kbd className="hidden md:inline text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-black/40 text-muted dark:text-zinc-400 border border-border dark:border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* My List Shortcut */}
            {myList.length > 0 && (
              <Link
                href="/trilha?filter=mylist"
                className="relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-2 hover:bg-zinc-200 text-foreground dark:bg-white/10 dark:hover:bg-white/20 dark:text-zinc-300 dark:hover:text-white text-xs font-semibold border border-border dark:border-white/15 transition-all"
                title="Ver Minha Lista"
              >
                <Bookmark size={13} className="text-atlas-orange" />
                <span>Minha Lista</span>
                <span className="w-4 h-4 rounded-full bg-atlas-orange text-white text-[9px] font-mono font-bold flex items-center justify-center">
                  {myList.length}
                </span>
              </Link>
            )}

            {/* Notifications */}
            <PushNotificationsPanel />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile Avatar with XP ring & Level Progress */}
            {mounted && registration && (() => {
              const { pct: levelPct } = levelProgress(xp);
              return (
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1 rounded-full bg-surface-2 border border-border hover:border-atlas-orange/50 dark:bg-white/10 dark:border-white/15 transition-all group"
                  title={`Nível ${current.level}: ${current.title} (${xp} XP)`}
                >
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-atlas-orange/20 border border-atlas-orange font-display font-black text-xs text-atlas-orange">
                    {registration.nomeCompleto.charAt(0)}
                    <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background dark:bg-black text-[8px] font-black text-atlas-orange border border-atlas-orange">
                      {current.level}
                    </div>
                  </div>
                  <div className="hidden xl:flex flex-col text-left leading-none">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider group-hover:text-atlas-orange transition-colors">
                      {registration.nomeCompleto.split(" ")[0]} • {current.title}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs font-black text-foreground dark:text-white">
                        {xp} <span className="text-[10px] font-normal text-muted">XP</span>
                      </span>
                      <div className="w-12 h-1.5 rounded-full bg-border dark:bg-white/20 overflow-hidden">
                        <div
                          className="h-full bg-atlas-orange rounded-full"
                          style={{ width: `${levelPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })()}

            {/* Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className="p-2 lg:hidden rounded-lg bg-surface-2 border border-border text-foreground dark:bg-white/10 dark:border-white/15 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/20 focus-visible-ring"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Navegação mobile"
            className="flex flex-col gap-2 border-t border-border bg-background/95 dark:border-white/10 dark:bg-black/95 backdrop-blur-2xl px-6 py-5 lg:hidden absolute w-full shadow-2xl reveal-up"
          >
            {links.map((l) => {
              const isActive = l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-sm font-bold transition flex items-center justify-between group focus-visible-ring",
                    isActive
                      ? "bg-atlas-orange/20 text-atlas-orange border border-atlas-orange/30"
                      : "text-foreground hover:bg-surface-2 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                  )}
                >
                  {l.label}
                  <Rocket size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      {/* Global Spotlight Search Modal */}
      <SpotlightSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectModule={(mod) => setSelectedModule(mod)}
      />

      {/* Global Module Detail Modal */}
      <ModuleDetailModal
        meta={selectedModule}
        onClose={() => setSelectedModule(null)}
      />
    </>
  );
}
