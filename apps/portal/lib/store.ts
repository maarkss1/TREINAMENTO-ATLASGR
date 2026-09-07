"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CertificateInfo, EnrolledColaborador, ExamResult, ModuleProgress, RegistrationData } from "./types";
import type { AgentBlueprint } from "./agentEngine";
import {
  BADGES,
  XP_CERTIFICATE,
  XP_PER_ACADEMY_TOOL,
  XP_PER_AGENT_CREATED,
  XP_PER_EXAM_PASS,
  XP_PER_MODULE,
  XP_PER_QUIZ_PASS,
} from "./gamification";
import { genId } from "./utils";

interface OnboardingState {
  registration: RegistrationData | null;
  enrolled: EnrolledColaborador[];
  progress: Record<string, ModuleProgress>;
  xp: number;
  badges: string[];
  streakDays: string[];
  examResult: ExamResult | null;
  certificate: CertificateInfo | null;
  exploredAcademyTools: string[];
  createdAgents: AgentBlueprint[];
  myList: string[];
  hasHydrated: boolean;
  onboardingCompleted: boolean;

  setHasHydrated: (v: boolean) => void;
  enrollColaborador: (data: RegistrationData) => EnrolledColaborador;
  removeColaborador: (id: string) => void;
  startSessionAs: (id: string) => boolean;
  completeOnboarding: () => void;
  clearRegistration: () => void;
  touchStreak: () => void;
  toggleMyList: (slug: string) => void;
  completeModuleQuiz: (slug: string, score: number) => boolean;
  setExamResult: (result: ExamResult) => void;
  issueCertificate: (cert: CertificateInfo) => void;
  addBadge: (id: string) => void;
  exploreAcademyTool: (id: string) => void;
  saveCreatedAgent: (agent: AgentBlueprint) => void;
  addXP: (amount: number) => void;
  resetAll: () => void;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function genAccessCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      registration: null,
      enrolled: [],
      progress: {},
      xp: 0,
      badges: [],
      streakDays: [],
      examResult: null,
      certificate: null,
      exploredAcademyTools: [],
      createdAgents: [],
      myList: [],
      hasHydrated: false,
      onboardingCompleted: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),
      completeOnboarding: () => set({ onboardingCompleted: true }),
      toggleMyList: (slug) =>
        set((s) => {
          const list = s.myList || [];
          const exists = list.includes(slug);
          return { myList: exists ? list.filter((item) => item !== slug) : [...list, slug] };
        }),

      // Cadastro é feito exclusivamente pelo Administrador (painel /admin).
      // O colaborador apenas faz seu primeiro acesso escolhendo o próprio nome.
      enrollColaborador: (data) => {
        const record: EnrolledColaborador = {
          ...data,
          id: genId("COL"),
          enrolledAt: new Date().toISOString(),
          accessCode: genAccessCode(),
        };
        set((s) => ({ enrolled: [...s.enrolled, record] }));
        return record;
      },

      removeColaborador: (id) => {
        set((s) => ({ enrolled: s.enrolled.filter((c) => c.id !== id) }));
      },

      startSessionAs: (id) => {
        const record = get().enrolled.find((c) => c.id === id);
        if (!record) return false;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, enrolledAt: _enrolledAt, accessCode: _accessCode, ...registrationData } = record;
        
        // Registrar a sessão real no banco
        fetch(`http://localhost:3001/gamification/${id}/session`, { method: 'POST' }).catch(() => {});

        set({ registration: {...registrationData, userId: id } as unknown as RegistrationData });
        get().touchStreak();
        get().addBadge("primeiro-passo");
        return true;
      },

      clearRegistration: () => set({ registration: null }),

      touchStreak: () => {
        const key = todayKey();
        set((s) => (s.streakDays.includes(key) ? s : { streakDays: [...s.streakDays, key].slice(-30) }));
        if (get().streakDays.length >= 3) get().addBadge("streak-3");
      },

      completeModuleQuiz: (slug, score) => {
        const passed = score >= 70;
        const prev = get().progress[slug];
        const isFirstPass = passed && !prev?.passed;
        const xpGain = (isFirstPass ? XP_PER_MODULE + XP_PER_QUIZ_PASS : 0) + (score === 100 ? 0 : 0);

        set((s) => ({
          progress: {
            ...s.progress,
            [slug]: {
              completed: passed || !!prev?.completed,
              bestScore: Math.max(score, prev?.bestScore ?? 0),
              passed: passed || !!prev?.passed,
              attempts: (prev?.attempts ?? 0) + 1,
              xpEarned: (prev?.xpEarned ?? 0) + xpGain,
            },
          },
          xp: s.xp + xpGain,
        }));
        
        // Sincronizar com o backend NestJS para garantir imutabilidade e persistência real
        // registration.userId should be populated in startSessionAs
         // const userId = ((get().registration as unknown as Record<string, unknown>)?.userId as string | undefined);
        // O fetch foi removido daqui pois o servidor agora processa a submissão completa do quiz, 
        // e atualiza XP e progresso no banco de dados na rota /quiz/:moduleId/submit.

        get().touchStreak();
        if (score === 100) get().addBadge("nota-maxima");
        if (passed) {
          if (slug === "01-bem-vindo-atlasgr") get().addBadge("modulo-1");
          if (slug === "03-gerenciamento-risco") get().addBadge("guardiao-risco");
          if (slug === "05-software-logistico") get().addBadge("mestre-connect");
        }
        return passed;
      },

      setExamResult: (result) => {
        set((s) => ({ examResult: result, xp: s.xp + (result.passed ? XP_PER_EXAM_PASS : 0) }));
        get().touchStreak();
      },

      issueCertificate: (cert) => {
        set((s) => ({ certificate: cert, xp: s.xp + XP_CERTIFICATE }));
        get().addBadge("certificado");
      },

      addBadge: (id) => {
        if (!BADGES.find((b) => b.id === id)) return;
        set((s) => (s.badges.includes(id) ? s : { badges: [...s.badges, id] }));
      },

      exploreAcademyTool: (id) => {
        if (get().exploredAcademyTools.includes(id)) return;
        set((s) => ({
          exploredAcademyTools: [...s.exploredAcademyTools, id],
          xp: s.xp + XP_PER_ACADEMY_TOOL,
        }));
        if (get().exploredAcademyTools.length >= 3) get().addBadge("explorador-ia");
      },

      saveCreatedAgent: (agent) => {
        if (get().createdAgents.some((item) => item.id === agent.id)) return;
        const isFirstAgent = get().createdAgents.length === 0;
        set((s) => ({
          createdAgents: [agent, ...s.createdAgents].slice(0, 12),
          xp: s.xp + XP_PER_AGENT_CREATED,
        }));
        if (isFirstAgent) get().addBadge("arquiteto-agentes");
      },

      addXP: (amount) => set((s) => ({ xp: s.xp + amount })),

      resetAll: () =>
        set({
          registration: null,
          progress: {},
          xp: 0,
          badges: [],
          streakDays: [],
          examResult: null,
          certificate: null,
          exploredAcademyTools: [],
          createdAgents: [],
          onboardingCompleted: false,
        }),
    }),
    {
      name: "atlasgr-onboarding-demo",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
