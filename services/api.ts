import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 类型定义
type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
};

type Todo = {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  dueDate?: string;
  categoryId?: string;
  tagIds?: string[];
  memoId?: string;
};

type Category = {
  id: string;
  name: string;
  color?: string;
};

type Tag = {
  id: string;
  name: string;
};

type Reminder = {
  id: string;
  todoId: string;
  time: string;
  notifyMethod?: 'email' | 'push' | 'sms';
};

// Todo相关API
export const TodoService = {
  list: (params?: { status?: string; page?: number; limit?: number }) => 
    api.get<PaginatedResponse<Todo>>('/todos', { params }),
  create: (data: { title: string; description?: string; categoryId?: string; tagIds?: string[] }) =>
    api.post<Todo>('/todos', data),
  get: (id: string) => api.get<Todo>(`/todos/${id}`),
  update: (id: string, data: Partial<Todo>) => api.put<Todo>(`/todos/${id}`, data),
  delete: (id: string) => api.delete<void>(`/todos/${id}`),
};

// Category相关API
export const CategoryService = {
  list: () => api.get<Category[]>('/categories'),
  create: (data: { name: string; color?: string }) => api.post<Category>('/categories', data),
};

// Tag相关API
export const TagService = {
  list: () => api.get<Tag[]>('/tags'),
  create: (data: { name: string }) => api.post<Tag>('/tags', data),
};

// Reminder相关API
export const ReminderService = {
  list: (todoId: string) => api.get<Reminder[]>(`/todos/${todoId}/reminders`),
  create: (todoId: string, data: { time: string; notifyMethod?: string }) =>
    api.post<Reminder>(`/todos/${todoId}/reminders`, data),
};

export type { Todo, Category, Tag, Reminder };
export default api;