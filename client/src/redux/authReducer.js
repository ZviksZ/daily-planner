import {authAPI} from "../api/api.js";

const SET_USER_DATA = 'my-social-network/auth/SET_USER_DATA';
const SET_MESSAGE = 'my-social-network/auth/SET_MESSAGE';
const SET_ERROR = 'my-social-network/auth/SET_ERROR';
const LOGOUT = 'my-social-network/auth/LOGOUT';

let initialState = {
   token: '',
   message: '',
   error: '',
   userId: null,
   ready: false
};

const authReducer = (state = initialState, action) => {
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

export const setUserData = (token, userId) => ({type: SET_USER_DATA, payload: {token, userId}})
export const setMessage = message => ({type: SET_MESSAGE, message})
export const setError = error => ({type: SET_ERROR, error})
export const logoutUser = () => ({type: LOGOUT})


export const login = (email, password) => async (dispatch) => {
   try {
      let response = await authAPI.login(email, password)
      localStorage.setItem('userData', JSON.stringify({
         userId: response.userId, token: response.token
      }))
      dispatch(setUserData(response.token, response.userId))
   } catch (error) {
      dispatch(setError(error.response.data.message))
      setTimeout(() => {
         dispatch(setError(''))
      }, 3000)
   }
}
export const register = (email, password) => async (dispatch) => {
   try {
      let response = await authAPI.register(email, password)
      dispatch(setMessage(response.message))
      setTimeout(() => {
         dispatch(setMessage(''))
      }, 3000)
   } catch (error) {
      dispatch(setError(error.response.data.message))
      setTimeout(() => {
         dispatch(setError(''))
      }, 3000)
   }
}
export const logout = () => async (dispatch) => {
   dispatch(logoutUser())
   localStorage.removeItem('userData')
}

export const localStorageUser = () => async (dispatch) => {
   const data = JSON.parse(localStorage.getItem('userData'))
   if (data && data.token) {
      dispatch(setUserData(data.token, data.userId))
   }
}

/*export const getCaptchaUrl = () => async (dispatch) => {
   let response = await securityAPI.getCaptchaUrl();
   const captchaUrl = response.data.url;

   dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const loginMe = (email, password, rememberMe, captcha) => async (dispatch) => {
   let response = await authAPI.login(email, password, rememberMe, captcha)

   if (response.data.resultCode === 0) {
      //success, get auth data
      dispatch(setAuthUserDataThunk());
   } else {
      if(response.data.resultCode === 10) {
         dispatch(getCaptchaUrl());
      }
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit("login", {
         _error: message
      }))
   }
}

export const logoutMe = () => async (dispatch) => {
   let response = await authAPI.logout()

   if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
   }
}*/


export default authReducer;