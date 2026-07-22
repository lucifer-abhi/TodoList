export type Priority = 'high' | 'medium' | 'low';

export type FilterTab = 'all' | 'active' | 'completed';

export type ThemeMode = 'light' | 'dark';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  tags: string[];
  deadline?: string;
  createdAt: string;
}
