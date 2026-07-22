import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface TipWidgetProps {
  theme: ThemeMode;
}

const TIPS = [
  "Break large tasks into smaller sub-tasks to maintain steady momentum.",
  "Tackle your high priority tasks early in the morning when focus is highest.",
  "Group similar tasks together using tags like #Shopping or #Project.",
  "Set clear deadlines to maintain urgency and prevent task delays.",
];

export const TipWidget: React.FC<TipWidgetProps> = ({ theme }) => {
  const [tipIndex, setTipIndex] = useState(0);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  return (
    <div
      className="rounded-3xl p-6 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white shadow-xl flex flex-col justify-between transition-all duration-300"
      id="bento-tip-widget"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h2 className="text-base font-bold">Tip of the Day</h2>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
            Focus
          </span>
        </div>
        <p className="text-sm font-medium leading-snug opacity-95 mt-2">
          "{TIPS[tipIndex]}"
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handleNextTip}
          className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Next Tip</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
        <span className="text-[11px] opacity-75">
          {tipIndex + 1} / {TIPS.length}
        </span>
      </div>
    </div>
  );
};
