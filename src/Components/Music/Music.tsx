import React from "react";
import SpotifyLogin from "./SpotifyLogin/SpotifyLogin";
import SpotifyDashboard from "./SpotifyDashboard/SpotifyDashboard";


const code = new URLSearchParams(window.location.search).get('code')

const Music = () => {
    return(
        <>
            {code ? <SpotifyDashboard code={code}/> : <SpotifyLogin/>}
        </>
    )
}

export default Music