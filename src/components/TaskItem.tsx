import React from 'react';
import { Check, Edit2, Trash2, Calendar, Tag as TagIcon } from 'lucide-react';
import { Task, ThemeMode } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  theme: ThemeMode;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  theme,
}) => {
  const getPriorityBadge = () => {
    if (task.completed) {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
          • Completed •
        </span>
      );
    }

    switch (task.priority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span>
            • High Priority •
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
            • Medium Priority •
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
            • Low Priority •
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
        theme === 'dark'
          ? 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 text-slate-100'
          : 'bg-white hover:bg-slate-50/80 border-slate-200/80 shadow-2xs text-slate-900'
      }`}
      id={`task-item-${task.id}`}
    >
      <div className="flex items-start gap-3.5 flex-1 min-w-0 pr-3">
        {/* Circular Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-200 shrink-0 cursor-pointer ${
            task.completed
              ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
              : theme === 'dark'
              ? 'border-slate-600 hover:border-blue-400 bg-slate-800/50'
              : 'border-slate-300 hover:border-blue-500 bg-white'
          }`}
          title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          id={`task-checkbox-${task.id}`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Title & Details */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <span
            className={`text-base font-bold tracking-tight transition-all duration-200 break-words ${
              task.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : theme === 'dark'
                ? 'text-slate-100'
                : 'text-slate-900'
            }`}
            id={`task-title-${task.id}`}
          >
            {task.title}
          </span>

          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            {/* Priority / Completed Tag */}
            {getPriorityBadge()}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 py-0.5 text-[11px] font-medium rounded-md border ${
                      theme === 'dark'
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : 'bg-slate-100 text-slate-600 border-slate-200/80'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Deadline */}
            {task.deadline && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-md border ${
                  theme === 'dark'
                    ? 'bg-purple-950/40 text-purple-300 border-purple-800/80'
                    : 'bg-purple-50 text-purple-700 border-purple-200/80'
                }`}
              >
                <Calendar className="w-3 h-3" />
                {task.deadline}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons: Edit and Delete */}
      <div className="flex items-center gap-1.5 shrink-0" id={`task-actions-${task.id}`}>
        <button
          onClick={() => onEdit(task)}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${
            theme === 'dark'
              ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
          }`}
          title="Edit Task"
          id={`edit-task-btn-${task.id}`}
        >
          <Edit2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className={`p-2 rounded-lg transition-colors cursor-pointer text-red-500 hover:text-red-600 ${
            theme === 'dark' ? 'hover:bg-red-950/40' : 'hover:bg-red-50'
          }`}
          title="Delete Task"
          id={`delete-task-btn-${task.id}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
