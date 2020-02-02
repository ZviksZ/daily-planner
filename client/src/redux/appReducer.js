const SET_LOADING = 'my-social-network/app/SET_LOADING';
const SET_GLOBAL_ERROR = 'my-social-network/app/SET_GLOBAL_ERROR';

let initialState = {
   loading: false,
   globalError: ''
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
      default:
         return state;
   }
}

export const setLoading = bool => ({type: SET_LOADING, bool})
export const setGlobalError = error => ({type: SET_GLOBAL_ERROR, error})

export const getGlobalError = (error) => async (dispatch) => {
   dispatch(setGlobalError(error))
   setTimeout(() => {
      dispatch(setGlobalError(""))
   }, 3000)
}


export default appReducer;