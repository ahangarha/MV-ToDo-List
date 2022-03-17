import {
  initializeApp,
  addNewTodo,
  removeAllCompleted,
} from './modules/dom-utils.js';

import('./style.css');

const todoListWrapper = document.getElementById('todo-list');

initializeApp(todoListWrapper);

const form = document.getElementById('todo-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addNewTodo(form.description.value);
  form.description.value = '';
});

const clearAllCompletedBtn = document.getElementById('clear-all');
clearAllCompletedBtn.addEventListener('click', () => {
  removeAllCompleted();
});
