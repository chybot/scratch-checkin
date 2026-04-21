"use client";

import { useState } from "react";
import { Stage } from "../data/curriculum";
import LessonCard from "./LessonCard";

interface CheckinData {
  completed: boolean;
  date?: string;
  note?: string;
}

interface StageSectionProps {
  stage: Stage;
  checkins: Record<number, CheckinData>;
  onToggle: (lessonId: number) => void;
  onNoteChange: (lessonId: number, note: string) => void;
}

const stageGradients: Record<number, string> = {
  1: "from-amber-400 to-orange-500",
  2: "from-blue-400 to-indigo-500",
  3: "from-green-400 to-emerald-500",
  4: "from-purple-400 to-violet-500",
  5: "from-rose-400 to-pink-500",
};

export default function StageSection({
  stage,
  checkins,
  onToggle,
  onNoteChange,
}: StageSectionProps) {
  const completedCount = stage.lessons.filter(
    (l) => checkins[l.id]?.completed
  ).length;
  const allDone = completedCount === stage.lessons.length;
  const pct = Math.round((completedCount / stage.lessons.length) * 100);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="mt-8">
      {/* Stage header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-4 group"
      >
        {/* Stage icon with gradient */}
        <div
          className={`flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br ${stageGradients[stage.id]} text-white text-xl shadow-lg transition-transform duration-300 ${
            collapsed ? "" : "group-hover:scale-105"
          }`}
          style={{
            boxShadow: `0 4px 0 rgba(0,0,0,0.15)`,
          }}
        >
          {stage.emoji}
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-gray-800">
              {stage.name}
            </h2>
            {allDone && (
              <span className="text-sm" style={{ animation: "float 2s ease-in-out infinite" }}>
                🎉
              </span>
            )}
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex-1 max-w-[140px] h-2.5 rounded-full bg-gray-100 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${
                  allDone ? "from-[#58CC02] to-[#89E219]" : stageGradients[stage.id]
                } transition-all duration-700 relative overflow-hidden`}
                style={{ width: `${pct}%` }}
              >
                {pct > 0 && (
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ animation: "shimmer 2s infinite" }}
                  />
                )}
              </div>
            </div>
            <span className="text-xs font-bold text-gray-400 tabular-nums">
              {completedCount}/{stage.lessons.length}
            </span>
          </div>
        </div>

        <div className={`text-gray-300 transition-transform duration-300 ${collapsed ? "-rotate-90" : "rotate-0"}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Lesson grid */}
      {!collapsed && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stage.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              stage={stage}
              completed={checkins[lesson.id]?.completed || false}
              completedDate={checkins[lesson.id]?.date}
              note={checkins[lesson.id]?.note}
              onToggle={() => onToggle(lesson.id)}
              onNoteChange={(n) => onNoteChange(lesson.id, n)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
