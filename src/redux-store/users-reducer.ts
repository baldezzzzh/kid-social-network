import {Dispatch} from "redux";
import {UsersApi} from "../DAL/api";

export type UserPageType = {
    users: Array<UsersType>
    pagesNumber: number
    usersCount: number
    currentPage: number
    totalCount: number
    isFetching: boolean
    isFollowed: Array<string>
    s: boolean

}

export type UsersType = {
    id: string
    name: string
    message: string
    location: {
        country: string
        city: string
    }
    followed: boolean
    photos: {
        small: string
        large: string
    }
}
const initState: UserPageType = {
    users: [],
    pagesNumber: 10,
    usersCount: 10,
    currentPage: 2,
    totalCount: 10,
    isFetching: true,
    isFollowed: [],
    s: false
}



const usersReducer = (state: UserPageType = initState, action: GenericType) => {
    switch (action.type) {
        case "FOLLOW-USER": {
            return {
                ...state,
                users: state.users.map( u => u.id === action.userId ? {...u, followed: true} : u  )
            }
        }
        case "UNFOLLOW-USER": {
            return {
                ...state,
                users: state.users.map( u => u.id === action.userId ? {...u, followed: false} : u )
            }
        }
        case "SET-USERS": {
            return {
                ...state,
                users: action.users
            }
        }
        case "SET-TOTAL-USERS-COUNT": {
            return {
                ...state,
                totalCount: action.totalCount
            }
        }
        case "SET-CURRENT-PAGE": {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case "SET-PRELOADER": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case "SET-IS-FOLLOWED": {
            return {
                ...state,
                isFollowed: action.s
                    ? [...state.isFollowed, action.userId]
                    : [...state.isFollowed.filter(id => id !== action.userId)]
            }
        }
        default: {
            return state
        }
    }
}


type GenericType = followUserACType | unfollowUserACType | setUsersACType
    | setTotalUsersCountType | setCurrentPageType | setISFetchingType | setISFollowedType;

// Actions
export type followUserACType = ReturnType<typeof followUserAC>
export const followUserAC = (userId: string) => {
    return{
        type: 'FOLLOW-USER',
        userId
    } as const
}

export type unfollowUserACType = ReturnType<typeof unfollowUserAC>
export const unfollowUserAC = (userId: string) => {
    return{
        type: 'UNFOLLOW-USER',
        userId
    } as const
}

export type setUsersACType = ReturnType<typeof setUsersAC>
export const setUsersAC = (users: Array<UserPageType>) => {
    return{
        type: 'SET-USERS',
        users
    } as const
}

export type setTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
export const setTotalUsersCount = (totalCount: number) => {
    return{
        type: 'SET-TOTAL-USERS-COUNT',
        totalCount
    } as const
}

export type setCurrentPageType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage: number) => {
    return{
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}

export type setISFetchingType = ReturnType<typeof setISFetching>
export const setISFetching = (isFetching: boolean) => {
    return{
        type: 'SET-PRELOADER',
        isFetching
    } as const
}

export type setISFollowedType = ReturnType<typeof setISFollowed>
export const setISFollowed = (s: boolean, userId: string) => {
    return{
        type: 'SET-IS-FOLLOWED',
        s,
        userId
    } as const
}

// Thunk
export const getUsers = (usersCount: number, currentPage: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(setISFetching(true))
        UsersApi.getUsers(usersCount, currentPage)
            .then(response => {
                dispatch(setUsersAC(response.items))
                dispatch(setISFetching(false))
            })
    }
}

export const followUser = (userId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setISFollowed(true, userId))
        UsersApi.followUser(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followUserAC(userId))
                    dispatch(setISFollowed(false, userId))
                }
            })
    }
}

export const unFollowUser = (userId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setISFollowed(true, userId))
        UsersApi.unFollowUser(userId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowUserAC(userId))
                    dispatch(setISFollowed(false, userId))
                }
            })
    }
}


export default usersReducer