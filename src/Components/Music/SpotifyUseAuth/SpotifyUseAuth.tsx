import React, {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
const instance = axios.create({
    baseURL: 'https://spotify-for-social-network.herokuapp.com/'
})
export default function useAuth(code: any) {

    const dispatch = useDispatch();
    const [accessToken, setAccessToken] = React.useState()
    const [refreshToken, setRefreshToken] = React.useState()
    const [expiresIn, setExpiresIn] = React.useState()

    const navigate = useNavigate()

    useEffect(() => {
        instance.post('/login', {code,})
            .then((response) => {
                setAccessToken(response.data.accessToken)
                console.log(response.data.accessToken)
                setRefreshToken(response.data.refreshToken)
                setExpiresIn(response.data.expiresIn)
                navigate('/music')
            })
            .catch((error: any) => {

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