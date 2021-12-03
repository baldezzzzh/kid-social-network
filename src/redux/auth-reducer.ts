import {Dispatch} from "redux";
import {AuthApi} from "../api/api";

export type AuthStateType = {
    data: {
        id: string
        login: string
        email: string

    },
    isAuth: boolean
}

const initState = {
    data: {
        id: '',
        login: '',
        email: ''

    },
    isAuth: false
}


export const authReducer = (state: AuthStateType = initState, action: setAuthDataType) => {
    switch (action.type) {
        case "SET-AUTH-DATA": {
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.id,
                    login: action.login,
                    email: action.email
                },
                isAuth: true

            }
        }
        default:
            return state
    }
}


//Actions
export type setAuthDataType = ReturnType<typeof setAuthData>

export const setAuthData = (id: string, login: string, email: string) => {
    return {
        type: 'SET-AUTH-DATA',
        id,
        login,
        email
    } as const
}

//Thunk

export const setMyAuthData = () => {
    return (dispatch: Dispatch) => {
        AuthApi.authMe()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    dispatch(setAuthData(id, login, email))
                }
            })
    }
}