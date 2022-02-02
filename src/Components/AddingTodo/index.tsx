import {addTodo} from "../../Redux/todoSlice";
import React, {FC} from "react";
import {useDispatch} from "react-redux";

interface IAddingTodo {
    inputTodo: string,
    changeInput: (e: string) => void,
    resetInput: () => void
}

export const AddingTodo: FC<IAddingTodo> = ({inputTodo, changeInput, resetInput}) => {
    const dispatch = useDispatch();

    return (
        <div className="adding-todo">
            <input value={inputTodo} onChange={e => changeInput(e.target.value)}/>
            <button onClick={() => {
                if (inputTodo !== "") {
                    dispatch(addTodo(inputTodo));
                    resetInput();
                }
            }}>Add
            </button>
        </div>
    );
};