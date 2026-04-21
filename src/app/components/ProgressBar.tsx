"use client";

import { stages } from "../data/curriculum";

interface ProgressBarProps {
  completedLessons: Set<number>;
}

export default function ProgressBar({ completedLessons }: ProgressBarProps) {
  const total = stages.reduce((acc, s) => acc + s.lessons.length, 0);
  const done = completedLessons.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">学习进度</h2>
        <span className="text-2xl font-black text-blue-600">{pct}%</span>
      </div>
      <div className="h-4 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <span>已完成 {done}/{total} 课</span>
        <span>{total - done} 课待学习</span>
      </div>

      {/* Stage breakdown */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {stages.map((stage) => {
          const stageTotal = stage.lessons.length;
          const stageDone = stage.lessons.filter((l) =>
            completedLessons.has(l.id)
          ).length;
          return (
            <div key={stage.id} className="text-center">
              <div className="text-lg">{stage.emoji}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {stageDone}/{stageTotal}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
