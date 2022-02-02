import React, {FC} from "react";
import {deleteTodo, updateCompletedTodo, updateTextTodo} from "../../Redux/todoSlice";
import {ITodo} from "../../intefaces";
import {useDispatch} from "react-redux";

interface ITodoList {
    todos: ITodo[]
}

export const TodoList: FC<ITodoList> = ({todos}) => {
    const dispatch = useDispatch();

    return (
        <div className="todos-list">
            {todos.length ? todos.map((elem) =>
                <div key={elem.id}>
                    <input type="checkbox" checked={elem.completed}
                           onChange={checked => dispatch(updateCompletedTodo({
                               id: elem.id,
                               completed: checked.target.checked
                           }))}/>
                    <input value={elem.text} disabled={elem.completed}
                           onChange={e => dispatch(updateTextTodo({id: elem.id, text: e.target.value}))}/>
                    <button onClick={() => dispatch(deleteTodo(elem.id))}>X</button>
                </div>
            ) : <p>No todos</p>}
        </div>
    );
};