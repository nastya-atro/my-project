import { applyMiddleware, combineReducers, createStore, compose, Action } from "redux";
import dialogReducer from "./dialogReducer";
import profileReducer from './profileReducer';
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import appReducer from './appReducer';
import authReducer from './authReducer';
import friendPageReducer from './friendPageReducer';


let rootReducer = combineReducers({
  profilePage: profileReducer,
  messagesPage: dialogReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  friendPage: friendPageReducer,
  auth: authReducer,
  app: appReducer 
  
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type CommonActionsTypes<T> = T extends {[key: string]:(...args:any[])=> infer U }?U:never

export type CommonThunkType<A extends Action>= ThunkAction<Promise<void>, AppStateType, unknown, A>



//Extentions from Redux DevTools for Chrome
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)
));
//@ts-ignore
window.__store__ = store;


//Without extensions:
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//window.store= store;

export default store;