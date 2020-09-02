import {getAuthMeAPI, ResultCodesEnum, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

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


type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionsTypes>;


export const getAuthMeThunkCreator = ():ThunkType => {
    return async (dispatch) => {
        let meData = await getAuthMeAPI.authMe()

        if (meData .resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = meData.data;
            dispatch(authMeActionCreator(id, email, login, true))
        }
    }
}

export const loginThunkCreator = (email:string, password:string, rememberMe:boolean, captcha:string):ThunkType => {return async (dispatch:any) => {
        let loginData = await getAuthMeAPI.login(email, password, rememberMe, captcha)

        if (loginData.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthMeThunkCreator())
        } else {
            if (loginData.resultCode === ResultCodesEnum.Error) {
                dispatch(captchaUrlThunkCreator())
            }
            let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
            dispatch(stopSubmit('loginAuth', {_error: message}));

        }
    }
}



export const logOutThunkCreator = ():ThunkType => {
    return async (dispatch:any) => {
        let response = await getAuthMeAPI.logOut()

        if (response.data.resultCode === ResultCodesEnum.Success) {
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


type ActionsTypes =   SetAuthMeActionCreatorType | getCaptchaActionCreatorType


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