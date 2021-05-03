import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import authReducer from "./authReducer";
import dialogReducer from "./dialogReducer";
import profileReducer from './profileReducer';
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk"
import appReducer from './appReducer';
import newsReducer from './newsReducer';


import messageReducer from "../Trenirovka.Store/message-reducer";
import postReducer from "../Trenirovka.Store/post-reducer";
import commentReducer from "../Trenirovka.Store/comment-reducer";
import usertsTrReducer from "../Trenirovka.Store/usersTrReducer";
import profileTrReducer from "../Trenirovka.Store/profile-reducer";
import HeaderTrReducer from "../Trenirovka.Store/header-reducer";
import UserPReducer from '../Trenirovka.Store/UserPageReducer';







let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    newsPage: newsReducer,
    messagePage: messageReducer,
    postPage: postReducer,
    commentPage: commentReducer,
    usersTr: usertsTrReducer,
    profileTr: profileTrReducer,
    authTr: HeaderTrReducer,
    userP: UserPReducer

});

//Extentions from Redux DevTools for Chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)
  ));
  window.__store__= store;


//Without extensions
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//window.store= store;

export default store;