import {authAPI}    from "../api/api";
import {setLoading} from "./appReducer";
import {
   AuthActionTypes,
   IAuthInitialState,
   LOGOUT, LogoutAction,
   SET_ERROR,
   SET_MESSAGE,
   SET_READY,
   SET_USER_DATA, SetErrorAction,
   SetMessageAction,
   SetReadyAction,
   SetUserDataAction
}                   from "../types/auth_types";
import {Dispatch}   from "redux";
import {AppActions} from "../types/common_types";
import {AppState}   from "./store";


let initialState: IAuthInitialState = {
   token: '',
   message: '',
   error: '',
   userId: null,
   ready: false,
   email: ''
};

const authReducer = (state = initialState, action: AuthActionTypes) => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.payload
         }
      case SET_MESSAGE:
         return {
            ...state,
            message: action.message
         }
      case SET_ERROR:
         return {
            ...state,
            error: action.error
         }
      case SET_READY:
         return {
            ...state,
            ready: action.ready
         }
      case LOGOUT:
         return {
            ...state,
            token: null,
            userId: null
         }
      default:
         return state;
   }
}

export const setUserData = (token: string, userId: string | null, email: string): SetUserDataAction => ({type: SET_USER_DATA, payload: {token, userId, email}})
export const setMessage = (message: string): SetMessageAction => ({type: SET_MESSAGE, message})
export const setError = (error: string): SetErrorAction => ({type: SET_ERROR, error})
export const setReady = (ready: boolean): SetReadyAction => ({type: SET_READY, ready})
export const logoutUser = (): LogoutAction => ({type: LOGOUT})


export const login = (email: string, password: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let response = await authAPI.login(email, password)
      email = email.substr(0, email.indexOf('@'))
      localStorage.setItem('userData', JSON.stringify({
         userId: response.userId, token: response.token, login: email
      }))
      dispatch(setUserData(response.token, response.userId, email))
   } catch (error) {
      dispatch(setError(error.response.data.message))
      setTimeout(() => {
         dispatch(setError(''))
      }, 3000)
   }
}
export const register = (email: string, password: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   dispatch(setLoading(true))
   try {
      let response = await authAPI.register(email, password)
      dispatch(setMessage(response.message))
      setTimeout(() => {
         dispatch(setMessage(''))
         dispatch(setLoading(false))
      }, 3000)
   } catch (error) {
      dispatch(setError(error.response.data.message))
      setTimeout(() => {
         dispatch(setError(''))
         dispatch(setLoading(false))
      }, 3000)
   }
}

export const logout = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   dispatch(logoutUser())
   localStorage.removeItem('userData')
}

export const localStorageUser = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      const data = JSON.parse(localStorage.getItem('userData') || '{}')

      if (data && data.token) {
         dispatch(setUserData(data.token, data.userId, data.login))


         await authAPI.verifyAuth(data.token)
      }

      dispatch(setReady(true))
   } catch (e) {
      dispatch(logoutUser())
      localStorage.removeItem('userData')
   }

}


export default authReducer;
