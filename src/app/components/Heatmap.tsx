"use client";

interface HeatmapProps {
  checkins: Record<number, { completed: boolean; date?: string }>;
}

function getLast16Weeks(): string[][] {
  const weeks: string[][] = [];
  const today = new Date();
  const dayOfWeek = today.getDay();
  const start = new Date(today);
  start.setDate(start.getDate() - dayOfWeek - 7 * 15);

  for (let w = 0; w < 16; w++) {
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
  const weeks = getLast16Weeks();
  const checkinDates = new Map<string, number>();
  Object.values(checkins).forEach((c) => {
    if (c.completed && c.date) {
      checkinDates.set(c.date, (checkinDates.get(c.date) || 0) + 1);
    }
  });

  const today = new Date().toLocaleDateString("zh-CN");

  function getColor(count: number, isToday: boolean): string {
    if (count >= 3) return "bg-[#58CC02]";
    if (count >= 2) return "bg-[#89E219]";
    if (count >= 1) return "bg-[#B8F060]";
    if (isToday) return "bg-orange-200 ring-2 ring-[#FF8C1A]";
    return "bg-gray-100";
  }

  return (
    <div className="rounded-3xl bg-white ring-1 ring-gray-100 p-5 shadow-sm h-full flex flex-col justify-center">
      <h3 className="text-sm font-extrabold text-gray-700 mb-3">📅 学习日历</h3>
      <div className="flex gap-[3px] justify-center">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[3px]">
            {week.map((date, di) => {
              const count = checkinDates.get(date) || 0;
              const isToday = date === today;
              return (
                <div
                  key={di}
                  title={`${date}${count > 0 ? ` · ${count}课` : ""}`}
                  className={`h-[14px] w-[14px] rounded-[4px] transition-all duration-200 hover:scale-125 ${getColor(count, isToday)}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-gray-400 justify-end">
        <span>少</span>
        <div className="h-[10px] w-[10px] rounded-[3px] bg-gray-100" />
        <div className="h-[10px] w-[10px] rounded-[3px] bg-[#B8F060]" />
        <div className="h-[10px] w-[10px] rounded-[3px] bg-[#89E219]" />
        <div className="h-[10px] w-[10px] rounded-[3px] bg-[#58CC02]" />
        <span>多</span>
      </div>
    </div>
  );
}
