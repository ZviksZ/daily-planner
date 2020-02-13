import {videoAPI}       from "../api/api.js";
import {getYoutubeId}   from "../utils";
import {getGlobalError} from "./appReducer.js";

const SET_VIDEOS = 'my-social-network/videos/SET_VIDEOS';
const ADD_VIDEO = 'my-social-network/videos/ADD_VIDEO';
const DELETE_VIDEO = 'my-social-network/videos/DELETE_VIDEO';
const UPDATE_VIDEO_STATUS = 'my-social-network/videos/UPDATE_VIDEO_STATUS';

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

      case DELETE_VIDEO: {
         return {
            ...state,
            videos: state.videos.filter(video => video._id !== action.videoId)
         }
      }

      case UPDATE_VIDEO_STATUS: {
         return {
            ...state,
            videos: state.videos.map(video => {
               if (video._id === action.videoId) {
                  return { ...video, status: action.status }
               }
               return video
            })
         }
      }
      /*
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
export const deleteVideoItem = videoId => ({type: DELETE_VIDEO, videoId})
export const updateVideoItem = (videoId, status) => ({type: UPDATE_VIDEO_STATUS, videoId, status})


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

export const deleteVideo = (videoId) => async dispatch => {
   try {
      await videoAPI.deleteVideo(videoId)
      dispatch(deleteVideoItem(videoId))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const updateVideoStatus = (videoId, status) => async dispatch => {
   try {
      let response = await videoAPI.updateVideoStatus(videoId, status)
      console.log(response)
      dispatch(updateVideoItem(videoId, status))
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

export const completeTodo = (todoId, completed) => async dispatch => {
   try {
      await todosAPI.completeTodo(todoId, completed)
      dispatch(completedTodoItem(todoId, completed))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}*/


export default videoReducer;
