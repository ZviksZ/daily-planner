import {projectAPI}     from "../api/api.js";
import {getGlobalError} from "./appReducer.js";

const SET_PROJECTS = 'my-social-network/projects/SET_PROJECTS';
const ADD_PROJECT = 'my-social-network/projects/ADD_PROJECT';
/*
const DELETE_TODO = 'my-social-network/todos/DELETE_TODO';
const UPDATE_TODO = 'my-social-network/todos/UPDATE_TODO';
const COMPLETED_TODO = 'my-social-network/todos/COMPLETED_TODO';*/

let initialState = {
   projects: [],
   technologiesOptions: [
      {value: 'react', label: 'React'},
      {value: 'redux', label: 'Redux'},
      {value: 'axios', label: 'Axios'},
      {value: 'reselect', label: 'Reselect'},
      {value: 'socketio', label: 'SocketIO'},
      {value: 'typescript', label: 'Typescript'},
      {value: 'nodejs', label: 'Node Js'},
      {value: 'react-hooks', label: 'React Hooks'},
      {value: 'react-animation', label: 'React-animation'},
      {value: 'mongodb', label: 'MongoDB'},
      {value: 'nextjs', label: 'Next Js'},
      {value: 'bootstrap', label: 'Bootstrap'},
      {value: 'material', label: 'Material UI'},
      {value: 'react-lazyload', label: 'React-lazyload'},
      {value: 'react-context', label: 'React Context'},
      {value: 'redux-form', label: 'Redux-form'},
      {value: 'formik', label: 'Formik'},
      {value: 'form-validation', label: 'Form validation'},
      {value: 'semantic', label: 'Semantic'},
      {value: 'responsive', label: 'Responsive'},
      {value: 'scss', label: 'Scss'},
      {value: 'jquery', label: 'Jquery'},
      {value: 'bitrix', label: 'bitrix'},
      {value: 'php', label: 'PHP'},
      {value: 'mysql', label: 'MySQL'},
      {value: 'seo', label: 'SEO'},
      {value: 'shema', label: 'Shema'},
      {value: 'react-router', label: 'React-router'},
      {value: 'flux', label: 'Flux'},
      {value: 'redux-thunk', label: 'Redux-thunk'},
      {value: 'redux-saga', label: 'Redux-saga'},
      {value: 'local-storage', label: 'Local Storage'},
      {value: 'firebase', label: 'Firebase'},
      {value: 'heroku', label: 'Heroku'},
      {value: 'netlify', label: 'Netlify'}
   ]
};

const projectReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_PROJECTS: {
         return {
            ...state,
            projects: action.projects
         }
      }
      case ADD_PROJECT: {
         return {
            ...state,
            projects: [...state.projects, action.project]
         }
      }
      /*
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
      }*/
      default:
         return state;
   }
}


export const setProjects = projects => ({type: SET_PROJECTS, projects})
export const addProject = project => ({type: ADD_PROJECT, project})


export const getProjects = () => async (dispatch) => {
   try {
      let response = await projectAPI.getProjects()
      dispatch(setProjects(response))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const createProject = (technologies, description, demoLink, gitLink) => async dispatch => {
   try {
      let response = await projectAPI.createProject(technologies, description, demoLink, gitLink)
      dispatch(addProject(response.data.project))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
/*
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


*/


export default projectReducer;
