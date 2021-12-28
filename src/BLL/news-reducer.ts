import {ArticleItemType, NewsApi} from "../DAL/api";
import {Dispatch} from "redux";


export type NewsInitStateType = {
    articles: Array<ArticleItemType>
    totalResults: number
    currentPage: number
    articlesCount: number
    isFetching: boolean
    isSuccess: boolean | null
    warning: boolean | null
}

const initState = {
    articles: [
        {
            author: "Kerrie Hughes",
            content: "2021-12-27T10:15:08.991Z\r\n(Image credit: Nintendo)\r\nMorning everyone! Do you wish it could be Christmas every day? Well it kind of is, with today being the official substitute day for Christmas Day i… [+11015 chars]",
            description: "The best deals on Nintendo Switch, games and accessories.",
            publishedAt: "2021-12-27T08:17:11Z",
            source: {id: '', name: "Creative Bloq"},
            title: "Nintendo Switch after Christmas sales live blog: the best Nintendo Switch deals live now - Creative Bloq",
            url: "https://www.creativebloq.com/news/live/nintendo-switch-boxing-day-deals",
            urlToImage: "https://cdn.mos.cms.futurecdn.net/daVy7d593wadBE4FPTuDTa-1200-80.jpg"
        },
        {
            author: "Liam Doolan",
            content: "Dragon Quest X Offline for Nintendo Switch was due to arrive in Japan on 26th February next year, but it's now the latest game to delayed.\r\nThe title will now launch in Summer 2022, and the DLC expan… [+589 chars]",
            description: "The team wants it to be the best experience possible",
            publishedAt: "2021-12-27T03:45:00Z",
            source: {id: '', name: "Nintendo Life"},
            title: "Dragon Quest X Offline Has Been Delayed Until Summer 2022 - Nintendo Life",
            url: "https://www.nintendolife.com/news/2021/12/dragon-quest-x-offline-has-been-delayed-until-summer-2022",
            urlToImage: "https://images.nintendolife.com/8556368c22c93/1280x720.jpg"
        },
        {
            author: "Adam Bankhurst",
            content: "Square Enix has confirmed that, due to the ongoing COVID-19 pandemic, Final Fantasy 16's development has been delayed by \"almost a half year\" and the next big reveal will not take place until Spring … [+3173 chars]",
            description: "Square Enix has confirmed that, due to the ongoing COVID-19 pandemic, Final Fantasy 16's development has been delayed by \"almost a half year\" and the next big reveal will not take place until Spring 2022.",
            publishedAt: "2021-12-27T05:48:45Z",
            source: {id: "ign", name: "IGN"},
            title: "Final Fantasy 16's Development Delayed by 'Almost a Half Year,' Big Reveal Will Take Place in Spring 2022 - IGN - IGN",
            url: "https://www.ign.com/articles/final-fantasy-16-development-delayed-by-almost-half-a-year-big-reveal-will-take-place-in-spring-2022",
            urlToImage: "https://assets-prd.ignimgs.com/2021/12/27/ff16-poster-1603968298410-1640583091711.jpg?width=1280"
        },
        {
            author: "Alan Friedman",
            content: "This is our new notification center.\r\n Inside, you will find updates on the most important things happening right now.\r\nGot it",
            description: "Google is asking Pixel 6 users to help it test a fix for a bug that causes the new handsets to lose connectivity with users' cellular providers.",
            publishedAt: "2021-12-26T22:44:01Z",
            source: {id: '', name: "PhoneArena"},
            title: "Google asks 5G Pixel 6 users to help it test a fix for the connectivity bug - PhoneArena",
            url: "https://www.phonearena.com/news/google-tests-fix-for-5g-pixel-6-connectivity-bug_id137417",
            urlToImage: "https://m-cdn.phonearena.com/images/article/137417-wide-two_1200/Google-asks-5G-Pixel-6-users-to-help-it-test-a-fix-for-the-connectivity-bug.jpg"
        }
    ],
    totalResults: 0,
    currentPage: 1,
    articlesCount: 10,
    isFetching: false,
    isSuccess: null,
    warning: null
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
        case "NEWS/SET-NEWS-RESPONSE-SUCCESS":{
            return {
                ...state,
                isSuccess: action.isSuccess
            }
        }
        case "NEWS/SET-NEWS-WARNING": {
            return {
                ...state,
                warning: action.warning
            }
        }


        default:
            return state
    }
}

type GenericActionType = setNewsStateType
    | setNewsTotalItemsType
    | setNewsCurrentPage
    | setNewsIsFetchingType
    | setNewsResponseSuccessType
    | setNewsWarningType;

type setNewsStateType = ReturnType<typeof setNewsState>

type setNewsTotalItemsType = ReturnType<typeof setNewsTotalItems>

type setNewsCurrentPage = ReturnType<typeof setNewsCurrentPage>

type setNewsIsFetchingType = ReturnType<typeof setNewsIsFetching>

type setNewsResponseSuccessType = ReturnType<typeof setNewsResponseSuccess>

type setNewsWarningType = ReturnType<typeof setNewsWarning>

export const setNewsState = (articles: Array<ArticleItemType>) => {
    return {
        type: 'NEWS/SET-NEWS-STATE',
        articles
    } as const
}


export const setNewsTotalItems = (itemsCount: number) => {
    return {
        type: 'NEWS/SET-NEWS-TOTAL-ITEMS',
        itemsCount
    } as const
}

export const setNewsCurrentPage = (currentPage: number) => {
    return {
        type: 'NEWS/SET-NEWS-CURRENT-PAGE',
        currentPage
    } as const
}

export const setNewsIsFetching = (isFetching: boolean) => {
    return {
        type: 'NEWS/SET-NEWS-IS-FETCHING',
        isFetching
    } as const
}

export const setNewsResponseSuccess = (isSuccess: boolean) => {
    return{
        type: 'NEWS/SET-NEWS-RESPONSE-SUCCESS',
        isSuccess
    } as const
}

export const setNewsWarning = (warning: boolean) => {
    return{
        type: 'NEWS/SET-NEWS-WARNING',
        warning
    } as const
}

export const getNewsState = (articlesCount: number, currentPage: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setNewsCurrentPage(currentPage))
        dispatch(setNewsIsFetching(true))
        NewsApi.getNews(articlesCount, currentPage)
            .then((response) => {
                if (response.status === 200){
                    console.log(response.data.articles)
                    dispatch(setNewsResponseSuccess(true))
                    dispatch(setNewsState(response.data.articles))
                    dispatch(setNewsTotalItems(response.data.totalResults))
                }
            })
            .catch(()=>{
                dispatch(setNewsResponseSuccess(false))
            })
            .finally(()=> {
                dispatch(setNewsIsFetching(false))
            })
    }
}


