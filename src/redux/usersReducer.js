import {getUsersAPI} from "../api/api";

const FOLLOWED = 'FOLLOWED';
const UNFOLLOWED = 'UNFOLLOWED';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const IS_FETCHING = 'IS_FETCHING';
const FOLLOWING_PROCESS = 'FOLLOWING_PROCCESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followFetching: true,
    followingProcess: []
}


const usersReducer = (state = initialState, action) => {
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
export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(currentPage))
        let data = await getUsersAPI.getUsers(currentPage, pageSize)

        dispatch(setFetchingActionCreator(false));

        dispatch(setUsersActionCreator(data.items));
        dispatch(setTotalUsersCountActionCreator(data.totalCount));
    }
}


const generalFollowUnFollowThunkCreator = async (dispatch, id, methodAPI, actionCreator) => {
    dispatch(followingProcessActionCreator(id, true))
    let response = await methodAPI(id)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(followingProcessActionCreator(id, false))
}


export const followUserThunkCreator = (id) => {
    return async (dispatch) => {
        const methodAPI = getUsersAPI.followUser.bind(getUsersAPI);
        const actionCreator = followedActionCreator;
        generalFollowUnFollowThunkCreator(dispatch, id, methodAPI, actionCreator)
    }
}


export const unFollorUserThunkCreator = (id) => {
    return async (dispatch) => {
        const methodAPI = getUsersAPI.unFollowUser.bind(getUsersAPI);
        const actionCreator = unFollowedActionCreator;
        generalFollowUnFollowThunkCreator(dispatch, id, methodAPI, actionCreator)
    }

}

export const followedActionCreator = (userId) => ({type: FOLLOWED, userId: userId});
export const unFollowedActionCreator = (userId) => ({type: UNFOLLOWED, userId: userId});
export const setUsersActionCreator = (users) => ({type: SET_USERS, users: users});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalUsersCountActionCreator = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount: totalCount});
export const setFetchingActionCreator = (isFetching) => ({type: IS_FETCHING, isFetching: isFetching});
export const followingProcessActionCreator = (userId, followFetching) => ({
    type: FOLLOWING_PROCESS,
    userId: userId,
    followFetching: followFetching
})

export default usersReducer;