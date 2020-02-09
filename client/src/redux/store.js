import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware                                 from 'redux-thunk';
import appReducer                                      from "./appReducer";
import todoReducer                                     from "./todoReducer";
import authReducer                                     from "./authReducer";
import videoReducer                                    from "./videoReducer.js";


let reducers = combineReducers({
   common: appReducer,
   authPage: authReducer,
   todoPage: todoReducer,
   videoPage: videoReducer
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
