/**
 * @jest-environment jsdom
 */

import {
  initializeApp,
  addNewTodo,
} from './dom-utils.js';

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

  test('Mark and unmark a todo as completed', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todoTitle = 'first todo!';
    initializeApp(wrapper);
    addNewTodo(todoTitle);

    const addedTodoElement = document.getElementById('todo-0');
    const completionIcon = document.querySelector('#todo-0 .completionIcon');
    const comletedStatusBeforeClick = addedTodoElement.classList.contains('completed');

    // Act
    completionIcon.click();
    const comletedStatusAfterClick = addedTodoElement.classList.contains('completed');
    completionIcon.click();
    const comletedStatusAfterSecondClick = addedTodoElement.classList.contains('completed');

    // Assert
    expect(comletedStatusBeforeClick).toBe(false);
    expect(comletedStatusAfterClick).toBe(true);
    expect(comletedStatusAfterSecondClick).toBe(false);
  });
});
