"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card } from "@/components/ui/Card";
import { glossary } from "@/content/glossary";

export default function GlossarioPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossary;
    return glossary.filter(
      (g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-foreground">Glossário Técnico</h1>
        <p className="mt-2 text-muted">
          {glossary.length} termos reunidos a partir dos materiais internos da ATLASGR e de fontes públicas do
          setor de transporte e seguros. Novos termos serão incorporados conforme os demais módulos forem concluídos.
        </p>

        <div className="relative mt-6">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar termo (ex.: PGR, checklist, malícia...)"
            className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-10 text-sm outline-none focus:border-atlas-orange"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground text-xs font-bold"
              aria-label="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {filtered.map((g) => (
            <Card key={g.id} className="p-5">
              <p className="font-display font-semibold text-foreground">{g.term}</p>
              <p className="mt-1.5 text-sm text-muted">{g.definition}</p>
              {g.atlasUsage && (
                <p className="mt-2 text-xs font-medium text-[#c2410c] dark:text-atlas-orange">
                  Como a Atlas usa: {g.atlasUsage}
                </p>
              )}
            </Card>
          ))}
          {filtered.length === 0 && <p className="text-muted">Nenhum termo encontrado para &ldquo;{query}&rdquo;.</p>}
        </div>
      </main>
    </div>
  );
}
