import profileReducer from "./profile-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./users-reducer";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {dailyQuoteReducer} from "./daily-quote-reducer";
import {newsReducer} from "./news-reducer";
import {spotifyReducer} from "./spotify-reducer";
import {appReducer} from "./app-reducer";

const RootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    authPage: authReducer,
    dailyQuotePage: dailyQuoteReducer,
    newsPage: newsReducer,
    musicPage: spotifyReducer,
    appPage: appReducer,
    spotifyPage: spotifyReducer
})


export let store = createStore(RootReducer, applyMiddleware(thunkMiddleware))

export type  RootReducerType = ReturnType<typeof store.getState>
//@ts-ignore
console.log(window.store = store)





