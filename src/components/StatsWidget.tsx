import React from 'react';
import { TrendingUp, CheckCircle, Flame } from 'lucide-react';
import { Task, ThemeMode } from '../types';

interface StatsWidgetProps {
  tasks: Task[];
  theme: ThemeMode;
}

export const StatsWidget: React.FC<StatsWidgetProps> = ({ tasks, theme }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const highPriorityActive = tasks.filter((t) => !t.completed && t.priority === 'high').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  // SVG stroke math for circular gauge
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900 border border-slate-800 text-white'
          : theme === 'gradient'
          ? 'bg-slate-900 text-white shadow-xl'
          : 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
      }`}
      id="bento-productivity-widget"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold">Productivity</h2>
        </div>
        {highPriorityActive > 0 && (
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <Flame className="w-3.5 h-3.5" />
            {highPriorityActive} Urgent
          </span>
        )}
      </div>

      <div className="my-3 flex items-center justify-around">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="56"
              cy="56"
              r={radius}
              fill="transparent"
              stroke="#334155"
              strokeWidth="10"
            />
            <circle
              cx="56"
              cy="56"
              r={radius}
              fill="transparent"
              stroke="#3b82f6"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black">{percentage}%</span>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Done</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-slate-300 font-medium">{completed} Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
            <span className="text-slate-400 font-medium">{total - completed} Remaining</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Completed {completed} of {total} total tasks</span>
      </p>
    </div>
  );
};
