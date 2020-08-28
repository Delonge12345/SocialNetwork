import {getAuthMeAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const INITIALIZED_ME = 'authReducer/INITIALIZED_ME';
const LOG_IN = 'authReducer/LOG_IN';
const GET_CAPTCHA_URL_SUCCESS = 'authReducer/GET_CAPTCHA_URL_SUCCESS';


// export type InitialStateType = {
//     isAuth: boolean,
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     captchaUrl: string | null
// }

let initialState = {
    isAuth: false,
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action:any):InitialStateType => {
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
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state, captchaUrl:action.captchaUrl
            }
        default:
            return state

    }
}


export const getAuthMeThunkCreator = () => {
    return async (dispatch:any) => {
        let response = await getAuthMeAPI.authMe()
        if (response.data.resultCode === 0) {
            let {id, email, login} = response.data.data;
            dispatch(authMeActionCreator(id, email, login, true))
        }
    }
}

export const loginThunkCreator = (email:string, password:string, rememberMe:boolean, captcha:string) => {return async (dispatch:any) => {
        let response = await getAuthMeAPI.login(email, password, rememberMe, captcha)

        if (response.data.resultCode === 0) {
            dispatch(getAuthMeThunkCreator())
        } else {
            if (response.data.resultCode === 1) {
                dispatch(captchaUrlThunkCreator())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
            dispatch(stopSubmit('loginAuth', {_error: message}));

        }
    }
}



export const logOutThunkCreator = () => {
    return async (dispatch:any) => {
        let response = await getAuthMeAPI.logOut()

        if (response.data.resultCode === 0) {
            dispatch(authMeActionCreator(null, null, null, false))
        }
    }
}

export const captchaUrlThunkCreator = () => {
    return async (dispatch:any) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(getCaptchaActionCreator(captchaUrl))
    }
}

type SetAuthMeActionCreatorTypePayload={
    id:number | null
    email:string | null
    login:string | null
    isAuth:boolean | null
}

type SetAuthMeActionCreatorType={
    type: typeof INITIALIZED_ME,
    data: SetAuthMeActionCreatorTypePayload
}

export const authMeActionCreator = (id:number | null, email:string | null, login:string | null, isAuth:boolean):SetAuthMeActionCreatorType => ({
    type: INITIALIZED_ME,
    data: {id, email, login, isAuth}
});



type getCaptchaActionCreatorType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: string
}

export const getCaptchaActionCreator = (captchaUrl:string):getCaptchaActionCreatorType => ({type: GET_CAPTCHA_URL_SUCCESS, captchaUrl: captchaUrl})

export default authReducer;