import {createSelector} from "reselect";
import {AppState}       from "../store";
import {IVideo}         from "../../types/video_types";

export const getVideosSelector = (state: AppState) => state.videoPage.videos;
export const getCurrentFilter = (state: AppState) => state.videoPage.currentFilter;
export const getSearch = (state: AppState) => state.videoPage.search;
export const getFilteredVideos = createSelector(
   getVideosSelector,
   getCurrentFilter,
   getSearch,
   (videos: IVideo[], currentFilter: string, search: string) => {
      if (currentFilter && !search) {
         return videos.filter(video => video.status === currentFilter)
      } else if (currentFilter && search) {
         return videos.filter(video => video.status === currentFilter).filter(video => video.name.toLowerCase().includes(search.toLowerCase()) || video.channelTitle.toLowerCase().includes(search.toLowerCase()))
      } else if (!currentFilter && search) {
         return videos.filter(video => video.name.toLowerCase().includes(search.toLowerCase()) || video.channelTitle.toLowerCase().includes(search.toLowerCase()))
      } else {
         return videos
      }
   }
)
