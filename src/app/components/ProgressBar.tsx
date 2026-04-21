"use client";

import { stages } from "../data/curriculum";

interface ProgressBarProps {
  completedLessons: Set<number>;
}

export default function ProgressBar({ completedLessons }: ProgressBarProps) {
  const total = stages.reduce((acc, s) => acc + s.lessons.length, 0);
  const done = completedLessons.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  // Calculate stage boundaries for milestone markers
  let cumulative = 0;
  const milestones = stages.map((s) => {
    cumulative += s.lessons.length;
    return { name: s.name, emoji: s.emoji, pct: Math.round((cumulative / total) * 100) };
  });

  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-slate-700">总进度</h3>
        <span className="text-lg font-bold text-violet-600 font-[family-name:var(--font-geist-mono)] tabular-nums">
          {pct}%
        </span>
      </div>

      {/* Main bar */}
      <div className="relative mt-2">
        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 transition-all duration-700 ease-out"
            style={{
              width: `${pct}%`,
              boxShadow: pct > 0 ? "0 0 12px rgba(139,92,246,0.4)" : "none",
            }}
          />
        </div>

        {/* Milestone markers */}
        <div className="relative h-6 mt-1">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${m.pct}%` }}
            >
              <div className="w-px h-2 bg-slate-200" />
              <span className="text-[10px] text-slate-400 whitespace-nowrap">{m.emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
