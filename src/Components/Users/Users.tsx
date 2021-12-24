import React, { useCallback, useEffect} from "react";
import classes from "./Users.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../BLL/store";
import {followUser, getUsers, unFollowUser, UserPageType} from "../../BLL/users-reducer";
import {Navigate} from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import User from "./User/User";
import { Pagination } from "@material-ui/core";


const Users = React.memo(() => {
    console.log('users')
    let dispatch = useDispatch()

    const usersPage = useSelector<RootReducerType, UserPageType>(state => state.usersPage)
    // @ts-ignore
    let isAuth = useSelector<RootReducerType, boolean>(state => state.authPage.isAuth)


    useEffect(() => {
        dispatch(getUsers(usersPage.usersCount, usersPage.currentPage))
    }, [dispatch, usersPage.usersCount, usersPage.currentPage])



    const onPageChange = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getUsers(usersPage.usersCount, page))
    },[dispatch, usersPage.usersCount])


    const onClickUnfollowHandler = useCallback((userId: string) => {
        dispatch(unFollowUser(userId))
    },[dispatch])

    const onClickFollowHandler = useCallback((userId: string) => {
        dispatch(followUser(userId))
    },[dispatch])


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
                <div className={classes.pagination}>
                    {/*{pagination}*/}
                    <Pagination
                        count={usersPage.pagesNumber}
                        color="secondary"
                        page={usersPage.currentPage}
                        onChange={onPageChange}
                        size={'large'}
                    />
                </div>
                <div className={classes.users_elements}>
                    {users}
                </div>
            </div>
        </section>
    )
})

export default Users