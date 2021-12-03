import React, {useEffect} from "react";
import classes from "./Header.module.css";
import headerLogo from './headerImages/header-logo.png'
import Button from "../Buttons/Button";
import {AuthApi} from "../../api/api";
import {AuthStateType, setAuthData, setMyAuthData} from "../../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
const Header = React.memo(() => {

    let authData = useSelector<RootReducerType, AuthStateType>(state => state.authPage)
    let dispatch = useDispatch()

    useEffect( () => {
        dispatch(setMyAuthData())
    } ,[] )


    return(
        <header>
            <div className={classes.inner}>
                <div className={classes.logoInner}>
                    <a href="#" className={classes.logo}>
                        <img src={headerLogo} alt="header-logo"/>
                    </a>
                    <p>bugaboo</p>
                </div>
                <div className={classes.bigMenuSwitcher}>
                    switcher
                </div>
                <ul className={classes.menu}>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Features</a>
                    </li>
                    <li>
                        <a href="#">More</a>
                    </li>
                </ul>
                <div className={classes.search}>
                    <input type="search"/>
                </div>
                {authData.isAuth ? <p>{authData.data.login}</p> :  <Button className={classes.login} onClick={()=>{} } text={'Login'}/>}

                {/*<a href="#" className={classes.login}>Login</a>*/}
            </div>
        </header>
    )
})

export default Header