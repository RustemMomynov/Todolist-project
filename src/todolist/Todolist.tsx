import React, {KeyboardEvent ,ChangeEvent, useState} from 'react';
import {FilterValuesType} from "../App";
import Button from "../button/Button";


type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string) => void
    addTask: (titleValue: string) => void
    changeTaskStatus: (taskId: string, checked: boolean) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    filter: FilterValuesType
}

export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({changeFilter, title, tasks, removeTask, addTask, changeTaskStatus, filter}: TodolistPropsType) => {

    const [titleInputValue, setTitleInputValue] = useState('')

    const [taskInputError, setTaskInputError] = useState<string | null>(null)

    const addTaskHandler = () => {
        const trimmedTitle = titleInputValue.trim()
        if (trimmedTitle) {
            addTask(titleInputValue)
        } else {
            setTaskInputError('Title is required!')
        }
        setTitleInputValue('')
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        taskInputError && setTaskInputError(null)
        setTitleInputValue(e.currentTarget.value)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        changeTaskStatus(taskId, e.currentTarget.checked)
    }

    const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()

    const setAllTasksHandler = () => changeFilter('all')

    const setActiveTasksHandler = () => changeFilter('active')

    const setCompletedTasksHandler = () => changeFilter('completed')

    const isAddTaskButtonDisabled = !titleInputValue || titleInputValue.length > 15

    const userTaskTitleLengthWarning =  titleInputValue.length > 15 && <div>Recommended task title length must be not more then 15 symbols</div>

    const userTaskEmptyTitleError =  taskInputError && <div style={{color: 'red'}}>{taskInputError}</div>

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length !== 0
        ? tasks.map(task => {

            const removeTaskHandler = () => removeTask(task.id)

            return (
                <li key={task.id}>
                    <input type="checkbox"
                           checked={task.isDone}
                           onChange={(e) => changeTaskStatusHandler(e, task.id)}/>
                    <span className={task.isDone ? 'completedTask' : ''}>{task.title}</span>
                    <Button title={'x'} onClickHandler={removeTaskHandler}></Button>
                </li>
            );
        })
        : <span>Tasks not found</span>

    return (
        <div className={'todolist'}>
            <h3>{title}</h3>
            <div>
                <input value={titleInputValue} onChange={changeTaskTitleHandler} onKeyDown={keyDownAddTaskHandler} className={taskInputError ? 'taskInputError' : ''}/>
                <Button title={'+'} onClickHandler={addTaskHandler} disabled={isAddTaskButtonDisabled}/>
                {userTaskTitleLengthWarning}
                {userTaskEmptyTitleError}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <Button classes={filter === 'all' ? 'activeFilter' : ''} title={'All'} onClickHandler={setAllTasksHandler}/>
                <Button classes={filter === 'active' ? 'activeFilter' : ''} title={'Active'} onClickHandler={setActiveTasksHandler}/>
                <Button classes={filter === 'completed' ? 'activeFilter' : ''} title={'Completed'} onClickHandler={setCompletedTasksHandler}/>
            </div>
        </div>
    );
};