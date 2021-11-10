import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
import {followUserAC, unfollowUserAC,  UsersType} from "../../redux/users-reducer";
import classes from "./Users.module.css";
import SocialIcons from "../Profile/SocialIcon/SocialIcon";

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
                <div className={classes.avatar}>
                    <img src="" alt="avatar"/>
                </div>
                <h4 className={classes.userName}>{u.name}</h4>
                <p>{u.message}</p>
                <p>{u.location.country}</p>
                <p>{u.location.city}</p>
                {u.followed
                    ? <button onClick={()=>onClickUnfollowHandler(u.id)} className={classes.userBtn}>Unfollow</button>
                    : <button onClick={()=>onClickFollowHandler(u.id)} className={classes.userBtn}>Follow</button>
                }
                <SocialIcons/>
            </div>
        )
    } )

    return(
        <div className={classes.user_inner}>
            {users}
        </div>
    )
}

export default User