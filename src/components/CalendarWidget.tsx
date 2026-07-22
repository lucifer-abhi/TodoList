import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar as CalendarIcon,
  RotateCcw,
  X,
} from 'lucide-react';
import { Task, ThemeMode } from '../types';

interface CalendarWidgetProps {
  theme: ThemeMode;
  tasks: Task[];
  selectedDate: string | null;
  onSelectDate: (date: string | null) => void;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  theme,
  tasks,
  selectedDate,
  onSelectDate,
}) => {
  const today = new Date();
  const currentRealYear = today.getFullYear();
  const currentRealMonth = today.getMonth();
  const currentRealDay = today.getDate();

  const [viewYear, setViewYear] = useState<number>(currentRealYear);
  const [viewMonth, setViewMonth] = useState<number>(currentRealMonth);

  // Generate 200 years range: 100 years back to 100 years forward
  const years = Array.from({ length: 201 }, (_, i) => currentRealYear - 100 + i);

  // Navigation handlers
  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  const handlePrevYear = () => {
    setViewYear((prev) => Math.max(years[0], prev - 1));
  };

  const handleNextYear = () => {
    setViewYear((prev) => Math.min(years[years.length - 1], prev + 1));
  };

  const handleResetToday = () => {
    setViewYear(currentRealYear);
    setViewMonth(currentRealMonth);
    const todayStr = formatDateStr(currentRealYear, currentRealMonth, currentRealDay);
    onSelectDate(todayStr);
  };

  // Format YYYY-MM-DD
  function formatDateStr(year: number, month: number, day: number): string {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  // Calculate calendar grid days
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  interface CalendarDay {
    dayNumber: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
    dateStr: string;
    isToday: boolean;
    hasTasks: boolean;
    taskCount: number;
  }

  const daysGrid: CalendarDay[] = [];

  // Previous month padding days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const pDay = daysInPrevMonth - i;
    const pMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const pYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const dateStr = formatDateStr(pYear, pMonth, pDay);
    daysGrid.push({
      dayNumber: pDay,
      month: pMonth,
      year: pYear,
      isCurrentMonth: false,
      dateStr,
      isToday: false,
      hasTasks: false,
      taskCount: 0,
    });
  }

  // Current month days
  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dateStr = formatDateStr(viewYear, viewMonth, d);
    const isToday =
      viewYear === currentRealYear &&
      viewMonth === currentRealMonth &&
      d === currentRealDay;

    // Check if tasks exist for this date
    const matchingTasks = tasks.filter((t) => {
      if (!t.deadline) return false;
      if (t.deadline === dateStr) return true;
      if (isToday && t.deadline.toLowerCase() === 'today') return true;
      if (
        t.deadline.toLowerCase() === 'tomorrow' &&
        new Date(dateStr).getTime() === new Date(formatDateStr(currentRealYear, currentRealMonth, currentRealDay + 1)).getTime()
      ) {
        return true;
      }
      return false;
    });

    daysGrid.push({
      dayNumber: d,
      month: viewMonth,
      year: viewYear,
      isCurrentMonth: true,
      dateStr,
      isToday,
      hasTasks: matchingTasks.length > 0,
      taskCount: matchingTasks.length,
    });
  }

  // Next month padding days to fill 35 or 42 grid cells
  const remainingCells = (7 - (daysGrid.length % 7)) % 7;
  for (let n = 1; n <= remainingCells; n++) {
    const nMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const nYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    const dateStr = formatDateStr(nYear, nMonth, n);
    daysGrid.push({
      dayNumber: n,
      month: nMonth,
      year: nYear,
      isCurrentMonth: false,
      dateStr,
      isToday: false,
      hasTasks: false,
      taskCount: 0,
    });
  }

  return (
    <div
      className={`rounded-3xl border p-5 sm:p-6 transition-all duration-300 shadow-sm ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200/90 text-slate-900'
      }`}
      id="interactive-full-calendar"
    >
      {/* Calendar Header with Controls */}
      <div className="flex flex-col gap-3 pb-4 mb-4 border-b border-inherit">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold tracking-tight">Interactive Calendar</h2>
          </div>

          <button
            onClick={handleResetToday}
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-blue-400'
                : 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700'
            }`}
            title="Jump to today's date"
            id="calendar-today-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>
        </div>

        {/* Month and Year Selectors + Nav Buttons */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevYear}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Previous Year (-1)"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Month & Year Selectors */}
          <div className="flex items-center gap-2">
            <select
              value={viewMonth}
              onChange={(e) => setViewMonth(Number(e.target.value))}
              className={`px-2.5 py-1 rounded-xl border text-xs font-bold outline-none cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-slate-100'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
              id="calendar-month-select"
            >
              {MONTH_NAMES.map((name, index) => (
                <option key={name} value={index}>
                  {name}
                </option>
              ))}
            </select>

            <select
              value={viewYear}
              onChange={(e) => setViewYear(Number(e.target.value))}
              className={`px-2.5 py-1 rounded-xl border text-xs font-bold outline-none cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-slate-100'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
              id="calendar-year-select"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextYear}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Next Year (+1)"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Date Indicator / Reset Filter */}
      {selectedDate && (
        <div className="mb-3 flex items-center justify-between px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <span>Filtering tasks for: <strong>{selectedDate}</strong></span>
          <button
            onClick={() => onSelectDate(null)}
            className="hover:bg-blue-500/20 p-1 rounded-md transition-colors cursor-pointer"
            title="Clear date filter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Days of week header */}
      <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 mb-2">
        {DAYS_OF_WEEK.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {daysGrid.map((item, idx) => {
          const isSelected = selectedDate === item.dateStr;

          return (
            <button
              key={idx}
              onClick={() => onSelectDate(isSelected ? null : item.dateStr)}
              className={`relative py-2 flex flex-col items-center justify-center rounded-xl transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white font-bold shadow-md scale-105'
                  : item.isToday
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-extrabold border border-blue-300 dark:border-blue-700'
                  : !item.isCurrentMonth
                  ? 'text-slate-300 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  : theme === 'dark'
                  ? 'text-slate-200 hover:bg-slate-800'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{item.dayNumber}</span>

              {/* Task Indicator Dot */}
              {item.hasTasks && (
                <span
                  className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                    isSelected ? 'bg-white' : 'bg-rose-500 animate-pulse'
                  }`}
                  title={`${item.taskCount} task(s)`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
