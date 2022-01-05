import {Dispatch} from "redux";
import {spotifyApi} from "../Components/Music/SpotifyDashboard/SpotifyDashboard";


type RecommendedTrackItem = {
    // songName: string
    // artistName: string

}

type InitStateType = {
    recommendedTracks: Array<RecommendedTrackItem>
}


const InitState = {
    recommendedTracks: []
}


export const spotifyReducer = (state: InitStateType = InitState, action: ActionType) => {
    switch (action.type){
        case "SPOTIFY/SET-RECOMMENDED-TRACKS": {
            return {
                ...state,
                recommendedTracks: action.recommendedTracks
            }
        }
        default: return state
    }
}


type ActionType = ReturnType<typeof setRecommendedTracks>;



const setRecommendedTracks = (recommendedTracks: Array<RecommendedTrackItem>) => {
    return{
        type: 'SPOTIFY/SET-RECOMMENDED-TRACKS',
        recommendedTracks,
    } as const
}

export const setRecommendedTracksTC = () => (dispatch: Dispatch) => {
    spotifyApi.getRecommendations({
        min_energy: 0.4,
        seed_genres: ["chill", "dance", "study", "deep-house"],
        min_popularity: 70
    })
        .then((response) => {
            dispatch(setRecommendedTracks(response.body.tracks))
        })
}