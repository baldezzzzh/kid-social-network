import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
import {followUserAC, unfollowUserAC,  UsersType} from "../../redux/users-reducer";
import classes from "./Users.module.css";

const User = () => {
    let getUsers = useSelector<RootReducerType, Array<UsersType>>(state => state.usersPage.users)
    let dispatch = useDispatch()
    const onClickUnfollowHandler = (userId: string) => {
        dispatch(unfollowUserAC(userId))
    }
    const onClickFollowHandler = (userId: string) => {
        dispatch(followUserAC(userId))
    }
    let users =  getUsers.map( u => {
        return(
            <div key={u.id} id={u.id} className={classes.user}>
                <img src="" alt="avatar"/>
                <p>{u.message}</p>
                <p>{u.name}</p>
                <p>{u.location.country}</p>
                <p>{u.location.city}</p>
                {u.followed
                    ? <button onClick={()=>onClickUnfollowHandler(u.id)}>Unfollow</button>
                    : <button onClick={()=>onClickFollowHandler(u.id)}>Follow</button>
                }

            </div>
        )
    } )

    return(
        <div>
            {users}
        </div>
    )
}

export default User