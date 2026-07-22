import { Task } from '../types';

export const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Learn Next.js',
    completed: false,
    priority: 'high',
    tags: ['Learning', 'Coding'],
    deadline: 'Tomorrow',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Build a To Do App',
    completed: true,
    priority: 'high',
    tags: ['Project', 'React'],
    deadline: 'Today',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Go to the Gym',
    completed: false,
    priority: 'medium',
    tags: ['Health', 'Fitness'],
    deadline: 'Today',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Read a Book',
    completed: false,
    priority: 'low',
    tags: ['Reading', 'Leisure'],
    deadline: 'This Week',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Buy Groceries',
    completed: false,
    priority: 'medium',
    tags: ['Personal', 'Shopping'],
    deadline: 'Today',
    createdAt: new Date().toISOString(),
  },
];
