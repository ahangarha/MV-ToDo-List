export default class TodoList {
  constructor(wrapper, todos = []) {
    this.wrapper = wrapper;
    this.todos = todos;
    this.init();
  }

  init() {
    this.todos = this.sortList();
    this.todos.forEach((todo) => {
      this.addTodo(todo);
    });
  }

  sortList() {
    const sortedTodos = this.todos.sort((a, b) => a.index - b.index);
    return sortedTodos;
  }

  addTodo(todo) {
    const li = document.createElement('li');
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
}
