import {todosAPI}       from "../api/api.js";
import {getGlobalError} from "./appReducer.js";

const SET_TODOS = 'my-social-network/todos/SET_TODOS';
const ADD_TODO = 'my-social-network/todos/ADD_TODO';
const DELETE_TODO = 'my-social-network/todos/DELETE_TODO';
const UPDATE_TODO = 'my-social-network/todos/UPDATE_TODO';
const COMPLETED_TODO = 'my-social-network/todos/COMPLETED_TODO';

let initialState = {
   todos: [],
};

const todosReducer = (state = initialState, action) => {
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

export const setTodos = todos => ({type: SET_TODOS, todos})
export const addTodo = todo => ({type: ADD_TODO, todo})
export const deleteTodoItem = todoId => ({type: DELETE_TODO, todoId})
export const updateTodoItem = (todoId, title) => ({type: UPDATE_TODO, todoId, title})
export const completedTodoItem = (todoId, completed) => ({type: COMPLETED_TODO, todoId, completed})


export const getTodos = () => async (dispatch) => {
   try {
      let response = await todosAPI.getTodos()
      dispatch(setTodos(response))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const createTodo = (title) => async dispatch => {
   try {
      let response = await todosAPI.createTodo(title)
      dispatch(addTodo(response.data.todo))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const deleteTodo = (todoId) => async dispatch => {
   try {
      let response = await todosAPI.deleteTodo(todoId)

      dispatch(deleteTodoItem(response.data.message._id))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const updateTodo = (todoId, title) => async dispatch => {
   try {
      await todosAPI.updateTodo(todoId, title)
      dispatch(updateTodoItem(todoId, title))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const completeTodo = (todoId, completed) => async dispatch => {
   try {
      await todosAPI.completeTodo(todoId, completed)
      dispatch(completedTodoItem(todoId, completed))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}






export default todosReducer;
