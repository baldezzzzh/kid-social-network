import React, {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const instance = axios.create({
    baseURL: 'https://spotify-for-social-network.herokuapp.com/'
    // baseURL: 'http://localhost:3001',

})
export default function useAuth(code: any) {


    const [accessToken, setAccessToken] = React.useState()
    const [refreshToken, setRefreshToken] = React.useState()
    const [expiresIn, setExpiresIn] = React.useState()

    const navigate = useNavigate()

    useEffect(() => {

        instance.post('/login', {
            code,
        })

            .then((response) => {
                console.log('t')
                setAccessToken(response.data.accessToken)
                console.log(response.data.accessToken)
                setRefreshToken(response.data.refreshToken)
                setExpiresIn(response.data.expiresIn)
                navigate('/music')
            })
            .catch((error: any) => {
                console.log('e')
                navigate('/music')
                console.log(error)

            })
    }, [code, navigate])


    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            instance.post('/refresh', {
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

    }, [refreshToken, expiresIn, code, navigate])

    return accessToken
}
