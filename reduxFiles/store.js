import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middlewares = [];
middlewares.push(thunk);

const reducers = combineReducers(
    {
        rootReducer,
    });
export default createStore(reducers, {}, applyMiddleware(...middlewares));