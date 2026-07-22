import React from 'react';
import { ClipboardList, Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../types';

interface HeaderProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  return (
    <header className="flex items-center justify-between pb-6 mb-2 border-b border-inherit">
      <div className="flex items-center gap-3">
        {/* App Icon & Website Name */}
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-2xl shadow-sm transition-colors duration-200 ${
              theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
            }`}
            id="app-header-icon"
          >
            <ClipboardList className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                }`}
                id="app-header-title"
              >
                Task Manager
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                To-Do & Calendar
              </span>
            </div>
            <p
              className={`text-xs font-medium mt-0.5 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Organize your daily workflow & schedule
            </p>
          </div>
        </div>
      </div>

      {/* Theme Switcher Options */}
      <div className="flex items-center gap-2" id="theme-switcher-container">
        {/* Quick Toggle Pill Selector */}
        <div
          className={`p-1 rounded-full flex items-center border transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-100 border-slate-200'
          }`}
          id="theme-toggle-pills"
        >
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              theme === 'light'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Light Theme"
            id="theme-btn-light"
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Light</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              theme === 'dark'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Dark Theme"
            id="theme-btn-dark"
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dark</span>
          </button>
        </div>
      </div>
    </header>
  );
};
