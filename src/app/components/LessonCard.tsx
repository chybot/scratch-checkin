"use client";

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
  return (
    <div
      className={`relative rounded-2xl border-2 p-4 transition-all duration-300 ${
        completed
          ? "border-green-300 bg-green-50 shadow-sm"
          : `${stage.borderColor} ${stage.bgColor} shadow-sm hover:shadow-md`
      }`}
    >
      {/* Lesson number badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
              completed ? "bg-green-500" : "bg-gray-400"
            }`}
          >
            {lesson.id}
          </span>
          <div>
            <h3 className="font-bold text-gray-800 leading-tight">
              {lesson.title}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{lesson.topic}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`shrink-0 rounded-full p-1.5 transition-all ${
            completed
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-white border-2 border-gray-300 text-gray-300 hover:border-green-400 hover:text-green-400"
          }`}
          title={completed ? "取消打卡" : "打卡完成"}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
      </div>

      {/* Project tag */}
      <div className="mt-2">
        <span className="inline-block rounded-full bg-white/70 px-2.5 py-0.5 text-xs text-gray-600 border border-gray-200">
          {lesson.project}
        </span>
      </div>

      {/* Note input */}
      <input
        type="text"
        placeholder="记录学习笔记..."
        value={note || ""}
        onChange={(e) => onNoteChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-gray-200 bg-white/60 px-3 py-1.5 text-xs text-gray-600 placeholder-gray-400 focus:border-blue-300 focus:outline-none"
      />

      {/* Completed date */}
      {completed && completedDate && (
        <p className="mt-1.5 text-xs text-green-600 font-medium">
          {completedDate} 完成
        </p>
      )}
    </div>
  );
}
