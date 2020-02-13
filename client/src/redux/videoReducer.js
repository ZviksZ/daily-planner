import {videoAPI}       from "../api/api.js";
import {getYoutubeId}   from "../utils";
import {getGlobalError} from "./appReducer.js";

const SET_VIDEOS = 'my-social-network/videos/SET_VIDEOS';
const ADD_VIDEO = 'my-social-network/videos/ADD_VIDEO';

let initialState = {
   videos: [],
};

const videoReducer = (state = initialState, action) => {

   switch (action.type) {
      case SET_VIDEOS: {
         return {
            ...state,
            videos: action.videos
         }
      }

      case ADD_VIDEO: {
         return {
            ...state,
            videos: [...state.videos, action.video]
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

export const setVideos = videos => ({type: SET_VIDEOS, videos})
export const addVideoItem = video => ({type: ADD_VIDEO, video})
/*
export const addTodo = todo => ({type: ADD_TODO, todo})
export const deleteTodoItem = todoId => ({type: DELETE_TODO, todoId})
export const updateTodoItem = (todoId, title) => ({type: UPDATE_TODO, todoId, title})
export const completedTodoItem = (todoId, completed) => ({type: COMPLETED_TODO, todoId, completed})

*/
export const getVideos = () => async (dispatch) => {
   try {
      let response = await videoAPI.getVideos()
      dispatch(setVideos(response))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const addVideo = (url) => async dispatch => {
   try {
      let videoId = getYoutubeId(url)
      let videoData = await videoAPI.getDataById(videoId)
      let newLink = 'https://www.youtube.com/embed/' + videoId
      const {title, channelTitle} = videoData.items[0].snippet
      const previewImg = videoData.items[0].snippet.thumbnails.medium.url
      console.log(newLink)
      let response = await videoAPI.addVideo(newLink, title, channelTitle, previewImg)
      dispatch(addVideoItem(response.data.video))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
/*export const deleteTodo = (todoId) => async dispatch => {
   try {
      await todosAPI.deleteTodo(todoId)
      dispatch(deleteTodoItem(todoId))
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
}*/






export default videoReducer;
