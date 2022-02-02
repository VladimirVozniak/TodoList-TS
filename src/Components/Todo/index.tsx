import React, {FC, useState} from "react";
import "./style.css";
import {useSelector} from "react-redux";
import {selectTodos} from "../../Redux/todoSlice";
import {AddingTodo} from "../AddingTodo";
import {TodoList} from "../TodoList";

export const Todo: FC = () => {
    const [inputTodo, setInputTodo] = useState<string>("");
    const todos = useSelector(selectTodos);

    const changeInput = (e: string) => {
        setInputTodo(e);
    };

    return (
        <div className="todos-container">
            <AddingTodo inputTodo={inputTodo} changeInput={(newText: string) => changeInput(newText)}
                        resetInput={() => changeInput("")}/>
            <TodoList todos={todos}/>
        </div>
    );
};