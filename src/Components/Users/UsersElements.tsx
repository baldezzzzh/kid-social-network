import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
import {
    followUserAC,
    setCurrentPage,
    setISFetching, setISFollowed,
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
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${usersPage.usersCount}&page=${currentPage}` , {
            withCredentials: true,
            headers: {
                "API-KEY": "0c12297a-a516-42d3-9509-82bfb5d48238",
            },

        })

            .then(responce => {
                dispatch(setUsersAC(responce.data.items))
                dispatch(setISFetching(false))
            })
    }


    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${usersPage.usersCount}&page=${usersPage.currentPage}` , {
            withCredentials: true,
            headers: {
                "API-KEY": "0c12297a-a516-42d3-9509-82bfb5d48238"
            }
        })
            .then(responce => {
                dispatch(setISFetching(false))
                dispatch(setUsersAC(responce.data.items))
                dispatch(setTotalUsersCount(responce.data.totalCount))
            })
        console.log(usersPage.isFetching)
    }, [])// один раз при первом рендере


    const onClickUnfollowHandler = (userId: string) => {
        dispatch(setISFollowed(true, userId))
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "0c12297a-a516-42d3-9509-82bfb5d48238"
            }
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowUserAC(userId))
                    dispatch(setISFollowed(false, userId))
                }

            })
        console.log(usersPage.s)
    }
    const onClickFollowHandler = (userId: string) => {
        dispatch(setISFollowed(true, userId))
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {
            withCredentials: true,
            headers: {
                "API-KEY": "0c12297a-a516-42d3-9509-82bfb5d48238"
            }
        })
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(followUserAC(userId))
                    dispatch(setISFollowed(false, userId))
                }

            })
        console.log(usersPage.s)

    }


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
            <div key={u.id} id={u.id} className={classes.user}>
                <div className={classes.avatar}>
                    <img src={u.photos.small} alt="avatar"/>
                </div>
                <h4 className={classes.userName}>{u.name}</h4>
                <p>{u.message}</p>
                {/*<p>{u.location.country}</p>*/}
                {/*<p>{u.location.city}</p>*/}
                {u.followed
                    ? <button disabled={usersPage.isFollowed.some(id => id === u.id)}
                              onClick={() => onClickUnfollowHandler(u.id)} className={classes.userBtn}>Unfollow</button>
                    : <button disabled={usersPage.isFollowed.some(id => id === u.id)}
                              onClick={() => onClickFollowHandler(u.id)} className={classes.userBtn}>Follow</button>
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

let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a: number, b: number) {
    return function(x: number) {
        return x >= a && x <= b;
    };
}

const inArray = (arr: Array<number>) => {
    return function (x: number) {
        return arr.includes(x)
    }
}

console.log( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

console.log( arr.filter(inArray([1, 2, 10])) ); // 1,2






export default UsersElements