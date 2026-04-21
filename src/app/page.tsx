"use client";

import { useState, useEffect, useCallback } from "react";
import { stages } from "./data/curriculum";
import ProgressBar from "./components/ProgressBar";
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
        <div className="animate-pulse text-gray-400">加载中...</div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 pb-20">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-800">
          🐱 Scratch 学习打卡
        </h1>
        <p className="mt-2 text-gray-500">
          二年级 · 36课时 · 每周一练
        </p>
      </header>

      <ProgressBar completedLessons={completedSet} />

      {stages.map((stage) => (
        <StageSection
          key={stage.id}
          stage={stage}
          checkins={checkins}
          onToggle={handleToggle}
          onNoteChange={handleNoteChange}
        />
      ))}

      <footer className="mt-12 text-center text-sm text-gray-400">
        数据存储在浏览器本地，换设备请导出备份
      </footer>
    </main>
  );
}
