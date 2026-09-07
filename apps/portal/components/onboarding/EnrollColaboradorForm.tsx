"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";

const fields: { key: string; label: string; required?: boolean; type?: string }[] = [
  { key: "nomeCompleto", label: "Nome completo", required: true },
  { key: "email", label: "E-mail", required: true, type: "email" },
  { key: "senha", label: "Senha (padrão: Atlas@123)", type: "password" },
  { key: "cpf", label: "CPF", required: true },
  { key: "cargo", label: "Cargo", required: true },
  { key: "departamento", label: "Departamento", required: true },
  { key: "gestor", label: "Gestor(a) responsável" },
  { key: "telefone", label: "Telefone" },
  { key: "empresa", label: "Empresa" },
  { key: "cidade", label: "Cidade" },
  { key: "estado", label: "Estado" },
];

const emptyForm: Record<string, string> = {
  nomeCompleto: "",
  email: "",
  senha: "",
  cpf: "",
  cargo: "",
  departamento: "",
  gestor: "",
  telefone: "",
  empresa: "ATLASGR",
  cidade: "",
  estado: "",
};

// Cadastro exclusivo do Administrador — grava diretamente na API NestJS
export function EnrollColaboradorForm({ onEnrolled }: { onEnrolled?: () => void }) {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const missingRequired = fields.filter((f) => f.required && !form[f.key]?.trim());

  async function handleSubmit() {
    setSubmitted(true);
    setSuccessMsg(null);
    setErrorMsg(null);
    if (missingRequired.length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.senha || "Atlas@123",
          name: form.nomeCompleto,
          cpf: form.cpf,
          cargo: form.cargo,
          departamento: form.departamento,
          gestor: form.gestor,
          telefone: form.telefone,
          empresa: form.empresa,
          cidade: form.cidade,
          estado: form.estado,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Erro ao cadastrar colaborador.");
      }

      const created = await res.json();
      setSuccessMsg(`Colaborador "${created.name}" cadastrado! Acesso: ${created.email}`);
      onEnrolled?.();
      setForm(emptyForm);
      setSubmitted(false);
    } catch (err: unknown) {
      setErrorMsg((err as Error).message ?? "Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className="flex flex-col gap-1 text-xs font-medium text-muted">
            {f.label}
            {f.required && <span className="text-atlas-orange"> *</span>}
            <input
              type={f.type ?? "text"}
              value={form[f.key]}
              onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
              className="h-10 rounded-lg border border-border bg-surface-2 px-3 text-sm text-foreground outline-none transition focus:border-atlas-orange"
            />
          </label>
        ))}
      </div>

      {submitted && missingRequired.length > 0 && (
        <p className="mt-3 text-xs text-red-500">
          Preencha os campos obrigatórios: {missingRequired.map((f) => f.label).join(", ")}.
        </p>
      )}

      {errorMsg && (
        <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-500">{errorMsg}</p>
      )}

      {successMsg && (
        <p className="mt-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400">
          ✅ {successMsg}
        </p>
      )}

      <Button className="mt-4" onClick={handleSubmit} isLoading={isSubmitting}>
        {!isSubmitting && <UserPlus size={16} />} Cadastrar colaborador
      </Button>
    </div>
  );
}
