import React, {useCallback, useEffect} from "react";
import classes from "./Users.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../BLL/store";
import {followUser, getUsers, unFollowUser, UserPageType} from "../../BLL/users-reducer";
import {Navigate, NavLink} from "react-router-dom";
import SocialIcons from "../Profile/SocialIcon/SocialIcon";
import Preloader from "../Preloader/Preloader";
import User from "./User/User";

const Users = React.memo(() => {

    let dispatch = useDispatch()

    const usersPage = useSelector<RootReducerType, UserPageType>(state => state.usersPage)
    // @ts-ignore
    let isAuth = useSelector<RootReducerType, boolean>(state => state.authPage.isAuth)


    useEffect(() => {
        dispatch(getUsers(usersPage.usersCount, usersPage.currentPage))
    }, [])


    const setCurrentPageHandler = useCallback((currentPage: number) => {
        dispatch(getUsers(usersPage.usersCount, currentPage))
    },[dispatch, usersPage.usersCount])



    const onClickUnfollowHandler = useCallback((userId: string) => {
        dispatch(unFollowUser(userId))
    },[dispatch])

    const onClickFollowHandler = useCallback((userId: string) => {
        dispatch(followUser(userId))
    },[dispatch])


    let paginationArr = [];

    for (let i = 1; i < 10; i++) {
        paginationArr.push(i)
    }

    let pagination = paginationArr.map(p => {
        return (
            <button className={usersPage.currentPage === p ? classes.activePaginationBtn : classes.paginationBtn}
                    onClick={() => {
                        setCurrentPageHandler(p)
                    }}>{p}</button>
        )
    })


    let users = usersPage.users.map(u => {
        return (
            <User
                user={u}
                userIsFollowed={usersPage.isFollowed}
                onClickUnfollowHandler={onClickUnfollowHandler}
                onClickFollowHandler={onClickFollowHandler}
            />
        )
    })


    return(
        !isAuth ?
            <Navigate replace to="/login" />
            :
        <section className={classes.users}>
            {usersPage.isFetching ? <Preloader/> : null}
            <div className={classes.users_inner}>
                <div className={classes.users_elements}>
                    {users}
                </div>
                <div>
                    {pagination}
                </div>
            </div>
        </section>
    )
})

export default Users