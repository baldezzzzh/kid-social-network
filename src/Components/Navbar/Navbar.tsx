import React from "react";
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";
import profileIcon from './images/profile.svg';
import messagesIcon from './images/messages.svg'
import settingIcon from './images/settings.svg'
import musicIcon from './images/music.svg'
import userIcon from './images/users.svg'
import newsIcon from './images/news.svg'
const Navbar = React.memo(() => {
    return(
        <nav className= {classes.navbar}>
            <ul className={classes.menu}>
                <li className={classes.item}>
                    <NavLink to="/profile" className={classes.link}>
                        <img src={profileIcon} alt="profile"/>
                        Profile
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/news" className={classes.link}>
                        <img src={newsIcon} alt="news"/>
                        News
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/dialogs" className={classes.link}>
                        <img src={messagesIcon} alt="messages"/>
                        Messages
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/users" className={classes.link}>
                        <img src={userIcon} alt="users"/>
                        Users
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/daily-quote" className={classes.link}>
                        <img src={settingIcon} alt="daily-quote"/>
                        Daily Quote
                    </NavLink>
                </li>
                <li className={classes.item}>
                    <NavLink to="/music" className={classes.link}>
                        <img src={musicIcon} alt="music"/>
                        Music
                    </NavLink>
                </li>
                {/*<li className={classes.item}>*/}
                {/*    <NavLink to="/settings" className={classes.link}>*/}
                {/*        <img src={settingIcon} alt="settings"/>*/}
                {/*        Settings*/}
                {/*    </NavLink>*/}
                {/*</li>*/}
            </ul>
        </nav>
    )
})

export default Navbar