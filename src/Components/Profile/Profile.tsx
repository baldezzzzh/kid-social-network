import React, {useEffect} from "react";
import profileBg from './images/profile-bg.png'
import classes from "./Profile.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
import {PostType, ProfilePageType, setUserProfile} from "../../redux/profile-reducer";
import SocialIcons from "./SocialIcon/SocialIcon";
import Posts from "./Posts/Posts";
import GeneralInfo from "./GeneralInfo/GeneralInfo";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import {UserPageType} from "../../redux/users-reducer";
import axios from "axios";


const Profile = React.memo(() => {

    let profile = useSelector<RootReducerType, ProfilePageType>(state => state.profilePage)
    let dispatch = useDispatch();

    useEffect( () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/profile/2")
            .then(responce => {
                dispatch(setUserProfile(responce.data))
            })
    }, [] )


    return (
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
                                <img src={profile.userProfile.photos.large} alt="avatar" className={classes.avatar}/>
                            </div>
                            <p className={classes.userLevel}>4</p>
                        </div>
                        <p className={classes.userName}>{profile.userProfile.fullName}</p>
                        <p className={classes.userMembership}>{profile.profileInfo.membership}</p>
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