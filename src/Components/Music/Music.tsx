import React, {useEffect} from "react";
import SpotifyLogin from "./SpotifyLogin/SpotifyLogin";
import SpotifyDashboard from "./SpotifyDashboard/SpotifyDashboard";
import s from './Music.module.scss'
import {getAuthCode} from "../../redux-store/spotify-reducer";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../redux-store/store";
import Preloader from "../Preloader/Preloader";

const code = new URLSearchParams(window.location.search).get('code')

const Music = React.memo(() => {

    const isLoading = useSelector<RootReducerType, boolean>(state => state.appPage.isLoading)

    useEffect( () => {
        getAuthCode(code)
    }, [] )


    return(
        <>
            {isLoading ? <Preloader/> : null}
            <section className={s.inner}>
                <div className={s.content}>
                    {code ? <SpotifyDashboard code={code}/> : <SpotifyLogin/>}
                </div>
            </section>
        </>

    )
})

export default Music