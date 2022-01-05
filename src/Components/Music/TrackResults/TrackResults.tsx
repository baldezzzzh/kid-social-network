import React from 'react'
import s from './TrackResults.module.scss'


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
            <h4>{track.title}</h4>
            <p>{track.artist}</p>
            <button onClick={handlePlay}>play</button>
        </div>
    )
}

export default TrackResults