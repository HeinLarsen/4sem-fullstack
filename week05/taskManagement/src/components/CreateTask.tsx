import { createTask } from "../taskHandler";
import { taskManager } from "../taskHandler";
import { Task } from "../types/types";
import { useState } from "react";

function CreateTask({
  setTasks,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = taskManager.getTasks().length + 1;
    const task = createTask(id, title, description, new Date(dueDate));
    taskManager.addTask(task);
    setTasks(taskManager.getTasks());
  };

  return (
    <>
      <h1>Create Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </>
  );
}

export default CreateTask;
