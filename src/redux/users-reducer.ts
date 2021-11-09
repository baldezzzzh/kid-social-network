
export type UserPageType = {
    users: Array<UsersType>
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
}

const initState: UserPageType = {
    users: [
        {
            id: '1', name: 'Jacob', message: 'Hi hi', location: {
                country: 'USA',
                city: 'Los Angeles'
            },
            followed: false
        },
        {
            id: '2', name: 'Julia', message: 'He he', location: {
                country: 'Sweden',
                city: 'Stockgolm'
            },
            followed: false
        },
        {
            id: '3', name: 'James', message: 'Lebron', location: {
                country: 'USA',
                city: 'Miami'
            },
            followed: false
        }
    ]
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
        default: {
            return state
        }
    }
}


type GenericType = followUserACType | unfollowUserACType;

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

export default usersReducer