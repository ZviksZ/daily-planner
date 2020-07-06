import {todosAPI}       from "../api/api";
import {getGlobalError} from "./appReducer";
import {
   ADD_TODO,
   AddTodoAction,
   COMPLETED_TODO, CompleteTodoAction,
   DELETE_TODO,
   DeleteTodoAction,
   ITodo,
   SET_TODOS,
   SetTodosAction,
   TodosActionTypes,
   TodosInitialState,
   UPDATE_TODO,
   UpdateTodoAction
} from "../types/todos_types";
import {Dispatch}       from "redux";
import {AppActions}     from "../types/common_types";
import {AppState}       from "./store";



let initialState: TodosInitialState = {
   todos: [],
};

const todosReducer = (state = initialState, action: TodosActionTypes) => {
   switch (action.type) {
      case SET_TODOS: {
         return {
            ...state,
            todos: action.todos
         }
      }
      case ADD_TODO: {
         return {
            ...state,
            todos: [...state.todos, action.todo]
         }
      }
      case DELETE_TODO: {
         return {
            ...state,
            todos: state.todos.filter(todo => todo._id !== action.todoId)
         }
      }
      case UPDATE_TODO: {
         return {
            ...state,
            todos: state.todos.map(todo => {
               if (todo._id === action.todoId) {
                  return { ...todo, title: action.title }
               }
               return todo
            })
         }
      }
      case COMPLETED_TODO: {
         return {
            ...state,
            todos: state.todos.map(todo => {
               if (todo._id === action.todoId) {
                  return { ...todo, completed: action.completed }
               }
               return todo
            })
         }
      }
      default:
         return state;
   }
}

export const setTodos = (todos: ITodo[]): SetTodosAction => ({type: SET_TODOS, todos})
export const addTodo = (todo: ITodo): AddTodoAction => ({type: ADD_TODO, todo})
export const deleteTodoItem = (todoId: string): DeleteTodoAction => ({type: DELETE_TODO, todoId})
export const updateTodoItem = (todoId: string, title: string): UpdateTodoAction => ({type: UPDATE_TODO, todoId, title})
export const completedTodoItem = (todoId: string, completed: boolean): CompleteTodoAction => ({type: COMPLETED_TODO, todoId, completed})


export const getTodos = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await todosAPI.getTodos()
      dispatch(setTodos(response))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}
export const createTodo = (title: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await todosAPI.createTodo(title)

      dispatch(addTodo(response.data.todo))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}
export const deleteTodo = (todoId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await todosAPI.deleteTodo(todoId)

      dispatch(deleteTodoItem(todoId))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}
export const updateTodo = (todoId: string, title: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await todosAPI.updateTodo(todoId, title)
      dispatch(updateTodoItem(todoId, title))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}
export const completeTodo = (todoId: string, completed: boolean) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await todosAPI.completeTodo(todoId, completed)
      dispatch(completedTodoItem(todoId, completed))
   } catch (error) {
      getGlobalError(error.response.data.message)
   }
}






export default todosReducer;
