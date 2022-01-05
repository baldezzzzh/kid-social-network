import React from "react";
import s from './SpotifyLogin.module.scss'

export const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=7e6e290c64014eda969fac88d74f34be&response_type=code&redirect_uri=http://localhost:3000/music&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const SpotifyLogin = () => {

    return(
        <div>
            <a className={'commonBtn'} href={AUTH_URL}>Login with Spotify</a>
        </div>
    )
}

export default SpotifyLogin


