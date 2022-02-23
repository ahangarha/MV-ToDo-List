/**
 * @jest-environment jsdom
 */

import TodoList from './todoList.js';

describe('Test - Part 1', () => {
  test('add new todo', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todoList = new TodoList(wrapper);
    const todoTitle = 'first todo!';

    // Act
    todoList.addNewItem(todoTitle);

    // Assert
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

describe('Test Part 2', () => {
  test('test edit Task', () => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todoList = new TodoList(wrapper);
    todoList.addNewItem("New todo");
    const todoElement = document.getElementById('todo-0');
    const input = document.querySelector('#todo-0 input');

    // Act
    input.focus();
    input.value = "edited";
    input.blur();

    // Assert
    expect(todoList.todos[0].description).toBe('edited');
  });
  
  test('test completed task',() => {
    // Arrange
    document.body.innerHTML = '<ul id="todo-list"></ul>';
    const wrapper = document.getElementById('todo-list');
    const todoList = new TodoList(wrapper);
    todoList.addNewItem("New todo");
    const todoElement = document.querySelector('#todo-0');
    const button = document.querySelector('#todo-0 .completionIcon');
    const todos = todoList.todos;

    // Act
    button.click();

    // Assert
    expect(todoElement.classList).toContain('completed');
    expect(todos[0].completed).toBe(true);
  });
});
