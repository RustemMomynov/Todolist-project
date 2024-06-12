import React, {ChangeEvent, useRef, useState} from 'react';
import {FilterValuesType} from "../App";
import Button from "../button/Button";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string) => void
    addTask: (titleValue: string) => void
    changeTaskStatus: (taskId: string, checked: boolean) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({changeFilter, title, tasks, removeTask, addTask, changeTaskStatus}: TodolistPropsType) => {

    const [titleValue, setTitleValue] = useState('')

    const removeTaskHandler = (taskId: string) => removeTask(taskId)

    const addTaskHandler = () => {
        addTask(titleValue)
        setTitleValue('')
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        changeTaskStatus(taskId, e.currentTarget.checked)
    }

    const onClickFilterHandler = (newFilterValue: FilterValuesType) => changeFilter(newFilterValue)

    // const taskInputRef = useRef<HTMLInputElement>(null)

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
        ? tasks.map(task => {

            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={(e) => changeTaskStatusHandler(e, task.id)}/>
                    <span>{task.title}</span>
                    <Button title={'x'} onClickHandler={() => removeTaskHandler(task.id)}></Button>
                </li>
            );
        })
        : <span>Tasks not found</span>

    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div>
                <input value={titleValue} onChange={(e) =>
                    setTitleValue(e.currentTarget.value)}/>
                <Button title={'+'} onClickHandler={addTaskHandler} disabled={!Boolean(titleValue)}/>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button title={'All'} onClickHandler={() => onClickFilterHandler('all')}/>
                <Button title={'Active'} onClickHandler={() => onClickFilterHandler('active')}/>
                <Button title={'Completed'} onClickHandler={() => onClickFilterHandler('completed')}/>
            </div>
        </div>
    );
};