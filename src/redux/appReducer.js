import React from "react";
import {getAuthMeThunkCreator} from "./authReducer";

const APP_INITIALIZE = 'APP_INITIALIZE'

const initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_INITIALIZE:
            return {...state, initialized: true}

        default:
            return state

    }
}


export const initializedThunkCreator = () => {
    return async (dispatch) => {

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

export const initializedActionCreator = () => ({type: APP_INITIALIZE})