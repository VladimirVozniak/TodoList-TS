import React, {FC, useState} from "react";
import {checkAllTodos, deleteTodo, updateCompletedTodo, updateTextTodo} from "../../Redux/todoSlice";
import {ITodo} from "../../intefaces";
import {useDispatch} from "react-redux";
import "./style.css";

interface ITodoList {
    todos: ITodo[]
}

// todos.length === todos.filter(elem => elem.completed).length

export const TodoList: FC<ITodoList> = ({todos}) => {
    // let [checkAll, setCheckAll] = useState<boolean>(false);
    let checkAlll: boolean = todos.filter(elem => elem.completed).length === todos.length;
    const dispatch = useDispatch();
    console.log(checkAlll);

    const numberOfChecked = (): boolean => {
        const checkedTodos = todos.filter(elem => elem.completed).length;
        return checkedTodos === 0 || checkedTodos === todos.length;
    };

    const checkAllTodo = (checkAll: boolean): void => {
        dispatch(checkAllTodos(checkAll));
        checkAlll = checkAll;
    };

    return (
        <>
            {todos.length ?
                <div className="todos-list">
                    {todos.length && todos.map((elem) =>
                        <div className="todo-container" key={elem.id}>
                            <input type="checkbox" checked={elem.completed}
                                   onChange={checked => dispatch(updateCompletedTodo({
                                       id: elem.id,
                                       completed: checked.target.checked
                                   }))}/>
                            <input value={elem.text} disabled={elem.completed}
                                   onChange={e => dispatch(updateTextTodo({id: elem.id, text: e.target.value}))}/>
                            <button onClick={() => dispatch(deleteTodo(elem.id))}>X</button>
                        </div>
                    )}
                    <label className="checkAll">
                        <input type="checkbox" checked={checkAlll}
                               onChange={e => checkAllTodo(e.target.checked)}/>
                        <div className={`someCheck ${numberOfChecked() ? "someCheckOff" : ""}`}/>
                        Check all
                    </label>
                </div>
                :
                <p>No todos</p>
            }
        </>
    );
};