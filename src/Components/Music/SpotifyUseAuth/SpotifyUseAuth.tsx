import React, {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function useAuth(code: any) {


    const [accessToken, setAccessToken] = React.useState()
    const [refreshToken, setRefreshToken] = React.useState()
    const [expiresIn, setExpiresIn] = React.useState()

    const navigate = useNavigate()

    useEffect(() => {

        axios.post('https://spotify-for-social-network.herokuapp.com/', {
            code,
        })

            .then((response) => {
                setAccessToken(response.data.accessToken)
                setRefreshToken(response.data.refreshToken)
                setExpiresIn(response.data.expiresIn)
                navigate('/music')
            })
            .catch((error: any) => {
                navigate('/music')

            })
    }, [code])


    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios.post('https://spotify-for-social-network.herokuapp.com/', {
                code,
            })
                .then((response) => {
                    setAccessToken(response.data.accessToken)
                    setExpiresIn(response.data.expiresIn)
                    navigate('/music')
                })
                .catch(() => {
                    navigate('/music')
                })
        }, (expiresIn - 60) * 1000)
        return () => clearInterval(interval)

    }, [refreshToken, expiresIn, code])

    return accessToken
}
