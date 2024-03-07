import { Task } from "./types/types";

export const taskManager = (() => {
  let tasks: Task[] = [];

  const getTasks = () => tasks;

  const addTask = (task: Task) => {
    tasks = [...tasks, task]; // Create a new array with the new task added
  };

  const deleteTask = (id: number) => {
    tasks = tasks.filter((task) => task.id !== id);
  };

  const updateTask = (id: number, task: Task) => {
    tasks = tasks.map((t) => {
      if (t.id === id) {
        return task;
      }
      return t;
    });
  };

  return {
    getTasks,
    addTask,
    deleteTask,
    updateTask,
  };
})();

export const createTask = (
  id: number,
  title: string,
  description: string,
  dueDate: Date
) => {
  return {
    id,
    title,
    description,
    dueDate,
    completed: false,
  };
};
