import profileReducer from "./profile-reducer";
import {combineReducers, createStore} from "redux";
import usersReducer from "./users-reducer";


const RootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
})


export let store = createStore(RootReducer)

export type  RootReducerType = ReturnType<typeof store.getState>
//@ts-ignore
console.log(window.store = store)





