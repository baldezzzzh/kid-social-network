import React from "react";
import classes from "./AdditionalInfo.module.css";

const AdditionalInfo = () => {
    return(
        <div className={classes.inner}>
            <h3 className={classes.title}>Stream Box</h3>
            <div className={classes.frame_wrapper}>
                <iframe src="https://www.twitch.tv/videos/411305682" frameBorder="0"
                        scrolling="no" height="100%" width="100%" allowFullScreen={true} title={'twitch'}></iframe>
            </div>

        </div>
    )
}

export default AdditionalInfo