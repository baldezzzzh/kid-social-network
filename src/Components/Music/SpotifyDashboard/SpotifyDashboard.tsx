import React from "react";
import useAuth from "../SpotifyUseAuth/SpotifyUseAuth";

type SpotifyDashboardPropsType = {
    code: string | null
}


const SpotifyDashboard = ({code}: SpotifyDashboardPropsType) => {
    const accessToken = useAuth(code)
    return(
        <div>
            {code}
        </div>
    )
}

export default SpotifyDashboard