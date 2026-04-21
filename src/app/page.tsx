"use client";

import { useState, useEffect, useCallback } from "react";
import { Cat } from "lucide-react";
import { stages } from "./data/curriculum";
import StatsCards from "./components/StatsCards";
import ProgressBar from "./components/ProgressBar";
import Heatmap from "./components/Heatmap";
import StageSection from "./components/StageSection";

interface CheckinData {
  completed: boolean;
  date?: string;
  note?: string;
}

const STORAGE_KEY = "scratch-checkin-data";

export default function Home() {
  const [checkins, setCheckins] = useState<Record<number, CheckinData>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCheckins(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkins));
    }
  }, [checkins, loaded]);

  const handleToggle = useCallback((lessonId: number) => {
    setCheckins((prev) => {
      const current = prev[lessonId];
      if (current?.completed) {
        return { ...prev, [lessonId]: { ...current, completed: false, date: undefined } };
      }
      return {
        ...prev,
        [lessonId]: {
          ...current,
          completed: true,
          date: new Date().toLocaleDateString("zh-CN"),
        },
      };
    });
  }, []);

  const handleNoteChange = useCallback((lessonId: number, note: string) => {
    setCheckins((prev) => ({
      ...prev,
      [lessonId]: { ...prev[lessonId], completed: prev[lessonId]?.completed || false, note },
    }));
  }, []);

  const completedSet = new Set(
    Object.entries(checkins)
      .filter(([, v]) => v.completed)
      .map(([k]) => Number(k))
  );

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-slate-300 text-sm">加载中...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-20">
      {/* Header */}
      <header className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
          <Cat className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Scratch 学习打卡
          </h1>
          <p className="text-sm text-slate-400">
            二年级 · 36课时 · 每周一练
          </p>
        </div>
      </header>

      {/* Stats row */}
      <StatsCards completedSet={completedSet} checkins={checkins} />

      {/* Progress + Heatmap row */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <ProgressBar completedLessons={completedSet} />
        </div>
        <div className="lg:col-span-2">
          <Heatmap checkins={checkins} />
        </div>
      </div>

      {/* Stages */}
      {stages.map((stage) => (
        <StageSection
          key={stage.id}
          stage={stage}
          checkins={checkins}
          onToggle={handleToggle}
          onNoteChange={handleNoteChange}
        />
      ))}

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-slate-300">
        数据存储在浏览器本地
      </footer>
    </div>
  );
}
