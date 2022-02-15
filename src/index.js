import TodoList from './modules/todoList.js';

import('./style.css');

const todoListWrapper = document.getElementById('todo-list');

const todoList = new TodoList(todoListWrapper);

const form = document.getElementById('todo-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  todoList.addNewItem(form['todo-title'].value);
  form['todo-title'].value = '';
});
