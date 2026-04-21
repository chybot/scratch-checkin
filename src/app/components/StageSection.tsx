"use client";

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

  return (
    <section className="mt-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{stage.emoji}</span>
        <div>
          <h2 className={`text-xl font-bold ${stage.color}`}>
            第{stage.id}阶段：{stage.name}
          </h2>
          <p className="text-sm text-gray-500">
            {completedCount}/{stage.lessons.length} 课完成
            {allDone && " 🎉"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
    </section>
  );
}
