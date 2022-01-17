

type AppReducerStateType = {
    isLoading: boolean
    isInitialized: boolean
}

const initialState: AppReducerStateType = {
    isLoading: false,
    isInitialized: false
}


export const appReducer = (state : AppReducerStateType = initialState, action: AppReducerActionsType) => {
    switch (action.type) {
        case "APP/SET-APP-IS-LOADING": {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case "APP/SET-APP-IS-INITIALIZED": {
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        }
        default: {
            return state
        }
    }
}


export const setAppIsInitialized = (isInitialized: boolean) => {
    return{
        type: 'APP/SET-APP-IS-INITIALIZED',
        isInitialized
    } as const
}

export const setAppIsLoading = (isLoading: boolean) => {
    return{
        type: 'APP/SET-APP-IS-LOADING',
        isLoading
    } as const
}


type AppReducerActionsType = ReturnType<typeof setAppIsLoading> | ReturnType<typeof setAppIsInitialized>