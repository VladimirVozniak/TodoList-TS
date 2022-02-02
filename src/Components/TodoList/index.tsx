import React, {FC, useState} from "react";
import {checkAllTodos, deleteTodo, updateCompletedTodo, updateTextTodo} from "../../Redux/todoSlice";
import {ITodo} from "../../intefaces";
import {useDispatch} from "react-redux";
import "./style.css";

interface ITodoList {
    todos: ITodo[]
}

export const TodoList: FC<ITodoList> = ({todos}) => {
    // const [checkAll, setCheckAll] = useState<boolean>(false);
    let checkAll: boolean = todos.filter(elem => elem.completed).length === todos.length;
    const dispatch = useDispatch();
    console.log(checkAll);

    const numberOfChecked = (): boolean => {
        const checkedTodos = todos.filter(elem => elem.completed).length;
        return checkedTodos === 0 || checkedTodos === todos.length;
    };

    const checkAllTodo = (checked: boolean): void => {
        dispatch(checkAllTodos(checked));
        checkAll = checked;
    };

    return (
        <>
            {todos.length ?
                <div className="todos-list">
                    <label className="checkAll">
                        <input type="checkbox" checked={checkAll}
                               onChange={e => checkAllTodo(e.target.checked)}/>
                        <div className={`someCheck ${numberOfChecked() ? "someCheckOff" : ""}`}/>
                        Check all
                    </label>
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
                </div>
                :
                <p>No todos</p>
            }
        </>
    );
};