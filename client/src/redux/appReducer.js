import {logout} from "./authReducer.js";

const SET_LOADING = 'my-social-network/app/SET_LOADING';
const SET_GLOBAL_ERROR = 'my-social-network/app/SET_GLOBAL_ERROR';
const TOGGLE_MENU = 'my-social-network/app/TOGGLE_MENU';

let initialState = {
   loading: false,
   globalError: '',
   menuOpen: false
};

const appReducer = (state = initialState, action) => {
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

export const setLoading = bool => ({type: SET_LOADING, bool})
export const setGlobalError = error => ({type: SET_GLOBAL_ERROR, error})
export const toggleMenu = bool => ({type: TOGGLE_MENU, bool})

export const getGlobalError = (error) => async (dispatch) => {
   if (error === 'Нет авторизации') {
      dispatch(logout())
   } else {
      dispatch(setGlobalError(error))
      setTimeout(() => {
         dispatch(setGlobalError(""))
      }, 3000)
   }
}


export default appReducer;
