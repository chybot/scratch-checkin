"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { stages } from "./data/curriculum";
import StatsCards from "./components/StatsCards";
import ProgressBar from "./components/ProgressBar";
import Heatmap from "./components/Heatmap";
import StageSection from "./components/StageSection";
import confetti from "canvas-confetti";

interface CheckinData {
  completed: boolean;
  date?: string;
  note?: string;
}

const STORAGE_KEY = "scratch-checkin-data";

export default function Home() {
  const [checkins, setCheckins] = useState<Record<number, CheckinData>>({});
  const [loaded, setLoaded] = useState(false);
  const prevCountRef = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setCheckins(data);
      prevCountRef.current = Object.values(
        data as Record<string, CheckinData>
      ).filter((c) => c.completed).length;
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
      const wasCompleted = current?.completed;

      const next = {
        ...prev,
        [lessonId]: wasCompleted
          ? { ...current, completed: false, date: undefined }
          : {
              ...current,
              completed: true,
              date: new Date().toLocaleDateString("zh-CN"),
            },
      };

      if (!wasCompleted) {
        const newCount = Object.values(next).filter((c) => c.completed).length;
        const isStageComplete = stages.some(
          (s) =>
            s.lessons.some((l) => l.id === lessonId) &&
            s.lessons.every((l) => next[l.id]?.completed)
        );

        setTimeout(() => {
          if (isStageComplete) {
            const duration = 1500;
            const end = Date.now() + duration;
            const interval = setInterval(() => {
              if (Date.now() > end) return clearInterval(interval);
              confetti({
                particleCount: 40,
                angle: 60 + Math.random() * 60,
                spread: 60,
                origin: { x: Math.random(), y: 0.6 },
                colors: [
                  "#FF8C1A",
                  "#58CC02",
                  "#4C97FF",
                  "#FFD700",
                  "#9966FF",
                ],
              });
            }, 200);
          } else if (newCount % 5 === 0) {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.8 },
              colors: ["#FF8C1A", "#58CC02", "#FFD700"],
            });
          }
        }, 100);
      }

      return next;
    });
  }, []);

  const handleNoteChange = useCallback((lessonId: number, note: string) => {
    setCheckins((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        completed: prev[lessonId]?.completed || false,
        note,
      },
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
        <div
          className="text-4xl"
          style={{ animation: "float 1.5s ease-in-out infinite" }}
        >
          🐱
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 pb-20">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <div
          className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-[#FF8C1A] to-[#FF6B00] text-3xl shadow-lg"
          style={{
            boxShadow: "0 4px 0 #CC5500",
            animation: "float 3s ease-in-out infinite",
          }}
        >
          🐱
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Scratch 学习打卡
          </h1>
          <p className="text-sm font-semibold text-gray-400">
            二年级 · 36课时 · 每周一练
          </p>
        </div>
      </header>

      {/* Stats */}
      <StatsCards completedSet={completedSet} checkins={checkins} />

      {/* Progress + Heatmap */}
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
      <footer className="mt-16 text-center text-xs text-gray-300 font-semibold">
        数据存储在浏览器本地 · Scratch 学习打卡
      </footer>
    </div>
  );
}
