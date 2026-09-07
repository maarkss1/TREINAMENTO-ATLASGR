"use client";

import { useOnboardingStore } from "@/lib/store";
import { Users, Award, BookOpen, CheckCircle, Search } from "lucide-react";
import { useMemo, useState, useEffect, useCallback } from "react";



export interface SeedCollaborator {
  nome: string;
  cargo: string;
  departamento: string;
  status: "concluido" | "andamento" | "pendente";
  progresso: number;
  notaMedia: number;
  tempoEstudadoMin: number;
  ultimoAcesso: string;
}

const SEED_COLLABORATORS: SeedCollaborator[] = [
  { nome: "Ana Silva", cargo: "Analista de Operações", departamento: "Operações", status: "concluido", progresso: 100, notaMedia: 92, tempoEstudadoMin: 180, ultimoAcesso: "2026-03-28" },
  { nome: "Carlos Eduardo", cargo: "Operador de Rastreamento", departamento: "C.I.A", status: "andamento", progresso: 60, notaMedia: 85, tempoEstudadoMin: 110, ultimoAcesso: "2026-03-29" },
  { nome: "Mariana Costa", cargo: "Coordenadora de Risco", departamento: "GR", status: "concluido", progresso: 100, notaMedia: 98, tempoEstudadoMin: 210, ultimoAcesso: "2026-03-27" },
  { nome: "Roberto Oliveira", cargo: "Assistente Comercial", departamento: "Comercial", status: "pendente", progresso: 0, notaMedia: 0, tempoEstudadoMin: 0, ultimoAcesso: "2026-03-20" },
  { nome: "Fernanda Souza", cargo: "Analista Securitária", departamento: "Profile", status: "andamento", progresso: 40, notaMedia: 78, tempoEstudadoMin: 75, ultimoAcesso: "2026-03-29" },
  { nome: "Lucas Mendes", cargo: "Desenvolvedor Backend", departamento: "Tecnologia", status: "concluido", progresso: 100, notaMedia: 95, tempoEstudadoMin: 160, ultimoAcesso: "2026-03-26" },
  { nome: "Beatriz Lima", cargo: "Supervisor de Logística", departamento: "Operações", status: "andamento", progresso: 80, notaMedia: 88, tempoEstudadoMin: 145, ultimoAcesso: "2026-03-29" },
];

interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminPage() {
  const registration = useOnboardingStore((s) => s.registration);
  const examResult = useOnboardingStore((s) => s.examResult);
  const [query, setQuery] = useState("");
  const [apiUsers, setApiUsers] = useState<ApiUser[]>([]);

  const fetchUsers = useCallback(() => {
    fetch("http://localhost:3001/users")
      .then((r) => r.json())
      .then(setApiUsers)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const rows: SeedCollaborator[] = useMemo(() => {
    const you: SeedCollaborator[] = registration
      ? [
          {
            nome: `${(registration as unknown as Record<string, unknown>).nomeCompleto || ((registration as unknown as Record<string, unknown>).name as string)} (sessão atual)`,
            cargo: String((registration as unknown as Record<string, unknown>).cargo || ((registration as unknown as Record<string, unknown>).role as string) || "Colaborador"),
            departamento: String((registration as unknown as Record<string, unknown>).departamento || ((registration as unknown as Record<string, unknown>).company as string) || "AtlasGR"),
            status: examResult?.passed ? "concluido" : "andamento",
            progresso: examResult?.passed ? 100 : 40,
            notaMedia: examResult?.score ?? 0,
            tempoEstudadoMin: 0,
            ultimoAcesso: new Date().toISOString().slice(0, 10),
          },
        ]
      : [];

    return [...you, ...SEED_COLLABORATORS];
  }, [registration, examResult]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.nome.toLowerCase().includes(q) ||
        r.cargo.toLowerCase().includes(q) ||
        r.departamento.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const totalColabs = rows.length;
  const concluidos = rows.filter((r) => r.status === "concluido").length;
  const emAndamento = rows.filter((r) => r.status === "andamento").length;
  const mediaNotaGlobal = Math.round(
    rows.reduce((acc, r) => acc + r.notaMedia, 0) / (totalColabs || 1)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-secondary text-2xl font-bold text-foreground sm:text-3xl">
          Painel do Administrador
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhamento em tempo real do engajamento, notas e conclusão dos treinamentos da equipe.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total de Alunos
            </span>
            <div className="rounded-lg bg-atlas-orange/10 p-2 text-atlas-orange">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-foreground">{totalColabs}</p>
          <p className="mt-1 text-xs text-muted-foreground">Colaboradores ativos na plataforma</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Certificados Emitidos
            </span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-500">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400">{concluidos}</p>
          <p className="mt-1 text-xs text-muted-foreground">Concluíram 100% dos módulos</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Em Treinamento
            </span>
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-500">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-amber-400">{emAndamento}</p>
          <p className="mt-1 text-xs text-muted-foreground">Com módulos em andamento</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Média Global
            </span>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-foreground">{mediaNotaGlobal}%</p>
          <p className="mt-1 text-xs text-muted-foreground">Aproveitamento nos quizzes</p>
        </div>
      </div>

      {/* Users via NestJS Backend if Available */}
      {apiUsers.length > 0 && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-bold text-foreground mb-4">Usuários do Backend NestJS (API)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {apiUsers.map((u) => (
              <div key={u.id} className="p-3 rounded-lg bg-secondary/50 border border-border">
                <p className="font-semibold text-sm text-foreground">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
                <span className="inline-block mt-2 text-[10px] uppercase font-bold text-atlas-orange bg-atlas-orange/10 px-2 py-0.5 rounded">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Table */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">Relatório Individual de Desempenho</h2>
            <p className="text-xs text-muted-foreground">Filtre por colaborador, cargo ou departamento.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar colaborador..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border bg-secondary/30 text-muted-foreground uppercase font-mono text-[10px] tracking-wider">
                <th className="px-4 py-3 font-semibold">Colaborador</th>
                <th className="px-4 py-3 font-semibold">Departamento</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Progresso</th>
                <th className="px-4 py-3 font-semibold">Nota Média</th>
                <th className="px-4 py-3 font-semibold">Último Acesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filtered.map((r, i) => (
                <tr key={i} className="hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{r.nome}</p>
                    <p className="text-[11px] text-muted-foreground">{r.cargo}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{r.departamento}</td>
                  <td className="px-4 py-3">
                    {r.status === "concluido" && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                        Concluído
                      </span>
                    )}
                    {r.status === "andamento" && (
                      <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                        Em Andamento
                      </span>
                    )}
                    {r.status === "pendente" && (
                      <span className="inline-flex items-center rounded-full bg-zinc-500/10 px-2.5 py-0.5 text-[10px] font-bold text-zinc-400 border border-zinc-500/20">
                        Não Iniciado
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-atlas-orange rounded-full"
                          style={{ width: `${r.progresso}%` }}
                        />
                      </div>
                      <span className="font-mono text-muted-foreground">{r.progresso}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold font-mono text-foreground">
                    {r.notaMedia > 0 ? `${r.notaMedia}%` : "-"}
                  </td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">{r.ultimoAcesso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
