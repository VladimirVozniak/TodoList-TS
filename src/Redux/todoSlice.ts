import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {ITodo} from "../intefaces";

interface todoSliceState {
    todos: ITodo[]
}

const initialState: todoSliceState = {
    todos: []
};

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos = [
                ...state.todos,
                {
                    id: Date.now(),
                    text: action.payload,
                    completed: false
                }
            ];
        },
        updateTextTodo(state, action: PayloadAction<{ id: number, text: string }>) {
            state.todos = state.todos.map(elem => elem.id === action.payload.id ? {
                ...elem, text: action.payload.text
            } : elem);
        },
        updateCompletedTodo(state, action: PayloadAction<{ id: number, completed: boolean }>) {
            state.todos = state.todos.map(elem => elem.id === action.payload.id ? {
                ...elem, completed: action.payload.completed
            } : elem);
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(elem => elem.id !== action.payload);
        }
    }
});

export const {addTodo, updateTextTodo, updateCompletedTodo, deleteTodo} = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;
export default todoSlice.reducer;