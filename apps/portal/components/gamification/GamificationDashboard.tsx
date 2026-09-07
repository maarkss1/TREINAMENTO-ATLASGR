"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Flame, Star, Zap } from "lucide-react";
import { AtlasMedalGold, AtlasMedalSilver, AtlasSecurityIcon } from "@/components/ui/AtlasIllustrations";
import { cn } from "@/lib/utils";
import { useOnboardingStore } from "@/lib/store";
import { levelProgress, BADGES } from "@/lib/gamification";
import { useEffect, useState } from "react";

export function GamificationDashboard() {
  const { xp: localXp, streakDays: localStreakDays, registration } = useOnboardingStore();
  const userId = ((registration as unknown as Record<string, unknown>)?.userId as string | undefined);

  const [realProfile, setRealProfile] = useState<{ xp: number; currentStreak: number } | null>(null);

  // Integrar com o backend para buscar dados imutáveis/reais de engajamento
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3001/gamification/${userId}/profile`)
        .then(r => r.json())
        .then(data => {
          if (data && typeof data.xp === 'number') {
            setRealProfile(data);
          }
        })
        .catch(console.error);
    }
  }, [userId]);

  const displayXp = realProfile?.xp ?? localXp;
  const displayStreak = realProfile?.currentStreak ?? localStreakDays.length;

  const { current, next, pct } = levelProgress(displayXp);

  const renderBadgeIcon = (tier: string) => {
    switch(tier) {
      case 'gold': return <AtlasMedalGold className="w-8 h-8" />;
      case 'silver': return <AtlasMedalSilver className="w-8 h-8" />;
      case 'bronze': return <AtlasSecurityIcon className="w-6 h-6 text-amber-700" />;
      case 'holographic': return <Zap className="w-6 h-6 text-atlas-orange" />;
      default: return <Star className="w-6 h-6 text-muted" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {/* Profile & XP Progress */}
      <Card variant="elevated" className="md:col-span-2 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-atlas-orange/5 to-transparent pointer-events-none" />
        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <ProgressRing value={pct} size={140} strokeWidth={8} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-display font-bold text-gradient-atlas">Lvl {current.level}</span>
            </div>
          </div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold font-display">{current.title}</h2>
              <p className="text-muted mt-1">Evolua no plano de carreira concluindo mais módulos.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Badge variant="orange" className="text-sm px-4 py-1.5 flex gap-2 items-center">
                <AtlasMedalGold className="w-4 h-4" /> {displayXp} XP Acumulado
              </Badge>
              {next && (
                <span className="text-sm text-muted font-medium bg-surface-2 px-3 py-1 rounded-full border border-border/50">
                  {next.minXp - displayXp} XP para Lvl {next.level}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Streaks */}
      <Card variant="elevated" className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Flame size={120} />
        </div>
        <CardContent className="p-8 h-full flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-3 text-atlas-orange mb-2">
            <Flame className="animate-pulse" size={32} />
            <span className="text-lg font-bold font-display">Sequência Diária</span>
          </div>
          <div className="text-5xl font-bold font-display tracking-tight text-foreground">
            {displayStreak} <span className="text-2xl text-muted">dias</span>
          </div>
          <p className="text-sm text-muted mt-4 font-medium leading-relaxed">
            Faça login todos os dias para não perder sua sequência e ganhar multiplicadores de XP.
          </p>
        </CardContent>
      </Card>

      {/* Badges / Conquistas */}
      <Card variant="default" className="md:col-span-3">
        <CardHeader className="border-b border-border/50 bg-surface/50">
          <CardTitle className="flex items-center gap-2">
            <Star className="text-atlas-orange" size={20} />
            Mural de Conquistas Corporativas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {BADGES.map((badge) => {
              // Simulated for frontend prototype
              const unlocked = true;
              return (
                <div
                  key={badge.id}
                  className={cn(
                    "flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-300",
                    unlocked
                      ? "bg-surface shadow-sm hover:shadow-md hover:-translate-y-1 border-border hover:border-atlas-orange/30"
                      : "opacity-40 grayscale border-transparent bg-surface-2"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-inner relative",
                    unlocked ? "bg-surface-2" : "bg-muted/20"
                  )}>
                    {unlocked && badge.tier === 'holographic' && (
                       <div className="absolute inset-0 rounded-full animate-pulse bg-atlas-orange/20 blur-md pointer-events-none" />
                    )}
                    {renderBadgeIcon(badge.tier)}
                  </div>
                  <h4 className="text-xs font-bold font-display mb-1 leading-tight">{badge.label}</h4>
                  <p className="text-[10px] text-muted leading-tight line-clamp-2">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
