import "./App.css";
import CreateTask from "./components/CreateTask";
import TaskRender from "./components/TaskRender";
import { taskManager } from "./taskHandler";
import { Task } from "./types/types";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState<Task[]>(taskManager.getTasks());

  return (
    <>
      <CreateTask setTasks={setTasks} />
      <h1>Tasks</h1>
      <TaskRender tasks={tasks} setTasks={setTasks} />
    </>
  );
}

export default App;
