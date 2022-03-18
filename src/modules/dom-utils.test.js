/**
 * @jest-environment jsdom
 */

import {
  initializeApp,
  addNewTodo,
  removeAllCompleted,
} from './dom-utils.js';

const deleteAllTodos = () => {
  const deleteIcons = document.querySelectorAll('.deleteIcon');
  deleteIcons.forEach((icon) => icon.click());
};

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

    deleteAllTodos();
  });

  test('click on delete button and remove todo', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todosOnPage = wrapper.childNodes;
    initializeApp(wrapper);
    addNewTodo('first todo!');
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
    completionIcon.click();

    // reload the todos to make sure the new title is stored
    wrapper.innerHTML = '';
    initializeApp(wrapper);
    const reloadedTodoElement = document.getElementById('todo-0');
    const comletionsStatusAfterReload = reloadedTodoElement.classList.contains('completed');

    // Assert
    expect(comletedStatusBeforeClick).toBe(false);
    expect(comletedStatusAfterClick).toBe(true);
    expect(comletedStatusAfterSecondClick).toBe(false);
    expect(comletionsStatusAfterReload).toBe(true);

    deleteAllTodos();
  });

  test('Remove all completed', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    initializeApp(wrapper);

    addNewTodo('first todo');
    addNewTodo('second todo');
    addNewTodo('third todo');

    const completionIcons = document.querySelectorAll('.completionIcon');

    // Act
    completionIcons[0].click();
    completionIcons[2].click();
    removeAllCompleted();
    const remainingTodosCount = wrapper.children.length;
    const remainingTodoTitle = document.querySelector('#todo-0 .description').value;

    // Assert
    expect(remainingTodosCount).toBe(1);
    expect(remainingTodoTitle).toBe('second todo');

    deleteAllTodos();
  });

  test('Delete existing todo', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    initializeApp(wrapper);
    addNewTodo('new todo');

    const deleteIcon = document.querySelector('#todo-0 .deleteIcon');

    // Act
    const wrapperHasContentBeforeClick = !!wrapper.innerHTML.length;
    deleteIcon.click();
    const wrapperHasContentAfterClick = !!wrapper.innerHTML.length;

    // Assert
    expect(wrapperHasContentBeforeClick).toBe(true);
    expect(wrapperHasContentAfterClick).toBe(false);
  });

  test('Delete todo in a list of todos and update ids', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    initializeApp(wrapper);
    const firstDescription = 'first todo!';
    const secondDescription = 'second todo!';
    addNewTodo(firstDescription);
    addNewTodo(secondDescription);

    const firstTodoDesctiotion = document.querySelector('#todo-0 .description').value;
    const firstTodoDeleteIcon = document.querySelector('#todo-0 .deleteIcon');

    // Act
    firstTodoDeleteIcon.click();
    const newFirstTodoDesctiotion = document.querySelector('#todo-0 .description').value;

    // Assert
    expect(firstTodoDesctiotion).toBe(firstDescription);
    expect(newFirstTodoDesctiotion).toBe(secondDescription);

    deleteAllTodos();
  });

  test('Activate editing by double click', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    initializeApp(wrapper);
    const title = 'first todo!';
    addNewTodo(title);
    const todoElement = document.getElementById('todo-0');
    const todoText = document.querySelector('#todo-0 .description');

    const dblClick = new Event('dblclick');

    // Act
    const isActiveBefore = todoElement.classList.contains('active');
    todoText.dispatchEvent(dblClick);
    const isActiveAfter = todoElement.classList.contains('active');

    // Assert
    expect(isActiveBefore).toBe(false);
    expect(isActiveAfter).toBe(true);

    deleteAllTodos();
  });

  test('Deactivate editing and save new title by focusing out', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    initializeApp(wrapper);
    const title = 'first todo!';
    addNewTodo(title);
    const todoText = document.querySelector('#todo-0 .description');

    const dblClick = new Event('dblclick');
    const focusOut = new Event('focusout');
    const newTitle = 'edited todo';

    // Act
    todoText.dispatchEvent(dblClick);
    todoText.value = newTitle;
    todoText.dispatchEvent(focusOut);

    // reload the todos to make sure the new title is stored
    wrapper.innerHTML = '';
    initializeApp(wrapper);
    const newTodoText = document.querySelector('#todo-0 .description');

    // Assert
    expect(newTodoText.value).toBe(newTitle);

    deleteAllTodos();
  });
});
