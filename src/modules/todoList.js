import isStorageAvailable from './isStorageAvailable.js';

export default class TodoList {
  constructor(wrapper, storageName = 'todos') {
    this.wrapper = wrapper;
    this.storageName = storageName;
    this.isStorageAvailable = isStorageAvailable('localStorage');
    this.init();
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

    this.addAllToPage();
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

  addAllToPage() {
    this.todos.forEach((todo) => {
      this.addToPage(todo);
    });
  }

  removeAllFromPage() {
    this.wrapper.innerHTML = '';
  }

  addToPage(todo) {
    const li = document.createElement('li');
    li.classList.add('todo');
    li.setAttribute('id', 'todo-'.concat(todo.index));

    const completionIcon = document.createElement('button');
    completionIcon.setAttribute('type', 'button');
    completionIcon.classList.add('completionIcon', 'icon');
    completionIcon.innerHTML = `
    <svg
      class="icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      ></path>
    </svg>
    <svg
      class="icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      ></path>
    </svg>
    `;

    completionIcon.addEventListener('click', (event) => {
      event.preventDefault();
      this.toggleCompleteStatus(li);
    });

    const description = document.createElement('input');
    description.setAttribute('type', 'text');
    description.setAttribute('name', 'description');
    description.readOnly = true;
    description.setAttribute('value', todo.description);
    description.classList.add('description');

    description.addEventListener('focusin', () => {
      description.readOnly = false;
      li.classList.add('active');
    });

    description.addEventListener('focusout', () => {
      description.readOnly = true;
      li.classList.remove('active');
    });

    const actionIcon = document.createElement('div');
    actionIcon.classList.add('actionIcon', 'icon');

    const dragIcon = document.createElement('button');
    dragIcon.setAttribute('type', 'button');
    dragIcon.innerHTML = `
    <svg
      class="icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      ></path>
    </svg>
    `;

    const deleteIcon = document.createElement('button');
    deleteIcon.setAttribute('type', 'button');
    deleteIcon.innerHTML = `
    <svg
      class="icon"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      ></path>
    </svg>
    `;
    deleteIcon.addEventListener('click', () => this.removeItem(li));

    actionIcon.appendChild(dragIcon);
    actionIcon.appendChild(deleteIcon);

    if (todo.completed) {
      li.classList.add('completed');
    }

    li.appendChild(completionIcon);
    li.appendChild(description);
    li.appendChild(actionIcon);
    this.wrapper.appendChild(li);
  }

  addNewItem(description) {
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

    // show on the page
    this.addToPage(newTodo);
  }

  refreshTodosOnPage() {
    this.updateStorage();
    this.removeAllFromPage();
    this.addAllToPage();
  }

  removeItem(element) {
    const todoId = Number(element.id.match(/\d+$/));
    this.todos = this.todos.filter((todo) => todo.index !== todoId);
    this.todos = this.sortList();
    this.refreshTodosOnPage();
  }

  removeAllCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.todos = this.sortList();
    this.refreshTodosOnPage();
  }

  toggleCompleteStatus(element) {
    element.classList.toggle('completed');

    const todoIndex = Number(element.id.match(/\d+$/));
    this.todos[todoIndex].completed = element.classList.contains('completed');
    this.updateStorage();
  }
}
