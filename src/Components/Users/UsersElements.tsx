import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
import {
    followUserAC,
    setCurrentPage,
    setISFetching,
    setTotalUsersCount,
    setUsersAC,
    unfollowUserAC, UserPageType,
    UsersType
} from "../../redux/users-reducer";
import classes from "./Users.module.css";
import SocialIcons from "../Profile/SocialIcon/SocialIcon";
import axios from "axios";
import Preloader from "../Preloader/Preloader";
import {GenericUsersStateSelector} from "../../redux/users-select";


const UsersElements = () => {

    // const {
    //     users,
    //     usersCount,
    //     currentPage,
    //     isFetching,
    //     pagesNumber,
    //     totalCount
    // } = useSelector(GenericUsersStateSelector)

    let dispatch = useDispatch()
    //export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    const usersPage = useSelector<RootReducerType, UserPageType>(state => state.usersPage)

    const setCurrentPageHandler = (currentPage: number) => {
        dispatch(setCurrentPage(currentPage))
        dispatch(setISFetching(true))
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${usersPage.usersCount}&page=${currentPage}`)
            .then(responce => {
                dispatch(setUsersAC(responce.data.items))
                dispatch(setISFetching(false))
            })
    }


    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${usersPage.usersCount}&page=${usersPage.currentPage}`)
            .then(responce => {
                dispatch(setISFetching(false))
                dispatch(setUsersAC(responce.data.items))
                dispatch(setTotalUsersCount(responce.data.totalCount))
            })
        console.log(usersPage.isFetching)
    }, [])// один раз при первом рендере


    const onClickUnfollowHandler = (userId: string) => {
        dispatch(unfollowUserAC(userId))
    }
    const onClickFollowHandler = (userId: string) => {
        dispatch(followUserAC(userId))
    }


    let paginationArr = [];

    for (let i = 1; i < 7; i++) {
        paginationArr.push(i)
    }

    let pagination = paginationArr.map(p => {
        return (
            <button className={usersPage.currentPage === p ? classes.activePaginationBtn : classes.paginationBtn} onClick={() => {
                setCurrentPageHandler(p)
            }}>{p}</button>
        )
    })

    let users = usersPage.users.map(u => {
        return (
            <div key={u.id} id={u.id} className={classes.user}>
                <div className={classes.avatar}>
                    <img src={u.photos.small} alt="avatar"/>
                </div>
                <h4 className={classes.userName}>{u.name}</h4>
                <p>{u.message}</p>
                {/*<p>{u.location.country}</p>*/}
                {/*<p>{u.location.city}</p>*/}
                {u.followed
                    ? <button onClick={() => onClickUnfollowHandler(u.id)} className={classes.userBtn}>Unfollow</button>
                    : <button onClick={() => onClickFollowHandler(u.id)} className={classes.userBtn}>Follow</button>
                }
                <SocialIcons/>
            </div>
        )
    })
    return (
        <>
            {usersPage.isFetching ? <Preloader/> : null}
            <div className={classes.users_inner}>
                <div>
                    {pagination}
                </div>
                <div className={classes.users_elements}>
                    {users}
                </div>

            </div>
        </>

    )

}

export default UsersElements