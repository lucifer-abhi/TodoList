import React from 'react';
import { Tag as TagIcon, X } from 'lucide-react';
import { ThemeMode } from '../types';

interface TagsWidgetProps {
  availableTags: string[];
  selectedTagFilter: string | null;
  onSelectTagFilter: (tag: string | null) => void;
  theme: ThemeMode;
}

export const TagsWidget: React.FC<TagsWidgetProps> = ({
  availableTags,
  selectedTagFilter,
  onSelectTagFilter,
  theme,
}) => {
  const defaultTags = ['Learning', 'Project', 'Health', 'Reading', 'Shopping', 'Personal', 'Work'];
  const allTags = Array.from(new Set([...availableTags, ...defaultTags]));

  return (
    <div
      className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-800 text-slate-100'
          : theme === 'gradient'
          ? 'bg-white/95 backdrop-blur-xl border-white/60 shadow-xl text-slate-900'
          : 'bg-white border-slate-200/80 shadow-sm text-slate-900'
      }`}
      id="bento-tags-widget"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-purple-500" />
          <h2 className="text-base font-bold">Popular Tags</h2>
        </div>
        {selectedTagFilter && (
          <button
            onClick={() => onSelectTagFilter(null)}
            className="flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
          >
            <X className="w-3.5 h-3.5" /> Clear tag filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 my-2">
        {allTags.map((tag) => {
          const isSelected = selectedTagFilter === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTagFilter(isSelected ? null : tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : theme === 'dark'
                  ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              #{tag.toLowerCase()}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 mt-2">
        {selectedTagFilter
          ? `Filtering by #${selectedTagFilter.toLowerCase()}`
          : 'Click any tag to filter your task list'}
      </p>
    </div>
  );
};
