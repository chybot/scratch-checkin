"use client";

import { stages } from "../data/curriculum";
import ProgressRing from "./ProgressRing";

interface ProgressBarProps {
  completedLessons: Set<number>;
}

export default function ProgressBar({ completedLessons }: ProgressBarProps) {
  const total = stages.reduce((acc, s) => acc + s.lessons.length, 0);
  const done = completedLessons.size;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="rounded-3xl bg-white ring-1 ring-gray-100 p-6 shadow-sm flex items-center gap-6">
      <ProgressRing pct={pct} size={90} stroke={10} />
      <div className="flex-1">
        <h3 className="text-base font-extrabold text-gray-800">学习进度</h3>
        <p className="text-sm text-gray-400 mt-0.5">
          已完成 <span className="font-bold text-gray-600">{done}</span> / {total} 课
        </p>
        {/* Stage dots */}
        <div className="flex gap-1.5 mt-3">
          {stages.map((stage) => {
            const stageDone = stage.lessons.filter((l) => completedLessons.has(l.id)).length;
            const stageTotal = stage.lessons.length;
            const allDone = stageDone === stageTotal;
            const started = stageDone > 0;
            return (
              <div key={stage.id} className="flex flex-col items-center gap-1" title={`${stage.name} ${stageDone}/${stageTotal}`}>
                <div className="flex gap-0.5">
                  {stage.lessons.map((l) => (
                    <div
                      key={l.id}
                      className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                        completedLessons.has(l.id) ? "bg-[#58CC02]" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px]">
                  {allDone ? "✅" : started ? stage.emoji : "🔒"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
