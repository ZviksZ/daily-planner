import {logout}                                                                                                                                 from "./authReducer";
import {AppActionTypes, IAppInitialState, SET_GLOBAL_ERROR, SET_LOADING, SetGlobalErrorAction, SetLoadingAction, TOGGLE_MENU, ToggleMenuAction} from "../types/app_types";
import {Dispatch}                                                                                                                               from "redux";
import {AppActions}                                                                                                                             from "../types/common_types";
import {AppState}                                                                                                                               from "./store";


let initialState: IAppInitialState = {
   loading: false,
   globalError: '',
   menuOpen: false
};

const appReducer = (state = initialState, action: AppActionTypes) => {
   switch (action.type) {
      case SET_LOADING:
         return {
            ...state,
            loading: action.bool
         }
      case SET_GLOBAL_ERROR:
         return {
            ...state,
            globalError: action.error
         }
      case TOGGLE_MENU:
         return {
            ...state,
            menuOpen: action.bool
         }
      default:
         return state;
   }
}

export const setLoading = (bool: boolean): SetLoadingAction => ({type: SET_LOADING, bool})
export const setGlobalError = (error: string): SetGlobalErrorAction => ({type: SET_GLOBAL_ERROR, error})
export const toggleMenu = (bool: boolean): ToggleMenuAction => ({type: TOGGLE_MENU, bool})

export const getGlobalError = (error: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   if (error === 'Нет авторизации') {
      logout()
   } else {
      dispatch(setGlobalError(error))
      setTimeout(() => {
         dispatch(setGlobalError(""))
      }, 3000)
   }
}


export default appReducer;
