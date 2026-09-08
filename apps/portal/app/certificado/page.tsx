"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Award, Download, ShieldAlert } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useOnboardingStore } from "@/lib/store";
import { useRequireRegistration } from "@/lib/useRequireRegistration";
import { readyModuleSlugs, moduleMetas } from "@/content/modules";
import { genId, sha256Hex } from "@/lib/utils";
import { generateCertificatePdf } from "@/components/certificate/generateCertificatePdf";

export default function CertificadoPage() {
  const { ready, registration } = useRequireRegistration();
  const examResult = useOnboardingStore((s) => s.examResult);
  const certificate = useOnboardingStore((s) => s.certificate);
  const issueCertificate = useOnboardingStore((s) => s.issueCertificate);
  const [generating, setGenerating] = useState(false);

  const cargaHoraria = moduleMetas.filter((m) => readyModuleSlugs.includes(m.slug)).reduce((sum, m) => sum + m.durationMinutes, 0);
  const moduleTitles = moduleMetas.filter((m) => readyModuleSlugs.includes(m.slug)).map((m) => m.title);

  useEffect(() => {
    async function issue() {
      if (!registration || !examResult?.passed || certificate) return;
      const id = genId("ATLAS");
      const issuedAt = new Date().toISOString();
      const hash = await sha256Hex(`${registration.cpf}|${registration.email}|${id}|${issuedAt}|${examResult.score}`);
      issueCertificate({ id, issuedAt, hash, cargaHoraria, score: examResult.score });
    }
    issue();
  }, [registration, examResult, certificate, issueCertificate, cargaHoraria]);

  async function handleDownload() {
    if (!registration || !certificate) return;
    setGenerating(true);
    try {
      const bytes = await generateCertificatePdf(registration, certificate, moduleTitles);
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificado-atlasgr-${registration.nomeCompleto.replace(/\s+/g, "-").toLowerCase()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setGenerating(false);
    }
  }

  if (!ready || !registration) return null;

  if (!examResult?.passed) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <ShieldAlert size={40} className="mx-auto mb-4 text-muted" />
          <h1 className="font-display text-2xl font-bold text-foreground">Certificado indisponível</h1>
          <p className="mt-2 text-muted">Você precisa ser aprovado na Prova Final antes de emitir o certificado.</p>
          <Link href="/prova-final">
            <Button className="mt-6">Ir para a Prova Final</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-14">
        <Card className="p-10 text-center">
          <Award size={48} className="mx-auto mb-4 text-atlas-orange" />
          <h1 className="font-display text-2xl font-bold text-foreground">Certificado emitido!</h1>
          <p className="mt-2 text-muted">
            Parabéns, {registration.nomeCompleto.split(" ")[0]}! Você concluiu a trilha de onboarding ATLASGR
            (versão de protótipo) com {examResult.score}% de aproveitamento.
          </p>

          {certificate && (
            <div className="mt-6 space-y-1 rounded-xl bg-surface-2 p-4 text-left text-xs text-muted">
              <p>ID: {certificate.id}</p>
              <p>Emitido em: {new Date(certificate.issuedAt).toLocaleString("pt-BR")}</p>
              <p>Carga horária: {certificate.cargaHoraria} min</p>
              <p className="break-all">Hash SHA-256: {certificate.hash}</p>
            </div>
          )}

          <Button size="lg" className="mt-6" onClick={handleDownload} disabled={generating || !certificate}>
            <Download size={16} /> {generating ? "Gerando PDF..." : "Baixar certificado (PDF)"}
          </Button>

          <p className="mt-4 text-xs text-muted font-medium">
            Documento gerado localmente no navegador para fins de demonstração — sem assinatura digital com validade
            jurídica. Uma versão de produção emitiria e assinaria o certificado no backend.
          </p>
        </Card>
      </main>
    </div>
  );
}
