"use client";

import { ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";
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
    <section className="mt-6">
      {/* Stage header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-3 group"
      >
        <div className={`flex items-center justify-center h-10 w-10 rounded-xl ${stage.bgColor} transition-transform ${collapsed ? "" : ""}`}>
          <span className="text-lg">{stage.emoji}</span>
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h2 className={`text-base font-bold ${stage.color}`}>
              {stage.name}
            </h2>
            {allDone && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <div className="flex-1 max-w-[120px] h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${
                  allDone
                    ? "from-emerald-400 to-emerald-500"
                    : "from-violet-400 to-purple-500"
                } transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-slate-400 font-medium tabular-nums">
              {completedCount}/{stage.lessons.length}
            </span>
          </div>
        </div>
        <div className="text-slate-300 group-hover:text-slate-400 transition-colors">
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      {/* Lesson grid */}
      {!collapsed && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stage.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              stage={stage}
              completed={checkins[lesson.id]?.completed || false}
              completedDate={checkins[lesson.id]?.date}
              note={checkins[lesson.id]?.note}
              onToggle={() => onToggle(lesson.id)}
              onNoteChange={(note) => onNoteChange(lesson.id, note)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
