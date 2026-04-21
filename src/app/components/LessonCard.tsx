"use client";

import { useState, useRef } from "react";
import { Lesson, Stage } from "../data/curriculum";

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
  const [justCompleted, setJustCompleted] = useState(false);
  const checkRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (!completed) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 600);
    }
    onToggle();
  };

  return (
    <div
      className={`group relative rounded-2xl border-2 p-4 transition-all duration-300 cursor-default ${
        completed
          ? "border-[#58CC02] bg-[#F0FFF4]"
          : "border-transparent bg-white ring-1 ring-gray-100 hover:-translate-y-1 hover:shadow-lg hover:ring-[#FF8C1A]/30"
      }`}
      style={{
        boxShadow: completed
          ? "0 0 16px rgba(88, 204, 2, 0.15)"
          : "var(--shadow-card)",
      }}
    >
      {/* Top accent bar for completed */}
      {completed && (
        <div className="absolute top-0 left-4 right-4 h-[3px] rounded-b-full bg-gradient-to-r from-[#58CC02] to-[#89E219]" />
      )}

      <div className="flex items-start gap-3">
        {/* Check button - Duolingo 3D style */}
        <button
          ref={checkRef}
          onClick={handleToggle}
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-sm transition-all duration-200 active:translate-y-[3px] ${
            completed
              ? "bg-[#58CC02] text-white shadow-[0_3px_0_#46A302] active:shadow-none"
              : "bg-gray-100 text-gray-300 shadow-[0_3px_0_#d1d5db] hover:bg-[#FFF7ED] hover:text-[#FF8C1A] hover:shadow-[0_3px_0_#E07000] active:shadow-none"
          }`}
        >
          <span
            className={justCompleted ? "inline-block" : ""}
            style={justCompleted ? { animation: "check-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)" } : {}}
          >
            {completed ? "✓" : lesson.id}
          </span>
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-extrabold text-sm leading-snug ${
              completed ? "text-[#46A302]" : "text-gray-800"
            }`}
          >
            {lesson.title}
          </h3>
          <p className="mt-0.5 text-xs text-gray-400 leading-relaxed">{lesson.topic}</p>
        </div>

        {/* Stage emoji */}
        <span className="text-lg opacity-60 group-hover:opacity-100 transition-opacity">
          {stage.emoji}
        </span>
      </div>

      {/* Project tag */}
      <div className="mt-2.5 flex items-center gap-2">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
          completed
            ? "bg-[#58CC02]/10 text-[#46A302]"
            : `${stage.bgColor} ${stage.color}`
        }`}>
          🎮 {lesson.project}
        </span>
        {completed && completedDate && (
          <span className="text-[10px] text-gray-400">{completedDate}</span>
        )}
      </div>

      {/* Note toggle + input */}
      <button
        onClick={() => setShowNote(!showNote)}
        className={`mt-2 text-[11px] font-bold transition-colors ${
          note ? "text-[#FF8C1A]" : "text-gray-300 hover:text-gray-400"
        }`}
      >
        {note ? `📝 ${note}` : showNote ? "📝 写点什么..." : "📝 笔记"}
      </button>
      {showNote && (
        <input
          type="text"
          placeholder="记录学习心得..."
          value={note || ""}
          onChange={(e) => onNoteChange(e.target.value)}
          autoFocus
          className="mt-1.5 w-full rounded-xl border-2 border-orange-200 bg-[#FFF7ED] px-3 py-2 text-xs text-gray-600 placeholder-gray-300 focus:border-[#FF8C1A] focus:outline-none transition-colors"
        />
      )}
    </div>
  );
}
