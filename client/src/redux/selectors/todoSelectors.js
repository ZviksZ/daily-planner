import {createSelector} from "reselect";

export const getTodosSelector = state => state.todoPage.todos;
export const getTodosCompleted = createSelector(
   getTodosSelector,
   todos => todos.filter(todo => todo.completed === true)
)
export const getTodosNoCompleted = createSelector(
   getTodosSelector,
   todos => todos.filter(todo => todo.completed !== true)
)
