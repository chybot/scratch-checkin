"use client";

import { BookOpen, Flame, Trophy, Target } from "lucide-react";
import { stages } from "../data/curriculum";

interface StatsCardsProps {
  completedSet: Set<number>;
  checkins: Record<number, { completed: boolean; date?: string; note?: string }>;
}

function getStreak(checkins: Record<number, { completed: boolean; date?: string }>): number {
  const dates = new Set<string>();
  Object.values(checkins).forEach((c) => {
    if (c.completed && c.date) dates.add(c.date);
  });
  if (dates.size === 0) return 0;

  const sorted = Array.from(dates).sort().reverse();
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1].replace(/\//g, "-"));
    const curr = new Date(sorted[i].replace(/\//g, "-"));
    const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (diff <= 7) streak++;
    else break;
  }
  return streak;
}

function getCurrentStage(completedSet: Set<number>): number {
  for (let i = stages.length - 1; i >= 0; i--) {
    if (stages[i].lessons.some((l) => completedSet.has(l.id))) return i + 1;
  }
  return 1;
}

export default function StatsCards({ completedSet, checkins }: StatsCardsProps) {
  const total = stages.reduce((acc, s) => acc + s.lessons.length, 0);
  const done = completedSet.size;
  const streak = getStreak(checkins);
  const currentStage = getCurrentStage(completedSet);
  const stagesCompleted = stages.filter((s) =>
    s.lessons.every((l) => completedSet.has(l.id))
  ).length;

  const cards = [
    {
      icon: BookOpen,
      label: "已完成课时",
      value: `${done}/${total}`,
      gradient: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-50",
      textColor: "text-violet-600",
    },
    {
      icon: Flame,
      label: "学习周数",
      value: streak.toString(),
      gradient: "from-orange-500 to-red-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      icon: Target,
      label: "当前阶段",
      value: `第${currentStage}阶段`,
      gradient: "from-cyan-500 to-blue-600",
      bgLight: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      icon: Trophy,
      label: "阶段通关",
      value: `${stagesCompleted}/5`,
      gradient: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 font-[family-name:var(--font-geist-mono)] tabular-nums">
                {card.value}
              </p>
            </div>
            <div className={`rounded-xl ${card.bgLight} p-2.5`}>
              <card.icon className={`h-5 w-5 ${card.textColor}`} />
            </div>
          </div>
          {/* Bottom accent bar */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />
        </div>
      ))}
    </div>
  );
}
