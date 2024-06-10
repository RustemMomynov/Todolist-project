import { FC, useRef } from "react";

export interface TodolistProps {
  title: string;
  tasks: TaskType[];
  removeTask: (taskId: string) => void;
  addTask: (title: string) => void;
}

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

const Todolist: FC<TodolistProps> = (props) => {
  const taskInputRef = useRef<HTMLInputElement>(null);

  const tasksElements = props.tasks.map((task) => {
    return (
      <li>
        <input type="checkbox" checked={task.isDone} />
        <span>{task.title}</span>
        <button
          onClick={() => {
            props.removeTask(task.id);
          }}
        >
          x
        </button>
      </li>
    );
  });

  const addTaskHandler = () => {
    if (taskInputRef.current) {
      if (taskInputRef.current.value.length < 15) {
        props.addTask(taskInputRef.current?.value);
      }

      taskInputRef.current.value = "";
    }
  };

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input ref={taskInputRef} />
        <button onClick={addTaskHandler}>+</button>
      </div>
      <ul>{tasksElements}</ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  );
};

export default Todolist;
