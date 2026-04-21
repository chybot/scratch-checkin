"use client";

import { stages } from "../data/curriculum";

interface StatsCardsProps {
  completedSet: Set<number>;
  checkins: Record<number, { completed: boolean; date?: string; note?: string }>;
}

function getStreakWeeks(
  checkins: Record<number, { completed: boolean; date?: string }>
): number {
  const dates = new Set<string>();
  Object.values(checkins).forEach((c) => {
    if (c.completed && c.date) dates.add(c.date);
  });
  return dates.size;
}

export default function StatsCards({ completedSet, checkins }: StatsCardsProps) {
  const total = stages.reduce((acc, s) => acc + s.lessons.length, 0);
  const done = completedSet.size;
  const weeks = getStreakWeeks(checkins);
  const stagesCompleted = stages.filter((s) =>
    s.lessons.every((l) => completedSet.has(l.id))
  ).length;

  const cards = [
    { emoji: "📚", value: done, unit: `/${total}`, label: "已完成", bg: "bg-blue-50", ring: "ring-blue-200" },
    { emoji: "🔥", value: weeks, unit: "次", label: "学习次数", bg: "bg-orange-50", ring: "ring-orange-200" },
    { emoji: "⭐", value: done * 10, unit: "xp", label: "经验值", bg: "bg-yellow-50", ring: "ring-yellow-200" },
    { emoji: "🏆", value: stagesCompleted, unit: "/5", label: "阶段通关", bg: "bg-purple-50", ring: "ring-purple-200" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`relative rounded-2xl ${card.bg} ring-1 ${card.ring} p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default`}
        >
          <div className="text-2xl mb-1" style={{ animation: "float 3s ease-in-out infinite" }}>
            {card.emoji}
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl font-black text-gray-800 tabular-nums">
              {card.value}
            </span>
            <span className="text-sm font-bold text-gray-400">{card.unit}</span>
          </div>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
}
