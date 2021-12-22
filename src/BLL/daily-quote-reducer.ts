import {Dispatch} from "redux";
import {CommonApi} from "../api/api";

type setDailyQuoteType = ReturnType<typeof setDailyQuote>
type setQuoteIsFetchingType = ReturnType<typeof setQuoteIsFetching>

type GenericType = setDailyQuoteType | setQuoteIsFetchingType;
type initStateType = {
    quote: string
    isFetching: boolean
}

const initState = {
    quote: '',
    isFetching: false
}

export const dailyQuoteReducer = (state: initStateType = initState, action: GenericType) => {
    switch (action.type) {
        case "SET-QUOTE": {
            return {
                ...state,
                quote: action.quote
            }
        }
        case "SET-QUOTE-IS-FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default: return state
    }
}

export const setDailyQuote = (quote: string) => {
    return{
        type: 'SET-QUOTE',
        quote
    } as const
}

export const setQuoteIsFetching = (isFetching: boolean) => {
    return{
        type: 'SET-QUOTE-IS-FETCHING',
        isFetching
    } as const
}

export const getDailyQuote = () => {
    return (dispatch: Dispatch) => {
        dispatch(setQuoteIsFetching(true))
        CommonApi.getDailyQuote()
            .then((response) => {
                console.log(response.data.quote)
                dispatch(setQuoteIsFetching(false))
                dispatch(setDailyQuote(response.data.quote))
            })
    }
}