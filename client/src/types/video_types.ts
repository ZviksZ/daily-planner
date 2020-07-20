export const SET_VIDEOS = 'my-social-network/videos/SET_VIDEOS';
export const ADD_VIDEO = 'my-social-network/videos/ADD_VIDEO';
export const DELETE_VIDEO = 'my-social-network/videos/DELETE_VIDEO';
export const UPDATE_VIDEO_STATUS = 'my-social-network/videos/UPDATE_VIDEO_STATUS';
export const SET_CURRENT_FILTER = 'my-social-network/videos/SET_CURRENT_FILTER';
export const SET_SEARCH = 'my-social-network/videos/SET_SEARCH';


export interface IVideo {
   channelTitle: string
   date: string
   link: string
   name: string
   owner: string
   previewImg: string
   status: string
   __v: number
   _id: string
}
export interface IVideoFilterItem {
   value: string
   label: string
}
export interface VideosInitialState {
   videos: IVideo[],
   search: string,
   currentFilter: string,
   filterList: IVideoFilterItem[]
}


export interface SetVideosAction {
   type: typeof SET_VIDEOS;
   videos: IVideo[];
}
export interface AddVideoAction {
   type: typeof ADD_VIDEO;
   video: IVideo;
}
export interface DeleteVideoAction {
   type: typeof DELETE_VIDEO;
   videoId: string;
}
export interface UpdateVideoAction {
   type: typeof UPDATE_VIDEO_STATUS;
   videoId: string;
   status: string;
}
export interface SetVideoFilterAction {
   type: typeof SET_CURRENT_FILTER;
   filter: string;
}
export interface SetVideoSearchAction {
   type: typeof SET_SEARCH;
   search: string;
}

export type VideosActionTypes = SetVideosAction |
AddVideoAction |
DeleteVideoAction |
UpdateVideoAction |
SetVideoFilterAction |
SetVideoSearchAction;
