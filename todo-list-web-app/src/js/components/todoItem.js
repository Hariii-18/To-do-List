class TodoItem {
  constructor(title) {
    this.title = String(title || '');
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  render() {
    const item = document.createElement('div');
    item.className = 'todo-item';
    item.innerHTML = `
      <input type="checkbox" ${this.completed ? 'checked' : ''} aria-label="Toggle todo" />
      <span>${this._escape(this.title)}</span>
      <button class="delete-btn" aria-label="Delete todo">Delete</button>
    `;
    return item;
  }

  // basic escaping to avoid accidental HTML injection
  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

export default TodoItem;