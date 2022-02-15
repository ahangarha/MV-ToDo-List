import TodoList from './modules/todoList.js';
import('./style.css');

const todoListWrapper = document.getElementById('todo-list');

const todos = [
  {
    index: 2,
    description: 'finish this task',
    completed: false,
  },
  {
    index: 1,
    description: 'Implement completed style',
    completed: true,
  },
];

const todoList = new TodoList(todoListWrapper, todos);
