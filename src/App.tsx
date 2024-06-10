import { useState } from "react";
import "./App.css";
import Todolist, { TaskType } from "./layout/todolist/Todolist";
import { v1 } from "uuid";

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS/TS", isDone: false },
    { id: v1(), title: "REACT", isDone: false },
  ]);

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
