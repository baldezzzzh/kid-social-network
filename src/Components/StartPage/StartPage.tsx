import React from "react";
import { Navigate } from "react-router-dom";
const code = new URLSearchParams(window.location.search).get("code")

const StartPage = () => {

    if (code) return <Navigate replace to={'/music'}/>

    return(
        <div>
1
        </div>
    )
}

export default StartPage