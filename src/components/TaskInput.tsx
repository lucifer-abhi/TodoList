import React, { useState } from 'react';
import { Plus, Flag, Tag as TagIcon, Calendar, ChevronDown, X } from 'lucide-react';
import { Priority, ThemeMode } from '../types';

interface TaskInputProps {
  onAddTask: (title: string, priority: Priority, tags: string[], deadline?: string) => void;
  theme: ThemeMode;
}

const PRESET_TAGS = ['Work', 'Personal', 'Learning', 'Health', 'Shopping', 'Project', 'Reading'];

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, theme }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Personal']);
  const [customTagInput, setCustomTagInput] = useState('');
  const [deadline, setDeadline] = useState<string>('Today');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask(title.trim(), priority, selectedTags, deadline.trim() || undefined);
    setTitle('');
    // keep default selections or reset
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const addCustomTag = () => {
    if (customTagInput.trim() && !selectedTags.includes(customTagInput.trim())) {
      setSelectedTags([...selectedTags, customTagInput.trim()]);
      setCustomTagInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6" id="add-task-form">
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setShowOptions(true)}
            placeholder="What do you want to do?"
            className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none text-base ${
              theme === 'dark'
                ? 'bg-slate-800/90 border-slate-700 text-slate-100 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                : 'bg-slate-50/70 border-slate-200/90 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-xs'
            }`}
            id="task-title-input"
          />
        </div>

        <button
          type="submit"
          disabled={!title.trim()}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer text-white shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
          id="add-task-submit-btn"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Expandable Options: Priority, Tags, Deadline */}
      {showOptions && (
        <div
          className={`mt-3 p-4 rounded-xl border text-sm transition-all duration-200 space-y-3 ${
            theme === 'dark'
              ? 'bg-slate-800/60 border-slate-700/80 text-slate-200'
              : 'bg-slate-50/90 border-slate-200 text-slate-700'
          }`}
          id="task-options-panel"
        >
          {/* Priority selector */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center gap-1.5 w-20">
              <Flag className="w-3.5 h-3.5" /> Priority
            </span>
            <div className="flex items-center gap-1.5">
              {(['high', 'medium', 'low'] as Priority[]).map((p) => {
                const isSelected = priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize border transition-all ${
                      isSelected
                        ? p === 'high'
                          ? 'bg-red-500 text-white border-red-500'
                          : p === 'medium'
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-blue-500 text-white border-blue-500'
                        : theme === 'dark'
                        ? 'bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    • {p} Priority •
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center gap-1.5 w-20">
              <TagIcon className="w-3.5 h-3.5" /> Tags
            </span>
            <div className="flex flex-wrap items-center gap-1.5 flex-1">
              {PRESET_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all ${
                      isSelected
                        ? theme === 'dark'
                          ? 'bg-blue-500/30 text-blue-300 border-blue-400'
                          : 'bg-blue-100 text-blue-700 border-blue-300'
                        : theme === 'dark'
                        ? 'bg-slate-700/40 border-slate-600 text-slate-400 hover:text-slate-200'
                        : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}

              <div className="flex items-center gap-1 ml-1">
                <input
                  type="text"
                  placeholder="+ Custom tag"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addCustomTag();
                    }
                  }}
                  className={`px-2 py-0.5 text-xs rounded-lg border outline-none w-24 ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Deadline Selector */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-70 flex items-center gap-1.5 w-20">
              <Calendar className="w-3.5 h-3.5" /> Deadline
            </span>
            <div className="flex items-center gap-2 flex-1">
              {['Today', 'Tomorrow', 'This Week'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDeadline(d)}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border transition-all ${
                    deadline === d
                      ? theme === 'dark'
                        ? 'bg-purple-900/50 text-purple-300 border-purple-500'
                        : 'bg-purple-100 text-purple-800 border-purple-300'
                      : theme === 'dark'
                      ? 'bg-slate-700/40 border-slate-600 text-slate-400'
                      : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  {d}
                </button>
              ))}
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Custom date e.g. Jul 28"
                className={`px-2 py-0.5 text-xs rounded-lg border outline-none w-36 ${
                  theme === 'dark'
                    ? 'bg-slate-900 border-slate-700 text-slate-200'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
