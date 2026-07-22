import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { TaskFilter } from './components/TaskFilter';
import { TaskItem } from './components/TaskItem';
import { TaskEditModal } from './components/TaskEditModal';
import { Footer } from './components/Footer';
import { CalendarWidget } from './components/CalendarWidget';
import { INITIAL_TASKS } from './data/initialTasks';
import { FilterTab, Priority, Task, ThemeMode } from './types';
import { ListTodo, Flame, Tag as TagIcon, X, Calendar as CalendarIcon } from 'lucide-react';

export default function App() {
  // Load tasks from localStorage or fall back to initial preset tasks matching screenshot
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('mytasks_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved tasks', e);
      }
    }
    return INITIAL_TASKS;
  });

  // Theme mode: light or dark
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = localStorage.getItem('mytasks_theme') as ThemeMode;
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
  });

  // Filter state
  const [currentTab, setCurrentTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Edit modal state
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem('mytasks_data', JSON.stringify(tasks));
  }, [tasks]);

  // Sync theme to localStorage
  useEffect(() => {
    localStorage.setItem('mytasks_theme', theme);
  }, [theme]);

  // Add task handler
  const handleAddTask = (
    title: string,
    priority: Priority,
    tags: string[],
    deadline?: string
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      tags,
      deadline,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  // Toggle complete status
  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // Auto unhide remaining tasks if current filtered view has no tasks left
    const remainingInFilter = updatedTasks.filter((task) => {
      if (currentTab === 'active' && task.completed) return false;
      if (currentTab === 'completed' && !task.completed) return false;
      if (selectedTagFilter && (!task.tags || !task.tags.includes(selectedTagFilter))) return false;
      if (selectedDate && task.deadline?.toLowerCase() !== selectedDate.toLowerCase()) return false;
      return true;
    });

    if (remainingInFilter.length === 0 && updatedTasks.length > 0) {
      setCurrentTab('all');
      setSelectedTagFilter(null);
      setSelectedDate(null);
      setSearchQuery('');
    }
  };

  // Save edited task
  const handleSaveEdit = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setEditingTask(null);
  };

  // Delete task
  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);

    // Auto unhide remaining tasks if current filtered view becomes empty
    const remainingInFilter = updatedTasks.filter((task) => {
      if (currentTab === 'active' && task.completed) return false;
      if (currentTab === 'completed' && !task.completed) return false;
      if (selectedTagFilter && (!task.tags || !task.tags.includes(selectedTagFilter))) return false;
      if (selectedDate && task.deadline?.toLowerCase() !== selectedDate.toLowerCase()) return false;
      return true;
    });

    if (remainingInFilter.length === 0 && updatedTasks.length > 0) {
      setCurrentTab('all');
      setSelectedTagFilter(null);
      setSelectedDate(null);
      setSearchQuery('');
    }
  };

  // Clear completed tasks
  const handleClearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // Unique available tags across all tasks
  const availableTags = useMemo(() => {
    const set = new Set<string>();
    tasks.forEach((t) => t.tags?.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [tasks]);

  // Filtered tasks calculation
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Tab filter
      if (currentTab === 'active' && task.completed) return false;
      if (currentTab === 'completed' && !task.completed) return false;

      // Tag filter
      if (selectedTagFilter && (!task.tags || !task.tags.includes(selectedTagFilter))) {
        return false;
      }

      // Date filter from calendar
      if (selectedDate) {
        if (!task.deadline) return false;
        const taskDeadlineLower = task.deadline.toLowerCase();
        if (taskDeadlineLower !== selectedDate.toLowerCase()) {
          // Compare today/tomorrow string fallback
          const today = new Date();
          const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
          if (selectedDate === todayStr && taskDeadlineLower === 'today') {
            // match
          } else {
            return false;
          }
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesTag = task.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesPriority = task.priority.toLowerCase().includes(query);
        const matchesDeadline = task.deadline?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesTag && !matchesPriority && !matchesDeadline) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, currentTab, selectedTagFilter, selectedDate, searchQuery]);

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const highPriorityCount = tasks.filter((t) => !t.completed && t.priority === 'high').length;

  // Background styling based on theme
  const getAppBgClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-slate-950 text-slate-100';
      case 'light':
      default:
        return 'bg-slate-100/90 text-slate-900';
    }
  };

  // Main Card container styling
  const getCardBgClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-slate-900/90 border-slate-800 shadow-2xl';
      case 'light':
      default:
        return 'bg-white border-slate-200/90 shadow-md';
    }
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${getAppBgClass()}`}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* App Top Container */}
        <div className={`rounded-3xl border p-5 sm:p-6 ${getCardBgClass()}`}>
          <Header theme={theme} setTheme={setTheme} />
          
          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-3 border-t border-inherit text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2">
              {highPriorityCount > 0 ? (
                <span className="flex items-center gap-1.5 text-rose-500 font-bold bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                  <Flame className="w-4 h-4 fill-rose-500" />
                  {highPriorityCount} High Priority
                </span>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">
                  {activeCount} active tasks remaining
                </span>
              )}
            </div>

            {/* Selected Filters badges */}
            <div className="flex flex-wrap items-center gap-2">
              {selectedTagFilter && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-semibold">
                  <TagIcon className="w-3 h-3" />
                  #{selectedTagFilter}
                  <button
                    onClick={() => setSelectedTagFilter(null)}
                    className="hover:text-red-500 ml-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {selectedDate && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold">
                  <CalendarIcon className="w-3 h-3" />
                  Date: {selectedDate}
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="hover:text-red-500 ml-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Simplified Main Grid: Left To-Do List + Right Interactive Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main To-Do Section (8 cols) */}
          <div className={`lg:col-span-7 rounded-3xl border p-5 sm:p-7 flex flex-col justify-between ${getCardBgClass()}`}>
            <div>
              {/* Task Add Form */}
              <TaskInput onAddTask={handleAddTask} theme={theme} />

              {/* Task Filter Tabs & Search */}
              <TaskFilter
                currentTab={currentTab}
                onSelectTab={setCurrentTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                theme={theme}
                selectedTagFilter={selectedTagFilter}
                onSelectTagFilter={setSelectedTagFilter}
                availableTags={availableTags}
              />

              {/* Task Items List */}
              <div className="space-y-3 min-h-[280px]" id="task-list-container">
                {filteredTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center opacity-70">
                    <ListTodo className="w-12 h-12 mb-3 stroke-[1.5] text-slate-400" />
                    <p className="text-base font-semibold">No matching tasks</p>
                    <p className="text-xs text-slate-400 mt-1 mb-3">
                      {searchQuery
                        ? 'Try adjusting your search query'
                        : selectedTagFilter
                        ? `No tasks tagged with #${selectedTagFilter}`
                        : selectedDate
                        ? `No tasks scheduled for ${selectedDate}`
                        : currentTab === 'completed'
                        ? 'No completed tasks found'
                        : currentTab === 'active'
                        ? 'All tasks are completed!'
                        : 'Add a new task above to get started!'}
                    </p>
                    {tasks.length > 0 && (
                      <button
                        onClick={() => {
                          setCurrentTab('all');
                          setSelectedTagFilter(null);
                          setSelectedDate(null);
                          setSearchQuery('');
                        }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
                        id="unhide-all-tasks-btn"
                      >
                        Show All Remaining Tasks ({tasks.length})
                      </button>
                    )}
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredTasks.map((task) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        layout
                      >
                        <TaskItem
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onEdit={setEditingTask}
                          onDelete={handleDeleteTask}
                          theme={theme}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>

            {/* Footer with counts & clear button */}
            <Footer
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={handleClearCompleted}
              theme={theme}
            />
          </div>

          {/* Right Interactive Full Calendar & Tag Filter (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <CalendarWidget
              theme={theme}
              tasks={tasks}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            {/* Simple Tags Cloud */}
            {availableTags.length > 0 && (
              <div className={`rounded-3xl border p-5 ${getCardBgClass()}`}>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <TagIcon className="w-4 h-4 text-purple-500" />
                  <span>Filter by Tag</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => {
                    const isSelected = selectedTagFilter === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTagFilter(isSelected ? null : tag)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : theme === 'dark'
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={handleSaveEdit}
          onClose={() => setEditingTask(null)}
          theme={theme}
        />
      )}
    </div>
  );
}
