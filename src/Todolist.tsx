import React, { ChangeEvent, useState, KeyboardEvent, useRef } from "react";
import { FilterValuesType } from "./App";
import { Button } from "./Button";

type TodolistPropsType = {
  todolistId: string;
  title: string;
  filter: FilterValuesType;
  tasks: TaskType[];
  removeTask: (tasksId: string, todolistId: string) => void;
  changeFilter: (newFilter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  removeTodolist: (todolistId: string) => void;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const Todolist = ({
  title,
  tasks,
  removeTask,
  changeFilter,
  addTask,
  changeTaskStatus,
  filter,
  removeTodolist,
  todolistId,
}: TodolistPropsType) => {
  const [taskTitle, SetTaskTitle] = useState("");
  const [taskInputError, setTaskInputError] = useState<string | null>(
    "нет задачи"
  );

  const tasksElement: Array<JSX.Element> | JSX.Element =
    tasks.length !== 0 ? (
      tasks.map((task) => {
        return (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={(e) =>
                changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
              }
            />
            <span className={task.isDone ? "task-complete" : "task"}>
              {task.title}
            </span>
            <Button
              onClickHandler={() => removeTask(task.id, todolistId)}
              title={"x"}
            />
          </li>
        );
      })
    ) : (
      <span>нет тасок</span>
    );

  const addTaskHandler = () => {
    const trimmedTitle = taskTitle.trim();
    if (trimmedTitle) {
      addTask(taskTitle, todolistId);
    } else {
      setTaskInputError("Title is requied");
    }

    SetTaskTitle("");
  };

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    tasksElement && setTaskInputError(null);
    SetTaskTitle(e.currentTarget.value);
  };

  const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  return (
    <div className="todolist">
      <Button
        title={"Del Todo"}
        onClickHandler={() => removeTodolist(todolistId)}
      />
      <h3>{title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={changeTaskTitleHandler}
          onKeyDown={keyDownAddTaskHandler}
          className={taskInputError ? "taskInputError" : ""}
        />
        <Button
          onClickHandler={addTaskHandler}
          title={"+"}
          disabled={!Boolean(taskTitle.trim())}
        />
        {taskTitle.length > 15 && <div>Много символов</div>}
      </div>
      <ul>{tasksElement}</ul>
      <div>
        <Button
          className={filter === "all" ? "button-active" : ""}
          onClickHandler={() => changeFilter("all", todolistId)}
          title={"All"}
        />
        <Button
          className={filter === "active" ? "button-active" : ""}
          onClickHandler={() => changeFilter("active", todolistId)}
          title={"Active"}
        />
        <Button
          className={filter === "completed" ? "button-active" : ""}
          onClickHandler={() => changeFilter("completed", todolistId)}
          title={"Completed"}
        />
      </div>
    </div>
  );
};
