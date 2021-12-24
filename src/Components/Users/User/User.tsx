import React from "react";
import classes from "../Users.module.css";
import {NavLink} from "react-router-dom";
import SocialIcons from "../../Profile/SocialIcon/SocialIcon";
import {UsersType} from "../../../BLL/users-reducer";
import userAvatar from './../../../images/profile-avatar.png'

type UserPropsType = {
    user: UsersType
    userIsFollowed: Array<string>
    onClickUnfollowHandler: (userId: string) => void
    onClickFollowHandler: (userId: string) => void
}

const User = React.memo(({user, userIsFollowed, onClickFollowHandler, onClickUnfollowHandler,  ...props}: UserPropsType) => {
    console.log('user')
    return(
        <div key={user.id} id={user.id} className={classes.user}>
            <div className={classes.avatar}>
                <img src={user.photos.small === null ? userAvatar : user.photos.small} alt="avatar"/>
            </div>
            <NavLink to={'/profile/' + user.id} className={classes.visitUser}>
                <h4 className={classes.userName}>{user.name}</h4>
            </NavLink>

            <p>{user.message}</p>
            {user.followed
                ? <button disabled={userIsFollowed.some(id => id === user.id)}
                          onClick={() => onClickUnfollowHandler(user.id)} className={classes.userBtn}>Unfollow</button>
                : <button disabled={userIsFollowed.some(id => id === user.id)}
                          onClick={() => onClickFollowHandler(user.id)} className={classes.userBtn}>Follow</button>
            }
            <SocialIcons/>
        </div>
    )
})

export default User