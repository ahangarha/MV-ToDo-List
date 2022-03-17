/**
 * @jest-environment jsdom
 */

import {
  initializeApp,
  addNewTodo,
} from './modules/dom-utils.js';

describe('Add and remove todos', () => {
  test('add new todo', () => {
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todosOnPage = wrapper.childNodes;
    // Arrange
    const todoTitle = 'first todo!';

    // Act
    initializeApp(wrapper);
    addNewTodo(todoTitle);

    // Assert
    expect(todosOnPage.length).toBe(1);
  });

  test('click on delete button and remove todo', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todosOnPage = wrapper.childNodes;
    initializeApp(wrapper);
    const todoElement = document.getElementById('todo-0');
    const delBtn = todoElement.querySelector('.deleteIcon');

    // Act
    delBtn.click();
    // Assert
    expect(todosOnPage.length).toBe(0);
  });
});
