import TodoList from './todoList.js';

const todoList = new TodoList();
let wrapper = null;

const activateEditingTodo = (descriptionElement, event) => {
  event.preventDefault();
  descriptionElement.readOnly = false;
  descriptionElement.parentElement.classList.add('active');
};

const getIdOfElement = (element) => Number(element.id.match(/\d+$/));

const deactivateEditingTodo = (descriptionElement, event) => {
  descriptionElement.readOnly = true;
  const newDescription = event.target.value;
  const index = Number(getIdOfElement(event.target.parentElement));
  todoList.setDescription(index, newDescription);
  descriptionElement.parentElement.classList.remove('active');
};

const toggleCompleteStatus = (element) => {
  element.classList.toggle('completed');
  return element.classList.contains('completed');
};

const setTodosId = () => {
  wrapper.childNodes.forEach((todo, index) => {
    todo.id = `todo-${index}`;
  });
};

const removeTodoElement = (element) => {
  todoList.removeTodo(getIdOfElement(element));
  element.remove();
  setTodosId();
};

const generateHTMLTodo = ({ index, description, completed }) => {
  const li = document.createElement('li');
  li.classList.add('todo');
  li.setAttribute('id', 'todo-'.concat(index));

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
    todoList.setCompleted(getIdOfElement(li), toggleCompleteStatus(li));
  });

  const descriptionElement = document.createElement('input');
  descriptionElement.setAttribute('type', 'text');
  descriptionElement.setAttribute('name', 'description');
  descriptionElement.readOnly = true;
  descriptionElement.setAttribute('value', description);
  descriptionElement.classList.add('description');

  descriptionElement.addEventListener('dblclick', (event) => {
    activateEditingTodo(descriptionElement, event);
  });

  descriptionElement.addEventListener('keypress', (event) => {
    if ((event.code === 'Space' || event.code === 'Enter') && !li.classList.contains('active')) {
      activateEditingTodo(descriptionElement, event);
    } else if (event.code === 'Enter' && li.classList.contains('active')) {
      deactivateEditingTodo(descriptionElement, event);
    }
  });

  descriptionElement.addEventListener('focusout', (event) => {
    deactivateEditingTodo(descriptionElement, event);
  });

  const deleteIcon = document.createElement('button');
  deleteIcon.setAttribute('type', 'button');
  deleteIcon.classList.add('deleteIcon');
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
  deleteIcon.addEventListener('click', () => removeTodoElement(li));

  if (completed) {
    li.classList.add('completed');
  }

  li.appendChild(completionIcon);
  li.appendChild(descriptionElement);
  li.appendChild(deleteIcon);

  return li;
};

const generateHTMLTodos = (todos) => {
  const todoElements = [];

  todos.forEach((todo) => {
    todoElements.push(generateHTMLTodo(todo));
  });

  return todoElements;
};

const addAllToPage = (todos, wrapper) => {
  const todoElements = generateHTMLTodos(todos);
  todoElements.forEach((element) => wrapper.appendChild(element));
};

const addTodoToPage = (newTodoElement) => {
  wrapper.appendChild(newTodoElement);
};

const saveNewTodo = (description) => todoList.addNewTodo(description);

export const addNewTodo = (description) => {
  addTodoToPage(generateHTMLTodo(saveNewTodo(description)));
};

export const removeAllCompleted = () => {
  todoList.removeAllCompleted();
  const completedElements = wrapper.querySelectorAll('li.completed');
  completedElements.forEach((el) => el.remove());
};

export const initializeApp = (htmlWrapper) => {
  wrapper = htmlWrapper;
  const todos = todoList.init();
  addAllToPage(todos, wrapper);
};