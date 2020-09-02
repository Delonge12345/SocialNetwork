import {getProfileAPI} from "../api/api";
import ProfileAPI from "../components/Profile/ProfileAPI";
import {stopSubmit} from "redux-form";
import {ProfileType,PostsType,PhotosType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO';


// type PostsType = {
//     id: number,
//     message: string,
//     likes:number
// }
// type ContactsType={
//     github:string,
//     vk:string,
//     facebook:string,
//     instagram:string,
//     twitter:string,
//     website:string,
//     youtube:string,
//     mainLink:string
// }
// type PhotosType = {
//     small:string | null,
//     large:string | null
// }
// type ProfileType = {
//     userId:number,
//     lookingForAJob:boolean,
//     lookingForAJobDescription:string,
//     fullName:string,
//     contacts:ContactsType
// }

let initialState = {
    posts: [
        {id: 1, message: 'Hello! Adam!', likes: 20},
        {id: 2, message: 'Hello!I am Jackie!', likes: 10}
    ] as Array<PostsType>,
    userProfile: null as ProfileType | null,
    status: '',
    photos: null as PhotosType | null
}

export type InitialStateType = typeof initialState;


const profileReducer = (state = initialState, action:any):InitialStateType => {
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
        case SET_PROFILE_PHOTO:
            return {
                ...state,userProfile: {...state.userProfile,photos: action.photo}
            }


        default:
            return state;
    }

}


type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionsTypes>;

export const getProfileThunkCreator = (userId:number):ThunkType=> {
    return async (dispatch) => {
        let response = await getProfileAPI.getProfile(userId)

        dispatch(setUserProfileActionCreator(response.data))

    }
}


export const getProfileStatusCreator = (userId:number):ThunkType => {
    return async (dispatch) => {
        let response = await getProfileAPI.getProfileStatus(userId)
        dispatch(setProfileStatusActionCreator(response.data))

    }
}

export const updateProfileStatusCreator = (status:string):ThunkType => {
    return async (dispatch) => {
        let response = await getProfileAPI.updateProfileStatus(status)

        if (response.data.resultCode === 0) {
            dispatch(setProfileStatusActionCreator(status))
        }

    }
}

export const savePhotoThunkCreator = (file:PhotosType):ThunkType => {
    return async (dispatch) => {
        let response = await getProfileAPI.savePhoto(file);
        if (response.data.resultCode === 0) {
            dispatch(setProfilePhotoActionCreator(response.data.data.photos))
        }
    }
}

export const saveProfileThunkCreator = (profile:ProfileType):ThunkType => {
    return async (dispatch,getState) => {
        const userId = getState().authPage.id
        let response = await getProfileAPI.saveProfileData(profile)
        if (response.data.resultCode === 0) {
            dispatch(getProfileThunkCreator(userId))
        } else{
            dispatch(stopSubmit("EditProfileData",{_error:response.data.messages[0]}));
            return Promise.reject(response.data.messages[0]);
        }

    }
}

export default profileReducer;


type ActionsTypes = AddPostActionCreatorType | SetUserProfileActionCreatorType | SetProfileStatusActionCreatorType| SetProfilePhotoActionCreatorType

type AddPostActionCreatorType = {
    type:typeof ADD_POST,
    newPostText:string
}
type SetUserProfileActionCreatorType = {
    type:typeof SET_USER_PROFILE,
    profile:any
}
type SetProfileStatusActionCreatorType = {
    type:typeof SET_PROFILE_STATUS,
    status:string
}
type SetProfilePhotoActionCreatorType = {
    type:typeof SET_PROFILE_PHOTO,
    photo:PhotosType
}

export const addPostActionCreator = (newPostText:string):AddPostActionCreatorType => ({type: ADD_POST, newPostText: newPostText});
export const setUserProfileActionCreator = (profile:ProfileType):SetUserProfileActionCreatorType => ({type: SET_USER_PROFILE, profile: profile});
export const setProfileStatusActionCreator = (status:string):SetProfileStatusActionCreatorType => ({type: SET_PROFILE_STATUS, status: status});
export const setProfilePhotoActionCreator = (file:PhotosType):SetProfilePhotoActionCreatorType => ({type: SET_PROFILE_PHOTO, photo: file})
