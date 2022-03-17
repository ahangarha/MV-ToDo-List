import TodoList from './todoList.js';

describe('Test TodoList class', () => {
  test('add new todo', () => {
    const todoList = new TodoList();
    todoList.init();
    const todoDescription = 'new todo';

    todoList.addNewTodo(todoDescription);

    expect(todoList.todos[0].description).toBe(todoDescription);
  });

  test('remove the added todo', () => {
    const todoList = new TodoList();
    todoList.init();

    const todoIsRemoved = todoList.removeTodo(0);

    expect(todoIsRemoved).toBe(true);
    expect(todoList.todos.length).toBe(0);
  });
});