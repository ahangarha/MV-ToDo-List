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

    this.todos.forEach((todo) => {
      this.addToPage(todo);
    });
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

  addToPage(todo) {
    const li = document.createElement('li');
    li.classList.add('todo');

    const label = document.createElement('label');
    const chkbox = document.createElement('input');

    chkbox.setAttribute('type', 'checkbox');

    if (todo.completed) {
      chkbox.setAttribute('checked', 'checked');
      label.classList.add('checked');
    }

    label.appendChild(chkbox);
    label.innerHTML += todo.description;

    const dragBtn = document.createElement('button');
    dragBtn.setAttribute('type', 'button');
    dragBtn.innerHTML = `
    <button type="button">
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
    </button>`;

    li.appendChild(label);
    li.appendChild(dragBtn);
    this.wrapper.appendChild(li);
  }

  addNewItem(description) {
    const id = this.todos.length;
    const completed = false;

    const newTodo = {
      id,
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
}
