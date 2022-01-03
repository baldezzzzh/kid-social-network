import React, {useEffect} from "react";
import axios from "axios";

export default function useAuth(code: any) {


    const [accessToken, setAccessToken] = React.useState()
    const [refreshToken, setRefreshToken] = React.useState()
    const [expiresIn, setExpiresIn] = React.useState()


    useEffect(() => {

        axios.post('http://localhost:3001/login', {
            code,
        })

            .then((response) => {
                setAccessToken(response.data.accessToken)
                setRefreshToken(response.data.refreshToken)
                setExpiresIn(response.data.expiresIn)
                window.history.pushState({}, '', '/music')
            })
            .catch((error: any) => {
                window.location.href = '/music';

            })
    }, [])


    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios.post('http://localhost:3001/refresh', {
                code,
            })
                .then((response) => {
                    setAccessToken(response.data.accessToken)
                    setExpiresIn(response.data.expiresIn)
                })
                .catch(() => {
                    window.location.href = '/music';
                })
        }, (expiresIn - 60) * 1000)
        return () => clearInterval(interval)

    }, [refreshToken, expiresIn, code])

    return accessToken
}
