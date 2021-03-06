import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkMiddleware }                      from "redux-thunk";
import appReducer                                      from "./appReducer";
import englishReducer                                  from "./englishReducer";
import patternReducer                                  from "./patternReducer";
import projectReducer                                  from "./projectReducer";
import todoReducer                                     from "./todoReducer";
import authReducer                                     from "./authReducer";
import videoReducer                                    from "./videoReducer";
import {AppActions}                                    from "../types/common_types";


let reducers = combineReducers({
   common: appReducer,
   authPage: authReducer,
   todoPage: todoReducer,
   patternPage: patternReducer,
   videoPage: videoReducer,
   englishPage: englishReducer,
   projectPage: projectReducer
});

export type AppState = ReturnType<typeof reducers>;



let store = createStore(reducers, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));


export default store;
