import React from "react";
import { Navigate } from "react-router-dom";
const code = new URLSearchParams(window.location.search).get("code")

const StartPage = () => {

    if (code) return <Navigate replace to={'/music'}/>

    return(
        <div>
            <h1>Hi! This is this is SPA a small social network, a pet project based on React/Redux</h1>
            <p>To test the application use common test account for testing!</p>
            <div>
                <p><span>Email:</span> pecab31632@ritumusic.com</p>
                <p><span>Password:</span>  Account_For_Test</p>
            </div>
        </div>
    )
}

export default StartPage