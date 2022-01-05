import React from "react";
import SpotifyLogin from "./SpotifyLogin/SpotifyLogin";
import SpotifyDashboard from "./SpotifyDashboard/SpotifyDashboard";
import s from './Music.module.scss'

const code = new URLSearchParams(window.location.search).get('code')

const Music = () => {
    return(
        <section className={s.inner}>
            <div className={s.content}>
                {code ? <SpotifyDashboard code={code}/> : <SpotifyLogin/>}
            </div>
        </section>
    )
}

export default Music