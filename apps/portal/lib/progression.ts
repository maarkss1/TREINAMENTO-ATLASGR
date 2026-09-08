import type { ModuleMeta, ModuleProgress } from "@/lib/types";

/**
 * Retorna o maior número de módulo desbloqueado para o aluno com base no progresso.
 * O Módulo 1 é sempre liberado. Cada módulo subsequente é desbloqueado
 * quando o módulo anterior tem `passed === true`.
 */
export function getHighestUnlockedModuleNumber(
  progress: Record<string, ModuleProgress>,
  modules: ModuleMeta[]
): number {
  const sorted = [...modules].sort((a, b) => a.number - b.number);
  let highest = 1;

  for (const mod of sorted) {
    if (mod.number === highest) {
      const p = progress[mod.slug];
      if (p?.passed) {
        highest = mod.number + 1;
      } else {
        break;
      }
    }
  }

  const maxModuleNumber = Math.max(...modules.map((m) => m.number), 1);
  return Math.min(highest, maxModuleNumber);
}

/**
 * Determina se um módulo específico está desbloqueado para o usuário.
 */
export function isModuleUnlocked(
  meta: ModuleMeta,
  progress: Record<string, ModuleProgress>,
  modules: ModuleMeta[]
): boolean {
  // Módulo 1 é sempre livre
  if (meta.number === 1) return true;
  const highest = getHighestUnlockedModuleNumber(progress, modules);
  return meta.number <= highest;
}

/**
 * Retorna o módulo que o usuário deve fazer agora (a missão ativa).
 * É o primeiro módulo desbloqueado que ainda não foi concluído (passed !== true).
 * Caso todos estejam concluídos, retorna o último módulo (Certificação).
 */
export function getCurrentActiveModule(
  progress: Record<string, ModuleProgress>,
  modules: ModuleMeta[]
): ModuleMeta {
  const sorted = [...modules].sort((a, b) => a.number - b.number);
  const active = sorted.find((m) => {
    const isUnlocked = isModuleUnlocked(m, progress, modules);
    const isPassed = Boolean(progress[m.slug]?.passed);
    return isUnlocked && !isPassed;
  });

  return active || sorted[sorted.length - 1] || sorted[0];
}

/**
 * Verifica se este módulo é exatamente a missão ativa em andamento no momento.
 */
export function isCurrentActiveModule(
  meta: ModuleMeta,
  progress: Record<string, ModuleProgress>,
  modules: ModuleMeta[]
): boolean {
  const current = getCurrentActiveModule(progress, modules);
  return current.slug === meta.slug;
}
