import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware                                 from 'redux-thunk';
import todoReducer                                     from "./todoReducer";
import authReducer                                     from "./authReducer";


let reducers = combineReducers({
   authPage: authReducer,
   todoPage: todoReducer,   
});


let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;