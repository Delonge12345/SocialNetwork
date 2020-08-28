import {applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form';
import {appReducer} from "./appReducer";

let reducers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    usersPage:usersReducer,
    authPage:authReducer,
    appInitial:appReducer,
    form: formReducer
})

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>


let store = createStore(reducers,applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;

export default store;