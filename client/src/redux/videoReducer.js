 import {videoAPI}      from "../api/api.js";
import {getYoutubeId}   from "../utils";
import {getGlobalError} from "./appReducer.ts";

const SET_VIDEOS = 'my-social-network/videos/SET_VIDEOS';
const ADD_VIDEO = 'my-social-network/videos/ADD_VIDEO';
const DELETE_VIDEO = 'my-social-network/videos/DELETE_VIDEO';
const UPDATE_VIDEO_STATUS = 'my-social-network/videos/UPDATE_VIDEO_STATUS';
const SET_CURRENT_FILTER = 'my-social-network/videos/SET_CURRENT_FILTER';
const SET_SEARCH = 'my-social-network/videos/SET_SEARCH';

let initialState = {
   videos: [],
   search: '',
   currentFilter: '',
   filterList: [
      {value: 'unviewed',label: 'Непросмотренно'},
      {value: 'viewed',label: 'Просмотренно'},
      {value: 'repeat',label: 'На повтор' }
   ]
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
      case SET_CURRENT_FILTER: {
         return {
            ...state,
            currentFilter: action.filter
         }
      }
      case SET_SEARCH: {
         return {
            ...state,
            search: action.search
         }
      }
      default:
         return state;
   }
}

export const setVideos = videos => ({type: SET_VIDEOS, videos})
export const addVideoItem = video => ({type: ADD_VIDEO, video})
export const deleteVideoItem = videoId => ({type: DELETE_VIDEO, videoId})
export const updateVideoItem = (videoId, status) => ({type: UPDATE_VIDEO_STATUS, videoId, status})
export const setFilter = filter => ({type: SET_CURRENT_FILTER, filter})
export const setSearch = search => ({type: SET_SEARCH, search})


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
      let response = await videoAPI.addVideo(newLink, title, channelTitle, previewImg)
      dispatch(addVideoItem(response.data.video))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}

export const deleteVideo = (videoId) => async dispatch => {
   try {
      let response = await videoAPI.deleteVideo(videoId)

      dispatch(deleteVideoItem(response.data.message._id))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}
export const updateVideoStatus = (videoId, status) => async dispatch => {
   try {
      await videoAPI.updateVideoStatus(videoId, status)

      dispatch(updateVideoItem(videoId, status))
   } catch (error) {
      dispatch(getGlobalError(error.response.data.message))
   }
}



export default videoReducer;
