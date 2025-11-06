// This file handles the storage of to-do items, including saving and retrieving items from local storage.

const STORAGE_KEY = 'todo_app_v1';

export default {
  getTodos() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  },

  saveTodos(todos = []) {
    try {
      const normalized = todos.map(t => ({
        title: String(t.title || ''),
        completed: !!t.completed
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    } catch (e) {
      console.error('Storage save error', e);
    }
  }
};