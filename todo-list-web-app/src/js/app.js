// This file serves as the entry point for the JavaScript functionality of the application.

import TodoList from './components/todoList.js';
import Storage from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const todoList = new TodoList();
  const stored = Storage.getTodos() || [];
  if (stored.length) {
    stored.forEach(t => todoList.addTodo(t));
  }

  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;
      todoList.addTodo(val);
      input.value = '';
      input.focus();
    });
  }

  const clearBtn = document.getElementById('clear-todos');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Clear all todos?')) {
        todoList.clearTodos();
      }
    });
  }
});