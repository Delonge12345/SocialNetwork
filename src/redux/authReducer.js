import {getAuthMeAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const INITIALIZED_ME = 'authReducer/INITIALIZED_ME';
const LOG_IN = 'authReducer/LOG_IN';

let initialState = {
    isAuth: false,
    id: null,
    email: null,
    login: null,
    captcha: null
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_ME :
            return {
                ...state,
                ...action.data
            }
        case LOG_IN:
            return {
                ...state,

            }
        default:
            return state

    }
}


export const getAuthMeThunkCreator = () => {
    return async (dispatch) => {
        let response = await getAuthMeAPI.authMe()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(authMeActionCreator(id, email, login, true))
        }
    }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => {

    return async (dispatch) => {
        let response = await getAuthMeAPI.login(email, password, rememberMe, captcha)

        if (response.data.resultCode === 0) {
            dispatch(getAuthMeThunkCreator())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('loginAuth', {_error: message}));
        }
    }
}
export const logOutThunkCreator = () => {
    return async(dispatch) => {
       let response = await getAuthMeAPI.logOut()

                if (response.data.resultCode === 0) {
                    dispatch(authMeActionCreator(null, null, null, false))
                }
    }
}


export default authReducer;

export const authMeActionCreator = (id, email, login, isAuth) => ({
    type: INITIALIZED_ME,
    data: {id, email, login, isAuth}
});
