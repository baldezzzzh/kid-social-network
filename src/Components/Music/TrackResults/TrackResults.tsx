import React from 'react'
import s from './TrackResults.module.scss'
import Button from "../../Buttons/Button";


type TrackResultsPropsType = {
    track: any
    chooseTrack: Function
}


const TrackResults = ({track, chooseTrack}: TrackResultsPropsType) => {
    const handlePlay = () => {
        chooseTrack(track)
    }


    return(
        <div className={s.track}>
            <div className={s.trackImgInner}>
                <img src={track.albumUrl} alt="album-image"/>
            </div>
            <div className={s.trackInner}>
                <div className={s.trackDescription}>
                    <h4 className={s.title}>{track.title}</h4>
                    <p className={s.artist}>{track.artist}</p>
                </div>
                <Button className={`commonBtn`} onClick={handlePlay} text={'Play'}/>
            </div>
        </div>
    )
}

export default TrackResults