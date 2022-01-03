import React, {useEffect, useState} from 'react';
import SpotifyWebPlayer from "react-spotify-web-playback";

type PlayerPropsType = {
    accessToken: string | undefined
    trackUri: any
}


const Player = ({accessToken, trackUri} : PlayerPropsType) => {
    const [play, setPlay] = useState(false)

    useEffect( () => setPlay(true), [trackUri] )

    if (!accessToken) return null
    return <SpotifyWebPlayer
        token={accessToken}
        showSaveIcon
        callback={state => {
        if(!state.isPlaying) setPlay(false)
        }}
        play={true}
        autoPlay={true}
        uris={trackUri ? [trackUri] : []
        }
    />

}
export default Player