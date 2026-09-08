import { describe, it, expect } from "vitest";
import {
  getHighestUnlockedModuleNumber,
  isModuleUnlocked,
  getCurrentActiveModule,
  isCurrentActiveModule,
} from "./progression";
import type { ModuleMeta, ModuleProgress } from "./types";

const mockModules: ModuleMeta[] = [
  { slug: "mod-1", number: 1, title: "Módulo 1", category: "Cat A", shortDescription: "", durationMinutes: 10, status: "ready" },
  { slug: "mod-2", number: 2, title: "Módulo 2", category: "Cat A", shortDescription: "", durationMinutes: 10, status: "ready" },
  { slug: "mod-3", number: 3, title: "Módulo 3", category: "Cat B", shortDescription: "", durationMinutes: 10, status: "ready" },
  { slug: "mod-4", number: 4, title: "Módulo 4", category: "Cat B", shortDescription: "", durationMinutes: 10, status: "ready" },
];

describe("Progression Logic", () => {
  it("should unlock module 1 by default when progress is empty", () => {
    const progress: Record<string, ModuleProgress> = {};
    expect(getHighestUnlockedModuleNumber(progress, mockModules)).toBe(1);
    expect(isModuleUnlocked(mockModules[0], progress, mockModules)).toBe(true);
    expect(isModuleUnlocked(mockModules[1], progress, mockModules)).toBe(false);
    expect(getCurrentActiveModule(progress, mockModules).slug).toBe("mod-1");
  });

  it("should unlock module 2 when module 1 is passed", () => {
    const progress: Record<string, ModuleProgress> = {
      "mod-1": { completed: true, passed: true, score: 90, attempts: 1 },
    };
    expect(getHighestUnlockedModuleNumber(progress, mockModules)).toBe(2);
    expect(isModuleUnlocked(mockModules[0], progress, mockModules)).toBe(true);
    expect(isModuleUnlocked(mockModules[1], progress, mockModules)).toBe(true);
    expect(isModuleUnlocked(mockModules[2], progress, mockModules)).toBe(false);
    expect(getCurrentActiveModule(progress, mockModules).slug).toBe("mod-2");
    expect(isCurrentActiveModule(mockModules[1], progress, mockModules)).toBe(true);
  });

  it("should not unlock module 3 if module 2 is not passed", () => {
    const progress: Record<string, ModuleProgress> = {
      "mod-1": { completed: true, passed: true, score: 90, attempts: 1 },
      "mod-2": { completed: false, passed: false, score: 50, attempts: 1 },
    };
    expect(getHighestUnlockedModuleNumber(progress, mockModules)).toBe(2);
    expect(isModuleUnlocked(mockModules[2], progress, mockModules)).toBe(false);
  });

  it("should return the last module if all are passed", () => {
    const progress: Record<string, ModuleProgress> = {
      "mod-1": { completed: true, passed: true, score: 100, attempts: 1 },
      "mod-2": { completed: true, passed: true, score: 100, attempts: 1 },
      "mod-3": { completed: true, passed: true, score: 100, attempts: 1 },
      "mod-4": { completed: true, passed: true, score: 100, attempts: 1 },
    };
    expect(getHighestUnlockedModuleNumber(progress, mockModules)).toBe(4);
    expect(getCurrentActiveModule(progress, mockModules).slug).toBe("mod-4");
  });
});
