import React from 'react';
import { ThemeMode } from '../types';

interface FooterProps {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({
  activeCount,
  completedCount,
  onClearCompleted,
  theme,
}) => {
  return (
    <footer
      className="flex items-center justify-between pt-6 mt-6 border-t border-inherit text-sm font-medium"
      id="task-app-footer"
    >
      <span
        className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}
        id="active-task-count"
      >
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
      </span>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-semibold transition-colors cursor-pointer"
          id="clear-completed-btn"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
