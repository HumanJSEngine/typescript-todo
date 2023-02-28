import React, { useState } from 'react';
import App from './App';
import produce from 'immer';

export type TodoType = {
    uid: string;
    title: string;
    body: string;
    done: boolean;
    sticker: string;
    date: string;
};
const AppContainer = () => {
    // 상태데이터

    const initData: Array<TodoType> = [
        {
            uid: '1',
            title: '할일 1',
            body: '할일 내용 1',
            done: false,
            sticker: '1',
            date: '2023-02-27',
        },
        {
            uid: '2',
            title: '할일 2',
            body: '할일 내용 2',
            done: false,
            sticker: '2',
            date: '2023-02-27',
        },
        {
            uid: '3',
            title: '할일 3',
            body: '할일 내용 3',
            done: false,
            sticker: '3',
            date: '2023-02-27',
        },
        {
            uid: '4',
            title: '할일 4',
            body: '할일 내용 4',
            done: false,
            sticker: '3',
            date: '2023-02-27',
        },
    ];

    const [todoList, setTodoList] = useState<Array<TodoType>>(initData);

    // 추가기능
    const addTodo = (
        uid: string,
        title: string,
        body: string,
        date: string,
        sticker: string,
        done: boolean
    ) => {
        let newTodoList = produce(todoList, (draft) => {
            draft.push({
                uid: uid,
                title: title,
                body: body,
                date: date,
                sticker: sticker,
                done: false,
            });
        });
        // state 업데이트 : 화면 갱신
        setTodoList(newTodoList);
    };

    const updateTodo = (todo: TodoType) => {};

    const deleteTodo = (todo: TodoType) => {};

    const sortTodo = (sortType: string) => {};

    return (
        <App
            todoList={todoList}
            addTodo={addTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            sortTodo={sortTodo}
        />
    );
};

export default AppContainer;
