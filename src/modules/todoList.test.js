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
    const todoDescription = 'new todo';

    todoList.addNewTodo(todoDescription);
    const todoIsRemoved = todoList.removeTodo(0);

    expect(todoIsRemoved).toBe(true);
    expect(todoList.todos.length).toBe(0);
  });

  test('Add 3 todos and remove the second one', () => {
    const todoList = new TodoList();
    todoList.init();
    const descriptions = ['one', 'two', 'three'];

    descriptions.forEach((description) => {
      todoList.addNewTodo(description);
    });

    todoList.removeTodo(1);

    expect(todoList.todos[0].description).toBe('one');
    expect(todoList.todos[1].description).toBe('three');
  });

  test('Mark a todo as completed', () => {
    const todoList = new TodoList();
    todoList.init();
    todoList.addNewTodo('new todo');

    todoList.setCompleted(0, true);
    const markCompleted = todoList.todos[0].completed;
    todoList.setCompleted(0, false);
    const markNotCompleted = todoList.todos[0].completed;

    expect(markCompleted).toBe(true);
    expect(markNotCompleted).toBe(false);
  });

  test('Update todo description', () => {
    const todoList = new TodoList();
    todoList.init();
    todoList.addNewTodo('new todo');
    const newDescription = 'edited';

    todoList.setDescription(0, newDescription);
    const editedDescription = todoList.todos[0].description;

    expect(editedDescription).toBe(newDescription);
  });
});