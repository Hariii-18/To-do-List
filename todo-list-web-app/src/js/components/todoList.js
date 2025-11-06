import TodoItem from './todoItem.js';
import Storage from '../storage.js';

class TodoList {
  constructor() {
    this.todos = [];
    this.container = document.querySelector('.todo-container');
    this.totalCountEl = document.getElementById('total-count');
    this.remainingCountEl = document.getElementById('remaining-count');
  }

  addTodo(payload) {
    let todoObj;
    if (payload instanceof TodoItem) {
      todoObj = payload;
    } else if (typeof payload === 'string') {
      todoObj = new TodoItem(payload);
    } else if (payload && typeof payload.title === 'string') {
      todoObj = new TodoItem(payload.title);
      if (payload.completed) todoObj.completed = true;
    } else {
      return;
    }

    this.todos.push(todoObj);
    this.saveAndRender();
  }

  removeTodo(index) {
    index = Number(index);
    if (!Number.isFinite(index)) return;
    this.todos.splice(index, 1);
    this.saveAndRender();
  }

  toggleCompleted(index) {
    index = Number(index);
    if (!Number.isFinite(index)) return;
    const todo = this.todos[index];
    if (!todo) return;
    todo.toggleCompleted();
    this.saveAndRender();
  }

  clearTodos() {
    this.todos = [];
    this.saveAndRender();
  }

  saveAndRender() {
    const toSave = this.todos.map(t => ({ title: t.title, completed: !!t.completed }));
    Storage.saveTodos(toSave);
    this.render();
  }

  render() {
    if (!this.container) this.container = document.querySelector('.todo-container');
    if (!this.container) return;

    // clean container
    this.container.innerHTML = '';

    // render items
    this.todos.forEach((todo, index) => {
      const el = todo.render();
      el.dataset.index = index;
      el.classList.toggle('completed', !!todo.completed);

      // checkbox handler
      const checkbox = el.querySelector('input[type="checkbox"]');
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          this.toggleCompleted(index);
        });
      }

      // delete handler
      const del = el.querySelector('.delete-btn');
      if (del) {
        del.addEventListener('click', () => {
          this.removeTodo(index);
        });
      }

      this.container.appendChild(el);
    });

    this._updateCounts();
  }

  _updateCounts() {
    const total = this.todos.length;
    const remaining = this.todos.filter(t => !t.completed).length;
    if (this.totalCountEl) this.totalCountEl.textContent = String(total);
    if (this.remainingCountEl) this.remainingCountEl.textContent = String(remaining);
  }
}

export default TodoList;