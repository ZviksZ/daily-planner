import {createSelector} from "reselect";
import {AppState}       from "../store";
import {ITodo}          from "../../types/todos_types";

export const getTodosSelector = (state: AppState) => state.todoPage.todos;
export const getTodosCompleted = createSelector(
   getTodosSelector,
   (todos: ITodo[]) => todos.filter(todo => todo.completed === true)
)
export const getTodosNoCompleted = createSelector(
   getTodosSelector,
   (todos: ITodo[])  => todos.filter(todo => todo.completed !== true)
)
