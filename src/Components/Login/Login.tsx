import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import classes from "./Login.module.scss";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../BLL/store";
import {Navigate} from "react-router-dom";


const Login = () => {

    // @ts-ignore
    const isAuth = useSelector<RootReducerType, boolean>(state => state.authPage.isAuth)


    return (
        isAuth
            ? <Navigate replace to="/profile"/>
            :
            <div className={classes.inner}>
                <LoginForm/>
            </div>
    )
}

export default Login