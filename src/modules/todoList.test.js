import TodoList from './todoList.js';

describe('Test TodoList class', () => {
  test('add new todo', () => {
    const todoList = new TodoList();
    todoList.init();
    const todoDescription = 'new todo';

    todoList.addNewTodo(todoDescription);

    expect(todoList.todos[0].description).toBe(todoDescription);
  });
});