import {Dispatch} from "redux";
import {AuthApi} from "../DAL/api";

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


export const authReducer = (state: AuthStateType = initState, action: authActionsType) => {
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
                isAuth: action.isAuth

            }
        }
        case "SET-IS-LOGIN": {
            return {
                ...state,
                data: {
                    ...state.data,
                    id: action.id
                }
            }
        }
        default:
            return state
    }
}


//Actions

export type authActionsType = setIsLoginType | setAuthDataType;

export type setAuthDataType = ReturnType<typeof setAuthData>

export const setAuthData = (id: string | null, login: string | null, email: string | null, isAuth: boolean) => {
    return {
        type: 'SET-AUTH-DATA',
        id,
        login,
        email,
        isAuth
    } as const
}

export type setIsLoginType = ReturnType<typeof setIsLogin>
export const setIsLogin = (id: number) => {
    return {
        type: 'SET-IS-LOGIN',
        id
    } as const
}

//Thunk

export const setMyAuthData = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await AuthApi.authMe()
            if (response.data.resultCode === 0) {
                let {id, login, email} = response.data.data;
                dispatch(setAuthData(id, login, email, true))
            }
        }
        catch (error: any){}
    }
}

export const getIsLogin = (email: string, password: string, rememberMe: boolean) => {
    return (dispatch: Dispatch) => {
        AuthApi.login(email, password, rememberMe)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    // @ts-ignore
                    dispatch(setMyAuthData())
                }
            })
    }
}

export const logOut = () => {
    return (dispatch: Dispatch) => {
        AuthApi.logOut()
            .then((response) => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthData(null, null, null, false))
                }
            })
    }
}
