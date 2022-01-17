import {Dispatch} from "redux";
import {spotifyApi} from "../Components/Music/SpotifyDashboard/SpotifyDashboard";
import {spotifyMyApi} from "../DAL/api";
import {setAppIsLoading} from "./app-reducer";


export type RecommendedTrackItem = {
    // songName: string
    // artistName: string
    name: string
    artists: Array<ArtistItem>
    album: {
        images: Array<ImageType>
    }
    uri: string
}
type ImageType = {
    height: number
    url: string
    width: number
}
type ArtistItem = {
    name: string
}

export type SpotifyMusicState = {
    recommendedTracks: Array<RecommendedTrackItem>
    code: string | null
}


const InitState = {
    recommendedTracks: [],
    code: ''
}


export const spotifyReducer = (state: SpotifyMusicState = InitState, action: ActionType) => {
    switch (action.type){
        case "SPOTIFY/SET-RECOMMENDED-TRACKS": {
            return {
                ...state,
                recommendedTracks: action.recommendedTracks
            }
        }
        case "SPOTIFY/GET-AUTH-CODE": {
            return {
                ...state,
                code: action.code
            }
        }
        default: return state
    }
}


type ActionType = ReturnType<typeof setRecommendedTracks> | ReturnType<typeof getAuthCode>;



const setRecommendedTracks = (recommendedTracks: SpotifyApi.TrackObjectSimplified[]) => {
    return{
        type: 'SPOTIFY/SET-RECOMMENDED-TRACKS',
        recommendedTracks,
    } as const
}


export const getAuthCode = (code: string | null) => {
    return{
        type: 'SPOTIFY/GET-AUTH-CODE',
        code
    } as const
}

export const setRecommendedTracksTC = () => (dispatch: Dispatch) => {
    spotifyApi.getRecommendations({
        min_energy: 0.4,
        seed_genres: ["phonk", "dance", "rap"],
        min_popularity: 70
    })
        .then((response) => {
            dispatch(setRecommendedTracks(response.body.tracks))
            console.log(response.body.tracks)
        })
}

export const setSpotifyLogin = (code: string, setAccessToken: Function, setRefreshToken: Function , setExpiresIn: Function ) => async (dispatch: Dispatch) => {
    const response = await spotifyMyApi.spotifyLogin(code)
    dispatch(setAppIsLoading(true))
    try {
        setAccessToken(response.data.accessToken)
        console.log(response.data.accessToken)
        setRefreshToken(response.data.refreshToken)
        setExpiresIn(response.data.expiresIn)
    }
    catch (error){
        console.log(error)
    }
    finally {
        setAppIsLoading(false)
    }
}