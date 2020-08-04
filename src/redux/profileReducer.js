import {getProfileAPI} from "../api/api";

const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'Hello! Adam!', likes: 20},
        {id: 2, message: 'Hello!I am Jackie!', likes: 10}
    ],
    userProfile: null,
    status: ''
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likes: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],

            }

        case SET_USER_PROFILE:
            return {...state, userProfile: action.profile}

        case SET_PROFILE_STATUS:
            return {
                ...state, status: action.status
            }
        default:
            return state;
    }

}


export const getProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        let response = await getProfileAPI.getProfile(userId)

        dispatch(setUserProfileActionCreator(response.data))

    }
}


export const getProfileStatusCreator = (userId) => {
    return async (dispatch) => {
        let response = await getProfileAPI.getProfileStatus(userId)
        dispatch(setProfileStatusActionCreator(response.data))

    }
}

export const updateProfileStatusCreator = (status) => {
    return async (dispatch) => {
        let response = await getProfileAPI.updateProfileStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setProfileStatusActionCreator(status))
        }

    }
}


export default profileReducer;

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText: newPostText});
export const setUserProfileActionCreator = (profile) => ({type: SET_USER_PROFILE, profile: profile});
export const setProfileStatusActionCreator = (status) => ({type: SET_PROFILE_STATUS, status: status});
