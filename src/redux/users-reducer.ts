
export type UserPageType = {
    users: Array<UsersType>
    pagesNumber: number
    usersCount: number
    currentPage: number
    totalCount: number
    isFetching: boolean

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
    pagesNumber: 5,
    usersCount: 10,
    currentPage: 2,
    totalCount: 10,
    isFetching: true
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
        default: {
            return state
        }
    }
}


type GenericType = followUserACType | unfollowUserACType | setUsersACType |  setTotalUsersCountType | setCurrentPageType | setISFetchingType;

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


export default usersReducer