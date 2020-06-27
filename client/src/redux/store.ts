import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkMiddleware }                      from "redux-thunk";
import appReducer                                      from "./appReducer";
import englishReducer                                  from "./englishReducer.js";
import patternReducer                                  from "./patternReducer.js";
import projectReducer                                  from "./projectReducer.js";
import todoReducer                                     from "./todoReducer";
import authReducer                                     from "./authReducer";
import videoReducer                                    from "./videoReducer.js";
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
