import {Dispatch} from "redux";
import {ProfileApi} from "../api/api";

export type ProfilePageType = {
    posts: Array<PostType>
    profileInfo: ProfileInfo
    newPostMessage: string
    aboutUserInfo: UserType
    userProfile: UserProfileType

}
export type PostType = {
    id: string
    message: string
    likesCounter: number
}
export type ProfileInfo = {
    postsNumber: number
    friendsNumber: number
    commentsNumber: number
    // avatar: string
    userName: string
    membership: string
    photos: {
        small: string
        large: string
    }
}
export type UserType = {
    userDescription: string
    joinTime: string
    userAddress: string
}
export type UserProfileType = {
        photos: {
            small: string
            large: string
        }
        fullName: string
}


const initState: ProfilePageType = {
    posts: [
        {id: '1', message: 'Hello, i am Julian!', likesCounter: 22},
        {id: '2', message: 'Hello, i am Lili!', likesCounter: 42},
        {id: '3', message: 'Hello, i am Juliana!', likesCounter: 12}
    ],
    profileInfo: {
        postsNumber: 10,
        friendsNumber: 22,
        commentsNumber: 15,
        photos: {
            small: '',
            large: ''
        },
        // avatar: 'https://e7.pngegg.com/pngimages/1009/704/png-clipart-avatar-child-computer-icons-user-profile-smiling-boy-child-face-thumbnail.png',
        userName: 'Julius Kenard',
        membership: 'Pro Member',
    },
    userProfile: {
        photos: {
            small: '',
            large: ''
        },
        fullName: 'Julius Kenard'
    },
    newPostMessage: 'He He suiii!',
    aboutUserInfo: {
        userDescription: 'Hi! My name is Julius but some people may know me as GameHunter! ' +
            'I have a Twitch channel where I stream, play and review all the newest games.',
        joinTime: 'September 23, 2020',
        userAddress: 'Los Angeles, California'
    }

}

const profileReducer = (state: ProfilePageType = initState, action: GenericType) => {
    switch (action.type) {
        case "UPDATE-POST-VALUE": {
            return {
                ...state,
                newPostMessage: action.newPostValue
            }
        }
        case "ADD-NEW-POST": {
            let newPost =  {id: '3', message: action.newValue, likesCounter: 12}
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostMessage: ''
            }
        }
        case "INCREASE-LIKES": {
            return {
                ...state,
                posts: state.posts.map( p => action.postId === p.id ? {...p, likesCounter: action.likesCounter + 1 } : p )
            }
        }
        case "SET-USER-PROFILE": {
            return {
                ...state,
                userProfile: action.userProfile
            }
        }

    }
    return state
}

export type GenericType = updateNewPostMessageACType | addNewPostACType | incLikesACType | setUserProfileType;
//Actions
export type updateNewPostMessageACType = ReturnType<typeof updateNewPostMessageAC>
export const updateNewPostMessageAC = (value: string) => {
    return{
        type: 'UPDATE-POST-VALUE',
        newPostValue: value
    }as const
}

export type addNewPostACType = ReturnType<typeof addNewPostAC>
export const addNewPostAC = (newValue: string) => {
    return{
        type: 'ADD-NEW-POST',
        newValue
    } as const
}

export type incLikesACType = ReturnType<typeof incLikesAC>
export const incLikesAC = (postId: string, likesCounter: number) => {
    return{
        type: 'INCREASE-LIKES',
        postId,
        likesCounter
    } as const
}

export type setUserProfileType = ReturnType<typeof setUserProfile>
export const setUserProfile = (userProfile: any) => {
    return{
        type: 'SET-USER-PROFILE',
        userProfile
    } as const
}
//Thunk

export const setUSerProfile = (paramsId: string | undefined) => {
    return (dispatch: Dispatch) => {
        ProfileApi.getProfile(paramsId)
            .then(response => {
                dispatch(setUserProfile(response.data))
            })
    }
}

export default profileReducer