import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar as CalendarIcon,
  Folder,
  User,
  Sparkles,
} from 'lucide-react';
import { ThemeMode } from '../types';

interface SidebarProps {
  theme: ThemeMode;
  activeCount: number;
  completedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ theme, activeCount, completedCount }) => {
  return (
    <aside
      className={`hidden lg:flex flex-col w-64 shrink-0 rounded-3xl border p-6 justify-between transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-800 text-slate-300'
          : theme === 'gradient'
          ? 'bg-slate-900/90 backdrop-blur-xl border-slate-800 text-slate-300 shadow-xl'
          : 'bg-slate-900 text-slate-300 shadow-xl'
      }`}
      id="bento-sidebar"
    >
      <div className="space-y-8">
        {/* Logo Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/30">
            T
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight block leading-none">
              TaskPro
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Bento Workspace
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5" id="sidebar-nav">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-sm cursor-pointer">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </div>

          <div className="flex items-center justify-between px-4 py-3 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors rounded-xl font-medium cursor-pointer">
            <div className="flex items-center gap-3">
              <CheckSquare className="w-5 h-5" />
              <span>My Tasks</span>
            </div>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full font-bold text-slate-300">
              {activeCount}
            </span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors rounded-xl font-medium cursor-pointer">
            <CalendarIcon className="w-5 h-5" />
            <span>Calendar</span>
          </div>
        </nav>

        {/* Folders */}
        <div className="pt-4 border-t border-slate-800">
          <h3 className="px-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center justify-between">
            <span>Categories</span>
            <Folder className="w-3.5 h-3.5" />
          </h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between px-4 py-2 hover:text-white cursor-pointer rounded-lg hover:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="font-medium">Work</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-semibold">
                {activeCount}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-2 hover:text-white cursor-pointer rounded-lg hover:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                <span className="font-medium">Personal</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full font-semibold">
                {completedCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* User profile card at bottom */}
      <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
          AR
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white truncate">Alex Rivera</p>
          <p className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-400" /> Pro Account
          </p>
        </div>
      </div>
    </aside>
  );
};
