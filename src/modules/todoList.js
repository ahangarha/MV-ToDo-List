import isStorageAvailable from './isStorageAvailable.js';

export default class TodoList {
  constructor(wrapper, storageName = 'todos') {
    this.wrapper = wrapper;
    this.storageName = storageName;
    this.isStorageAvailable = isStorageAvailable('localStorage');
  }

  init() {
    if (this.isStorageAvailable) {
      const storage = window.localStorage.getItem(this.storageName);
      this.todos = JSON.parse(storage) || [];
      this.todos = this.sortList();
      window.localStorage.setItem(this.storageName, JSON.stringify(this.todos));
    } else {
      this.todos = [];
    }

    return this.todos;
  }

  updateStorage() {
    if (this.isStorageAvailable) {
      window.localStorage.setItem(this.storageName, JSON.stringify(this.todos));
    }
  }

  sortList() {
    let sortedTodos = this.todos.sort((a, b) => a.index - b.index);
    // recreate indexes from 0
    sortedTodos = sortedTodos.map((todo, index) => ({
      index,
      description: todo.description,
      completed: todo.completed,
    }));
    return sortedTodos;
  }

  removeAllFromPage() {
    this.wrapper.innerHTML = '';
  }

  addNewTodo(description) {
    const index = this.todos.length;
    const completed = false;

    const newTodo = {
      index,
      description,
      completed,
    };

    // save in the storage
    this.todos.push(newTodo);
    if (this.isStorageAvailable) {
      window.localStorage.setItem(this.storageName, JSON.stringify(this.todos));
    }

    return newTodo;
  }

  removeTodo(index) {
    this.todos = this.todos.filter((todo) => todo.index !== index);
    this.todos = this.sortList();
    this.updateStorage();
    return true;
  }

  removeAllCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.todos = this.sortList();
    this.updateStorage();
  }

  setCompleted(index, status) {
    this.todos[index].completed = status;
    this.updateStorage();
  }

  setDescription(index, description) {
    this.todos[index].description = description;
    this.updateStorage();
  }
}
