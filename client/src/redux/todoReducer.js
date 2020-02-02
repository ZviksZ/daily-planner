import {todosAPI}       from "../api/api.js";
import {getGlobalError} from "./appReducer.js";

const SET_TODOS = 'my-social-network/todos/SET_TODOS';
const ADD_TODO = 'my-social-network/todos/ADD_TODO';
const DELETE_TODO = 'my-social-network/todos/DELETE_TODO';

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
      default:
         return state;
   }
}

export const setTodos = todos => ({type: SET_TODOS, todos})
export const addTodo = todo => ({type: ADD_TODO, todo})
export const deleteTodoItem = todoId => ({type: DELETE_TODO, todoId})


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
      await todosAPI.deleteTodo(todoId)
      dispatch(deleteTodoItem(todoId))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}





export default todosReducer;