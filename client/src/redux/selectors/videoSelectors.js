import {createSelector} from "reselect";

export const getVideosSelector = state => state.videoPage.videos;
export const getCurrentFilter = state => state.videoPage.currentFilter;
export const getSearch = state => state.videoPage.search;
export const getFilteredVideos = createSelector(
   getVideosSelector,
   getCurrentFilter,
   getSearch,
   (videos, currentFilter, search) => {
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
