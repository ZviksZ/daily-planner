export const SET_TODOS = 'my-social-network/todos/SET_TODOS';
export const ADD_TODO = 'my-social-network/todos/ADD_TODO';
export const DELETE_TODO = 'my-social-network/todos/DELETE_TODO';
export const UPDATE_TODO = 'my-social-network/todos/UPDATE_TODO';
export const COMPLETED_TODO = 'my-social-network/todos/COMPLETED_TODO';


export interface ITodo {
   title: string
   completed: boolean
   date: string
   code: string
   owner: object
   __v: number
   _id: string
}

export interface TodosInitialState {
   todos: ITodo[]
}

export interface SetTodosAction {
   type: typeof SET_TODOS;
   todos: ITodo[];
}
export interface AddTodoAction {
   type: typeof ADD_TODO;
   todo: ITodo;
}
export interface DeleteTodoAction {
   type: typeof DELETE_TODO;
   todoId: string;
}
export interface UpdateTodoAction {
   type: typeof UPDATE_TODO;
   todoId: string;
   title: string;
}
export interface CompleteTodoAction {
   type: typeof COMPLETED_TODO;
   todoId: string;
   completed: boolean;
}


export type TodosActionTypes =
   SetTodosAction |
   AddTodoAction |
   DeleteTodoAction |
   UpdateTodoAction |
   CompleteTodoAction;
