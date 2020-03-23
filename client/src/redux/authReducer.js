import {authAPI}    from "../api/api.js";
import {setLoading} from "./appReducer.js";

const SET_USER_DATA = 'my-social-network/auth/SET_USER_DATA';
const SET_MESSAGE = 'my-social-network/auth/SET_MESSAGE';
const SET_ERROR = 'my-social-network/auth/SET_ERROR';
const SET_READY = 'my-social-network/auth/SET_READY';
const LOGOUT = 'my-social-network/auth/LOGOUT';

let initialState = {
   token: '',
   message: '',
   error: '',
   userId: null,
   ready: false,
   email: ''
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

export const setUserData = (token, userId, email) => ({type: SET_USER_DATA, payload: {token, userId, email}})
export const setMessage = message => ({type: SET_MESSAGE, message})
export const setError = error => ({type: SET_ERROR, error})
export const setReady = ready => ({type: SET_READY, ready})
export const logoutUser = () => ({type: LOGOUT})


export const login = (email, password) => async (dispatch) => {
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
export const register = (email, password) => async (dispatch) => {
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

export const logout = () => async (dispatch) => {
   dispatch(logoutUser())
   localStorage.removeItem('userData')
}

export const localStorageUser = () => async (dispatch) => {
   try {
      const data = JSON.parse(localStorage.getItem('userData'))

      if (data && data.token) {
         dispatch(setUserData(data.token, data.userId, data.login))
      }

      dispatch(setReady(true))
   } catch (e) {

   }

}



export default authReducer;
