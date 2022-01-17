import React, {useEffect} from "react";
import classes from "./Header.module.css";
import headerLogo from './headerImages/header-logo.png'
import Button from "../Buttons/Button";
import {AuthStateType, logOut, setMyAuthData} from "../../redux-store/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux-store/store";
import {NavLink, useNavigate} from "react-router-dom";

const Header = React.memo(() => {

    let authData = useSelector<RootReducerType, AuthStateType>(state => state.authPage)
    const navigate = useNavigate();
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(setMyAuthData())
    }, [dispatch])

    const onLogout = () => {
        dispatch(logOut())
    }

    const onLogin = () => {
        navigate('/login')
    }

    return (
        <header>
            <div className={classes.inner}>
                <div className={classes.logoInner}>
                    <NavLink to={'/profile'} className={classes.logo}>
                        <img src={headerLogo} alt="header-logo"/>
                    </NavLink>
                    <p>Lumos</p>
                </div>
                {/*<div className={classes.bigMenuSwitcher}>*/}
                {/*    switcher*/}
                {/*</div>*/}
                {/*<ul className={classes.menu}>*/}
                {/*    <li>*/}
                {/*        <a href="#">Home</a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="#">Features</a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*        <a href="#">More</a>*/}
                {/*    </li>*/}
                {/*</ul>*/}
                {/*<div className={classes.search}>*/}
                {/*    <input type="search"/>*/}
                {/*</div>*/}
                <div >
                    {
                        authData.isAuth
                            ?
                            <div className={classes.loginButtons}>
                                <p className={classes.userName}>Welcome {authData.data.login}</p>
                                <Button className={'commonBtn'} onClick={onLogout} text={'Log out'}/>
                            </div>
                            :
                            <Button className={'commonBtn'} onClick={onLogin} text={'Login'}/>
                    }

                </div>
            </div>
        </header>
    )
})

export default Header