import React from "react";
import s from './SpotifyLogin.module.scss'
import spotifyIcon from './../../../images/SpotifyIcon.svg'

export const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=7e6e290c64014eda969fac88d74f34be&response_type=code&redirect_uri=https://csdlabs.github.io/music/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const SpotifyLogin = () => {

    return(
        <div className={s.inner}>
            <div>
                <div className={s.logoInner}>
                    <h4 className={s.title}>Music From Spotify Developers API</h4>
                    <img src={spotifyIcon} alt="spotify-icon"/>
                </div>
                <div className={s.description}>
                    <p className={s.text}>Please, for further testing of this app and this music page, log in into Spotify with username and login, listed bellow,
                    it was specially created  for testing this app and it work only in testing mode, that Spotify Web Developers API provides.</p>
                    <p className={`${s.text} ${s.boldText}`}>Login: aomineda1ki@protonmail.com</p>
                    <p className={`${s.text} ${s.boldText}`}>Password: ,5a3eGe=kB9(2PP</p>
                </div>

            </div>
            <a className={'commonBtn'} href={AUTH_URL}>Login with Spotify</a>
        </div>
    )
}

export default SpotifyLogin


