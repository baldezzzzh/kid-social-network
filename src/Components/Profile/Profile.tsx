import React, {ChangeEvent, useCallback, useEffect} from "react";
import profileBg from './images/profile-bg.png'
import classes from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux-store/store";
import {
    ProfilePageType,
    setUSerProfile,
    setUserStatus, updateUSerStatus
} from "../../redux-store/profile-reducer";
import SocialIcons from "./SocialIcon/SocialIcon";
import Posts from "./Posts/Posts";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import {Navigate, useParams} from "react-router-dom";
import userAvatar from './../../images/profile-avatar.png'



const code = new URLSearchParams(window.location.search).get("code")

const Profile = React.memo(() => {
    let profile = useSelector<RootReducerType, ProfilePageType>(state => state.profilePage)
    // @ts-ignore
    let isAuth = useSelector<RootReducerType, boolean>(state => state.authPage.isAuth)
    let dispatch = useDispatch();
    const [editMode, setEditMode] = React.useState(false)
    const [inputTitle, setInputTitle] = React.useState(profile.profileInfo.userStatus)
    let {id} = useParams();
    if(!id){
        id = '20604';
    }

    if (code) return <Navigate replace to={'/music'}/>

    useEffect(() => {
        dispatch(setUSerProfile(id))
    }, [id, dispatch])
    useEffect( () => {
       dispatch(setUserStatus(id))
    },[id, dispatch] )


    const onSetEditMode = () => {
        setEditMode(true)
    }

    const onExitEditMode = useCallback(() => {
        setEditMode(false)
        dispatch(updateUSerStatus(inputTitle))
    },[dispatch, inputTitle])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }
    console.log(typeof profile.profileInfo.photos.large)
    return (
        !isAuth ?
            <Navigate replace to="/login" />
            :
        <section className={classes.inner}>
            <div className={classes.header}>
                <img src={profileBg} alt="profile-bg" className={classes.bg}/>
                <div className={classes.header_info}>
                    <div className={classes.header_left}>
                        <div className={classes.header_left_box}>
                            <p>{profile.profileInfo.postsNumber}</p>
                            <p>Posts</p>
                        </div>
                        <div className={classes.header_left_box}>
                            <p>{profile.profileInfo.friendsNumber}</p>
                            <p>Friends</p>
                        </div>
                        <div className={classes.header_left_box}>
                            <p>{profile.profileInfo.commentsNumber}</p>
                            <p>Comments</p>
                        </div>
                    </div>
                    <div className={classes.header_mid}>
                        <div className={classes.header_mid_box}>
                            <div className={classes.avatar_box}>
                                <img src={profile.userProfile.photos.large === null ? userAvatar : profile.userProfile.photos.large} alt="avatar" className={classes.avatar}/>
                            </div>
                            <p className={classes.userLevel}>4</p>
                        </div>
                        <p className={classes.userName}>{profile.userProfile.fullName}</p>
                        <p className={classes.userMembership}>{profile.profileInfo.membership}</p>
                        <div>
                            {editMode
                                ? <input value={inputTitle}
                                         onBlur={onExitEditMode}
                                         autoFocus={true}
                                         onChange={onChangeHandler}
                                />
                                :  <p onDoubleClick={onSetEditMode}>{inputTitle || 'Enter your status'}</p>
                            }
                        </div>

                    </div>
                    <div className={classes.socialLinks}>
                        <SocialIcons/>
                    </div>
                </div>
            </div>
            <div className={classes.main_content}>
                <GeneralInfo/>
                <Posts newValue={profile.newPostMessage}/>
                <AdditionalInfo/>
            </div>

        </section>
    )
})



export default Profile