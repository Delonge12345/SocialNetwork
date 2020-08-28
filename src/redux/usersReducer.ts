import {getUsersAPI} from "../api/api";
import {UsersType} from "../types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

const FOLLOWED = 'FOLLOWED';
const UNFOLLOWED = 'UNFOLLOWED';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOWING_PROCESS = 'FOLLOWING_PROCCESS';





let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followFetching: true,
    followingProcess: [] as Array<number>//array of users Id
}

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action:ActionsTypes ):InitialStateType => {
    switch (action.type) {
        case FOLLOWED:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }

        case UNFOLLOWED:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })

            }
        case FOLLOWING_PROCESS:
            return {
                ...state,
                followingProcess: action.followFetching
                    ? [...state.followingProcess, action.userId]
                    : [state.followingProcess.filter(id => id != action.userId)]

            }

        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalCount}
        case IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default :
            return state
    }
}



type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionsTypes>;

export const getUsersThunkCreator = (currentPage:number, pageSize:number):ThunkType => {
    return async (dispatch,getState) => {
        dispatch(setFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(currentPage))
        let data = await getUsersAPI.getUsers(currentPage, pageSize)

        dispatch(setFetchingActionCreator(false));

        dispatch(setUsersActionCreator(data.items));
        dispatch(setTotalUsersCountActionCreator(data.totalCount));
    }
}


const _generalFollowUnFollowThunkCreator = async (dispatch:Dispatch<ActionsTypes>,
                                                  id:number, methodAPI:any, actionCreator:(userId:number)=>FollowedActionCreatorType | UnFollowedActionCreatorType) => {
    dispatch(followingProcessActionCreator(id, true))
    let response = await methodAPI(id)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(followingProcessActionCreator(id, false))
}


export const followUserThunkCreator = (id:number):ThunkType => {
    return async (dispatch) => {
        const methodAPI = getUsersAPI.followUser.bind(getUsersAPI);
        const actionCreator = followedActionCreator;
        _generalFollowUnFollowThunkCreator(dispatch, id, methodAPI, actionCreator)
    }
}


export const unFollorUserThunkCreator = (id:number):ThunkType => {
    return async (dispatch) => {
        const methodAPI = getUsersAPI.unFollowUser.bind(getUsersAPI);
        const actionCreator = unFollowedActionCreator;
        _generalFollowUnFollowThunkCreator(dispatch, id, methodAPI, actionCreator)
    }

}



type ActionsTypes = FollowedActionCreatorType
    | UnFollowedActionCreatorType
    | SetUsersActionCreatorType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | SetFetchingActionCreatorType
    | FollowingProcessActionCreatorType


type FollowedActionCreatorType = {
    type: typeof FOLLOWED,
    userId: number
}
type UnFollowedActionCreatorType = {
    type: typeof UNFOLLOWED,
    userId: number
}

type SetUsersActionCreatorType = {
    type: typeof SET_USERS,
    users: Array<UsersType>
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage:number
}
type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalCount:number
}
type SetFetchingActionCreatorType = {
    type: typeof IS_FETCHING,
    isFetching:boolean
}
type FollowingProcessActionCreatorType = {
    type: typeof FOLLOWING_PROCESS,
    userId:number,
    followFetching:boolean
}

export const followedActionCreator = (userId:number):FollowedActionCreatorType => ({type: FOLLOWED, userId: userId});
export const unFollowedActionCreator = (userId:number):UnFollowedActionCreatorType => ({type: UNFOLLOWED, userId: userId});
export const setUsersActionCreator = (users:Array<UsersType>):SetUsersActionCreatorType => ({type: SET_USERS, users: users});
export const setCurrentPageActionCreator = (currentPage:number):SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalUsersCountActionCreator = (totalCount:number):SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, totalCount: totalCount});
export const setFetchingActionCreator = (isFetching:boolean):SetFetchingActionCreatorType => ({type: IS_FETCHING, isFetching: isFetching});
export const followingProcessActionCreator = (userId:number, followFetching:boolean):FollowingProcessActionCreatorType => ({
    type: FOLLOWING_PROCESS,
    userId: userId,
    followFetching: followFetching
})

export default usersReducer;