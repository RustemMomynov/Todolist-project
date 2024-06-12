import React, { useState } from "react";
import "./App.css";
import { TaskPropsType, Todolist } from "./todolist/Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  const todolistTitle_1 = "What to buy";

  const [tasksList, setTasksList] = useState<TaskPropsType[]>([
    { id: v1(), title: "Front-end", isDone: true },
    { id: v1(), title: "English", isDone: true },
    { id: v1(), title: "Back-end", isDone: false },
  ]);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const removeTask = (id: string) => {
    let filteredTasks = tasksList.filter((t) => t.id !== id);
    setTasksList(filteredTasks);
  };

  const addTask = (title: string) => {
    const newTask = { id: v1(), title, isDone: false };
    setTasksList([newTask, ...tasksList]);
  };

  const changeTaskStatus = (taskId: string, checked: boolean) => {
    const newStatus = tasksList.map((task) => {
      return task.id === taskId ? { ...task, isDone: checked } : task;
    });
    setTasksList(newStatus);
  };

  let filteredTasksForTodolist: TaskPropsType[] = tasksList;

  if (filter === "active") {
    filteredTasksForTodolist = tasksList.filter((t) => !t.isDone);
  }
  if (filter === "completed") {
    filteredTasksForTodolist = tasksList.filter((t) => t.isDone);
  }

  const changeFilter = (newFilterValue: FilterValuesType) => {
    setFilter(newFilterValue);
  };

  return (
    <div className="App">
      <Todolist
        title={todolistTitle_1}
        tasks={filteredTasksForTodolist}
        removeTask={removeTask}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        changeFilter={changeFilter}
        filter={filter}
      />
    </div>
  );
}

export default App;
