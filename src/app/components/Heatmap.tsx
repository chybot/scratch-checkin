"use client";

interface HeatmapProps {
  checkins: Record<number, { completed: boolean; date?: string }>;
}

function getLast12Weeks(): string[][] {
  const weeks: string[][] = [];
  const today = new Date();
  const dayOfWeek = today.getDay();

  // Start from the beginning of the current week (Sunday) - 11 weeks
  const start = new Date(today);
  start.setDate(start.getDate() - dayOfWeek - 7 * 11);

  for (let w = 0; w < 12; w++) {
    const week: string[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      week.push(date.toLocaleDateString("zh-CN"));
    }
    weeks.push(week);
  }
  return weeks;
}

export default function Heatmap({ checkins }: HeatmapProps) {
  const weeks = getLast12Weeks();
  const checkinDates = new Set<string>();
  Object.values(checkins).forEach((c) => {
    if (c.completed && c.date) checkinDates.add(c.date);
  });

  const today = new Date().toLocaleDateString("zh-CN");
  const dayLabels = ["日", "一", "二", "三", "四", "五", "六"];

  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">学习热力图</h3>
      <div className="flex gap-1.5">
        {/* Day labels */}
        <div className="flex flex-col gap-1.5 pr-1">
          {dayLabels.map((label, i) => (
            <div
              key={i}
              className="h-4 w-4 flex items-center justify-center text-[10px] text-slate-400"
            >
              {i % 2 === 1 ? label : ""}
            </div>
          ))}
        </div>
        {/* Grid */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1.5">
            {week.map((date, di) => {
              const isActive = checkinDates.has(date);
              const isToday = date === today;
              return (
                <div
                  key={di}
                  title={`${date}${isActive ? " - 已学习" : ""}`}
                  className={`h-4 w-4 rounded-[3px] transition-colors ${
                    isActive
                      ? "bg-emerald-500"
                      : isToday
                        ? "bg-slate-200 ring-1 ring-violet-400"
                        : "bg-slate-100"
                  }`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400">
        <span>少</span>
        <div className="h-3 w-3 rounded-[2px] bg-slate-100" />
        <div className="h-3 w-3 rounded-[2px] bg-emerald-300" />
        <div className="h-3 w-3 rounded-[2px] bg-emerald-500" />
        <span>多</span>
      </div>
    </div>
  );
}
