import profileReducer from "./profile-reducer";
import {combineReducers, createStore, Store} from "redux";
import usersReducer from "./users-reducer";


const RootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
})
export type  RootReducerType = ReturnType<typeof RootReducer>

export let store: Store<RootReducerType> = createStore(RootReducer)


//@ts-ignore
console.log(window.store = store)





