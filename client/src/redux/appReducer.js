const SET_LOADING = 'my-social-network/app/SET_LOADING';

let initialState = {
   loading: false
};

const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_LOADING:
         return {
            ...state,
            loading: action.bool
         }
      default:
         return state;
   }
}

export const setLoading = bool => ({type: SET_LOADING, bool})



export default appReducer;