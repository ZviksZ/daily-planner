export const SET_LOADING = 'my-social-network/app/SET_LOADING';
export const SET_GLOBAL_ERROR = 'my-social-network/app/SET_GLOBAL_ERROR';
export const TOGGLE_MENU = 'my-social-network/app/TOGGLE_MENU';

export interface IAppInitialState {
   loading: boolean,
   globalError: string,
   menuOpen: boolean
}

export interface SetLoadingAction {
   type: typeof SET_LOADING;
   bool: boolean;
}
export interface SetGlobalErrorAction {
   type: typeof SET_GLOBAL_ERROR;
   error: string;
}
export interface ToggleMenuAction {
   type: typeof TOGGLE_MENU;
   bool: boolean;
}



export type AppActionTypes =
   SetLoadingAction
   | SetGlobalErrorAction
   | ToggleMenuAction;
