import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import authReducer from "./authReducer";
import dialogReducer from "./dialogReducer";
import profileReducer from './profileReducer';
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk"
import appReducer from './appReducer';


let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer

});

//Extentions from Redux DevTools for Chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
  ));
  window.__store__= store;


//Without extensions:
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//window.store= store;

export default store;