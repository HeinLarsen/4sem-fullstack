import React, { useState } from "react";
import { Task } from "../types/types";
import { taskManager } from "../taskHandler";

function TaskRender({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [sortBy, setSortBy] = useState<string>("dueDate"); // Default sort by due date
  const [filterByCompleted, setFilterByCompleted] = useState<boolean>(false);

  const sortTasks = (tasks: Task[]): Task[] => {
    if (sortBy === "dueDate") {
      return tasks
        .slice()
        .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    } else if (sortBy === "completed") {
      return tasks.slice().sort((a, b) => (a.completed ? 1 : -1));
    } else {
      return tasks; // No sorting needed
    }
  };

  const filterTasks = (tasks: Task[]): Task[] => {
    return tasks.filter(
      (task) => !filterByCompleted || task.completed === filterByCompleted
    );
  };

  const sortedAndFilteredTasks = filterTasks(sortTasks(tasks));

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th onClick={() => setSortBy("dueDate")}>Due Date</th>
          <th onClick={() => setSortBy("completed")}>Completed</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {sortedAndFilteredTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate.toDateString()}</td>
            <td>
              <input type="checkbox" checked={task.completed} disabled />
            </td>
            <td>
              <button
                onClick={() => {
                  const newTitle = prompt("Enter new title", task.title);
                  const newDueDate = prompt(
                    "Enter new due date",
                    task.dueDate.toISOString().split("T")[0]
                  );
                  const newCompleted = confirm("Is task completed?");
                  if (newTitle !== null && newDueDate !== null) {
                    taskManager.updateTask(task.id, {
                      ...task,
                      title: newTitle,
                      dueDate: new Date(newDueDate),
                      completed: newCompleted,
                    });
                    setTasks(taskManager.getTasks());
                  }
                }}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  taskManager.deleteTask(task.id);
                  setTasks(taskManager.getTasks());
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TaskRender;
