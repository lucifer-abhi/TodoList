import React from 'react';
import { Search, Filter } from 'lucide-react';
import { FilterTab, ThemeMode } from '../types';

interface TaskFilterProps {
  currentTab: FilterTab;
  onSelectTab: (tab: FilterTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: ThemeMode;
  selectedTagFilter: string | null;
  onSelectTagFilter: (tag: string | null) => void;
  availableTags: string[];
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  theme,
  selectedTagFilter,
  onSelectTagFilter,
  availableTags,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6" id="task-filter-bar">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2" id="filter-tabs-container">
        {(['all', 'active', 'completed'] as FilterTab[]).map((tab) => {
          const isActive = currentTab === tab;
          const label = tab.charAt(0).toUpperCase() + tab.slice(1);

          return (
            <button
              key={tab}
              onClick={() => onSelectTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all duration-200 border cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : theme === 'dark'
                  ? 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700/80'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
              }`}
              id={`filter-tab-${tab}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Search Input Box */}
      <div className="relative flex-1 sm:max-w-xs" id="search-container">
        <Search
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
          }`}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm outline-none transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-slate-800/90 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500'
              : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500 shadow-xs'
          }`}
          id="search-tasks-input"
        />
      </div>
    </div>
  );
};
