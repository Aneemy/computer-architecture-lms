import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import testReducer from "./testReducer";
import { configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    user:userReducer,
    test:testReducer,

})

export const store = configureStore(
    {
        reducer:rootReducer,
        middleware:[thunk],
        devTools:composeWithDevTools(),
    }
)