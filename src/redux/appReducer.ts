import React from "react";
import {getAuthMeThunkCreator} from "./authReducer";

const APP_INITIALIZE = 'APP_INITIALIZE'



export type InitialStateType = {
    initialized: boolean
}

const initialState:InitialStateType = {
    initialized: false
}

export const appReducer = (state:InitialStateType = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case APP_INITIALIZE:
            return {...state, initialized: true}

        default:
            return state

    }
}





export const initializedThunkCreator = () => {
    return async (dispatch:any) => {

        let promises = dispatch(getAuthMeThunkCreator());
        promises = [promises]
        for await (let promise of promises) {
            dispatch(initializedActionCreator())
        }
        // Promise.all([promise]).then(() => {
        //     dispatch(initializedActionCreator())
        // })
    }
}


type InitializedSuccessActionType = {
    type: typeof APP_INITIALIZE;
}

export const initializedActionCreator = ():InitializedSuccessActionType => ({type: APP_INITIALIZE})