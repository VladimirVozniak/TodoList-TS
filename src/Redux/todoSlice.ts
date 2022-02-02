import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {ITodo} from "../intefaces";

interface todoSliceState {
    todos: ITodo[]
}

const initialState: todoSliceState = {
    todos: [
        {
            "id": 1643805319214,
            "text": "5",
            "completed": false
        },
        {
            "id": 1643805669337,
            "text": "234",
            "completed": true
        },
        {
            "id": 1643805670647,
            "text": "444",
            "completed": false
        },
        {
            "id": 1643805672479,
            "text": "1das",
            "completed": true
        }
    ]
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
        checkAllTodos(state, action: PayloadAction<boolean>) {
            state.todos = state.todos.map(elem => ({
            ...elem, completed: action.payload
            }));
        },
        deleteTodo(state, action: PayloadAction<number>) {
            state.todos = state.todos.filter(elem => elem.id !== action.payload);
        }
    }
});

export const {addTodo, updateTextTodo, updateCompletedTodo,checkAllTodos, deleteTodo} = todoSlice.actions;
export const selectTodos = (state: RootState) => state.todos.todos;
export default todoSlice.reducer;