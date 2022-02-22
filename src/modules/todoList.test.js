/**
 * @jest-environment jsdom
 */

import TodoList from './todoList.js';

describe('Test - Part 1', () => {
  test('add new todo', () => {
    //Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todoList = new TodoList(wrapper);
    const todoTitle = 'first todo!';

    // Act
    todoList.addNewItem(todoTitle);

    //Assert
    expect(todoList.todos.length).toBe(1);
    expect(wrapper.innerHTML).not.toBe('');
  });

  test('remove todo', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todoList = new TodoList(wrapper);
    const todoElement = document.getElementById('todo-0');

    // Act
    todoList.removeItem(todoElement);

    // Assert
    expect(todoList.todos.length).toBe(0);
    expect(wrapper.innerHTML).toBe('');
  });
});
