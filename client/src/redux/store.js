import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware                                 from 'redux-thunk';
import appReducer                                      from "./appReducer";
import englishReducer                                  from "./englishReducer.js";
import patternReducer                                  from "./patternReducer.js";
import projectReducer                                  from "./projectReducer.js";
import todoReducer                                     from "./todoReducer";
import authReducer                                     from "./authReducer";
import videoReducer                                    from "./videoReducer.js";


let reducers = combineReducers({
   common: appReducer,
   authPage: authReducer,
   todoPage: todoReducer,
   patternPage: patternReducer,
   videoPage: videoReducer,
   englishPage: englishReducer,
   projectPage: projectReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.__store = store

export default store;
