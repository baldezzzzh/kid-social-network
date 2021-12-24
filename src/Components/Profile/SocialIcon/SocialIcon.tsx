import React from "react";
import youTube from '../images/youtube.svg'
import twitch from '../images/twitch.svg'
import tiktok from  '../images/tiktok.svg'
import instagram from '../images/instagram.svg'
import classes from "./SocialICons.module.css";
const socialIcons = [
    {icon: youTube},
    {icon: twitch},
    {icon: tiktok},
    {icon: instagram}
]



const SocialIcons = () => {
    const socialIcon = socialIcons.map( i => {
        return(
            <a href="#" className={classes.icon} >
                <img  src={i.icon} alt="icon" className={classes.iconImg}/>
            </a>
        )
    } )
    return(
        <div className={classes.icons}>
            {socialIcon}
        </div>

    )

}

export default SocialIcons