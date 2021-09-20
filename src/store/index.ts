import { makeAutoObservable } from "mobx";

export type ToDoType = {
  todo: string;
  id: string;
  isComplete: boolean;
};

class ToDoListStore {
  todos: ToDoType[] = [];
  filtredTodos: ToDoType[] = [];
  filter: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  addToDo(todo: ToDoType) {
    this.filter = "all";
    this.todos.push(todo);
  }

  removeToDo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  completedToDo(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
  }

  allTasks() {
    this.filter = "all";
  }

  filtredCompleted() {
    this.filtredTodos = this.todos.filter((todo) => todo.isComplete);
    this.filter = "completed";
  }

  feltredUncompleted() {
    this.filtredTodos = this.todos.filter((todo) => !todo.isComplete);
    this.filter = "uncompleted";
  }

  removeAll() {
    this.todos = [];
  }
}

export default new ToDoListStore();
