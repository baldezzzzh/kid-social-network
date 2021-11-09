import React from "react";
import classes from "./AboutMe.module.css";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../../redux/store";
import {UserType} from "../../../../redux/profile-reducer";

const AboutMe = () => {

    let userInfo = useSelector<RootReducerType, UserType>(state => state.profilePage.aboutUserInfo)

    return(
        <div className={classes.inner}>
            <h3 className={classes.title}>About Me</h3>
            <div className={classes.line}>
                <p className={classes.description}>{userInfo.userDescription}</p>
            </div>
            <div className={classes.line}>
                <p>Joined</p>
                <p>{userInfo.joinTime}</p>
            </div>
            <div className={classes.line}>
                <p>Location</p>
                <p>{userInfo.userAddress}</p>
            </div>
        </div>
    )
}

export default AboutMe