"use client";

import { Check, MessageSquare } from "lucide-react";
import { Lesson, Stage } from "../data/curriculum";
import { useState } from "react";

interface LessonCardProps {
  lesson: Lesson;
  stage: Stage;
  completed: boolean;
  completedDate?: string;
  note?: string;
  onToggle: () => void;
  onNoteChange: (note: string) => void;
}

export default function LessonCard({
  lesson,
  stage,
  completed,
  completedDate,
  note,
  onToggle,
  onNoteChange,
}: LessonCardProps) {
  const [showNote, setShowNote] = useState(false);

  return (
    <div
      className={`group relative rounded-2xl border p-4 transition-all duration-300 ${
        completed
          ? "border-emerald-200 bg-emerald-50/80 glow-green"
          : "border-slate-150 bg-white hover:border-slate-200 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Check button */}
        <button
          onClick={onToggle}
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
            completed
              ? "bg-emerald-500 text-white shadow-sm"
              : "border-2 border-slate-200 text-transparent hover:border-violet-400 hover:text-violet-400 active:scale-90"
          }`}
        >
          <Check className="h-4 w-4" strokeWidth={3} />
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${stage.bgColor} ${stage.color}`}>
              {lesson.id}
            </span>
            <h3
              className={`font-semibold text-sm leading-tight truncate ${
                completed ? "text-slate-500 line-through" : "text-slate-800"
              }`}
            >
              {lesson.title}
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed">{lesson.topic}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-block rounded-md bg-slate-50 px-2 py-0.5 text-[11px] text-slate-500 border border-slate-100">
              {lesson.project}
            </span>
          </div>
        </div>

        {/* Note toggle */}
        <button
          onClick={() => setShowNote(!showNote)}
          className={`shrink-0 rounded-lg p-1.5 transition-colors ${
            note
              ? "text-violet-500 bg-violet-50"
              : "text-slate-300 hover:text-slate-400 hover:bg-slate-50"
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Note input (expandable) */}
      {showNote && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <input
            type="text"
            placeholder="记录学习心得..."
            value={note || ""}
            onChange={(e) => onNoteChange(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600 placeholder-slate-300 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-violet-200 transition-all"
          />
        </div>
      )}

      {/* Completed date */}
      {completed && completedDate && (
        <p className="mt-2 text-[11px] text-emerald-500 font-medium ml-10">
          {completedDate} 完成
        </p>
      )}
    </div>
  );
}
