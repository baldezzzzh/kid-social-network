import {ArticleItemType, NewsApi} from "../DAL/api";
import {Dispatch} from "redux";


export type NewsInitStateType = {
    articles: Array<ArticleItemType>
    totalResults: number
    currentPage: number
    articlesCount: number
    isFetching: boolean
}

const initState = {
    articles: [],
    totalResults: 0,
    currentPage: 1,
    articlesCount: 10,
    isFetching: false
}

export const newsReducer = (state: NewsInitStateType = initState, action: GenericActionType) => {
    switch (action.type) {
        case "NEWS/SET-NEWS-STATE": {
            return {
                ...state,
                articles: action.articles
            }
        }
        case "NEWS/SET-NEWS-TOTAL-ITEMS": {
            return {
                ...state,
                totalResults: action.itemsCount
            }
        }
        case "NEWS/SET-NEWS-CURRENT-PAGE": {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case "NEWS/SET-NEWS-IS-FETCHING": {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }


        default: return state
    }
}

type GenericActionType = setNewsStateType | setNewsTotalItemsType | setNewsCurrentPage | setNewsIsFetchingType;

type setNewsStateType = ReturnType<typeof setNewsState>

type setNewsTotalItemsType = ReturnType<typeof setNewsTotalItems>

type setNewsCurrentPage = ReturnType<typeof setNewsCurrentPage>

type setNewsIsFetchingType = ReturnType<typeof setNewsIsFetching>

export const setNewsState = (articles: Array<ArticleItemType>) => {
    return{
        type: 'NEWS/SET-NEWS-STATE',
        articles
    } as const
}


export const setNewsTotalItems = (itemsCount: number) => {
    return{
        type: 'NEWS/SET-NEWS-TOTAL-ITEMS',
        itemsCount
    } as const
}

export const setNewsCurrentPage = (currentPage: number) => {
    return{
        type: 'NEWS/SET-NEWS-CURRENT-PAGE',
        currentPage
    } as const
}

export const setNewsIsFetching = (isFetching: boolean) => {
    return{
        type: 'NEWS/SET-NEWS-IS-FETCHING',
        isFetching
    } as const
}

export const getNewsState = (articlesCount: number, currentPage: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setNewsCurrentPage(currentPage))
        dispatch(setNewsIsFetching(true))
        NewsApi.getNews(articlesCount, currentPage)
            .then((response)=>{
                console.log(response.data.articles)
                dispatch(setNewsState(response.data.articles))
                dispatch(setNewsTotalItems(response.data.totalResults))
                dispatch(setNewsIsFetching(false))
            })
    }
}


