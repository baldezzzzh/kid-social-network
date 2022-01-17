import {Dispatch} from "redux";
import {spotifyApi} from "../Components/Music/SpotifyDashboard/SpotifyDashboard";
import {setAppIsLoading} from "./app-reducer";
import {spotifyMyApi} from "../DAL/api";



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
    code: string | null,
    accessToken: string | undefined
    refreshToken: string | undefined
    expiresIn: string | undefined
    rememberMe: boolean
}


const InitState = {
    recommendedTracks: [],
    code: '',
    accessToken: '',
    refreshToken: '',
    expiresIn: '',
    rememberMe: false
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
        case "SPOTIFY/SET-SPOTIFY-DATA": {
            return {
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                expiresIn: action.expiresIn
            }
        }
        case "SPOTIFY/REMEMBER-ME": {
            return {
                ...state,
                rememberMe: action.rememberMe
            }
        }


        default: return state
    }
}


type ActionType = ReturnType<typeof setRecommendedTracks> | ReturnType<typeof getAuthCode> | ReturnType<typeof setSpotifyData> | ReturnType<typeof rememberMeSpotify> ;



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


export const setSpotifyData = (accessToken: string | undefined, refreshToken: string | undefined, expiresIn: string | undefined) => {
    return{
        type: 'SPOTIFY/SET-SPOTIFY-DATA',
        accessToken,
        refreshToken,
        expiresIn
    } as const
}

export const rememberMeSpotify = (rememberMe: boolean) => {
    return{
        type: 'SPOTIFY/REMEMBER-ME',
        rememberMe
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

// export const setSpotifyLogin = (code: string, accessToken: string | undefined, refreshToken: string | undefined , expiresIn: string | undefined  ) => async (dispatch: Dispatch) => {
//     const response = await spotifyMyApi.spotifyLogin(code)
//     console.log('qewqeqeq')
//     dispatch(setAppIsLoading(true))
//     try {
//         console.log('try')
//         accessToken = response.data.accessToken;
//         refreshToken = response.data.refreshToken;
//         expiresIn = response.data.expiresIn;
//         dispatch(setSpotifyData(accessToken, refreshToken, expiresIn))
//     }
//     catch (error){
//         console.log(1)
//         console.log(error)
//     }
//     finally {
//         console.log(2)
//         dispatch(setAppIsLoading(false))
//     }
// }