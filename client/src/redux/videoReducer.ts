import {videoAPI}       from "../api/api";
import {getYoutubeId}   from "../utils";
import {getGlobalError} from "./appReducer";
import {
   VideosActionTypes,
   VideosInitialState,
   SET_VIDEOS,
   ADD_VIDEO,
   DELETE_VIDEO,
   UPDATE_VIDEO_STATUS,
   SET_CURRENT_FILTER,
   SET_SEARCH,
   IVideo,
   SetVideosAction,
   AddVideoAction, DeleteVideoAction, UpdateVideoAction, SetVideoFilterAction, SetVideoSearchAction
}                       from "../types/video_types";
import {Dispatch}       from "redux";
import {AppActions}     from "../types/common_types";
import {AppState}       from "./store";


let initialState: VideosInitialState = {
   videos: [],
   search: '',
   currentFilter: '',
   filterList: [
      {value: 'unviewed',label: 'Непросмотренно'},
      {value: 'viewed',label: 'Просмотренно'},
      {value: 'repeat',label: 'На повтор' }
   ]
};

const videoReducer = (state = initialState, action: VideosActionTypes) => {

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

export const setVideos = (videos: IVideo[]): SetVideosAction => ({type: SET_VIDEOS, videos})
export const addVideoItem = (video: IVideo): AddVideoAction => ({type: ADD_VIDEO, video})
export const deleteVideoItem = (videoId: string): DeleteVideoAction => ({type: DELETE_VIDEO, videoId})
export const updateVideoItem = (videoId: string, status: string): UpdateVideoAction => ({type: UPDATE_VIDEO_STATUS, videoId, status})
export const setFilter = (filter: string): SetVideoFilterAction => ({type: SET_CURRENT_FILTER, filter})
export const setSearch = (search: string): SetVideoSearchAction => ({type: SET_SEARCH, search})


export const getVideos = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await videoAPI.getVideos()
      dispatch(setVideos(response))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}
export const addVideo = (url: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let videoId = getYoutubeId(url)
      let videoData = await videoAPI.getDataById(videoId || '')
      let newLink = 'https://www.youtube.com/embed/' + videoId
      const {title, channelTitle} = videoData.items[0].snippet
      const previewImg = videoData.items[0].snippet.thumbnails.medium.url
      let response = await videoAPI.addVideo(newLink, title, channelTitle, previewImg)
      dispatch(addVideoItem(response.video))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}

export const deleteVideo = (videoId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await videoAPI.deleteVideo(videoId)

      dispatch(deleteVideoItem(videoId))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}
export const updateVideoStatus = (videoId: string, status: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      await videoAPI.updateVideoStatus(videoId, status)

      dispatch(updateVideoItem(videoId, status))
   } catch (error) {
      getGlobalError(error.response.message)
   }
}



export default videoReducer;
