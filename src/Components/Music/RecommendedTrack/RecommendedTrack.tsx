import React from "react";
import {RecommendedTrackItem} from "../../../redux-store/spotify-reducer";
import s from './RecommendedTrack.module.scss'
import Button from "../../Buttons/Button";


type RecommendedTrackPropsType = {
    track: RecommendedTrackItem
    trackImageUrl: string
    chooseTrack: Function
}

const RecommendedTrack = ({track, trackImageUrl, chooseTrack} : RecommendedTrackPropsType) => {

    const handlePlay = () => {
        chooseTrack(track)
    }

    return(
        <div className={s.track}>
            <div className={s.recTrackImgInner}>
                <img src={trackImageUrl} alt="album-image"/>
            </div>
            <div className={s.trackInner}>
                <div className={s.trackDescription}>
                    <p className={s.title}>{track.name}</p>
                    <p className={s.artist}>{track.artists[0].name}</p>
                </div>
                <Button className={`commonBtn`} onClick={handlePlay} text={'Play'}/>
            </div>
        </div>
    )
}

export default RecommendedTrack