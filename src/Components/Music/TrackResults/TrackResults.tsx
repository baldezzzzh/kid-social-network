import React from 'react'


type TrackResultsPropsType = {
    track: any
    chooseTrack: Function
}


const TrackResults = ({track, chooseTrack}: TrackResultsPropsType) => {
    const handlePlay = () => {
        chooseTrack(track)
    }


    return(
        <div>
            <button onClick={handlePlay}>play</button>
            <img src={track.albumUrl} alt="album-image"/>
            <h4>{track.title}</h4>
            <p>{track.artist}</p>
        </div>
    )
}

export default TrackResults