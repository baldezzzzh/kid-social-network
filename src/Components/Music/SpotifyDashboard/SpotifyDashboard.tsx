import React, {ChangeEvent, useEffect} from "react";
import useAuth from "../SpotifyUseAuth/SpotifyUseAuth";
import SpotifyWebApi from 'spotify-web-api-node'
import TrackResults from "../TrackResults/TrackResults";
import Player from "../SpotifyPlayer/SpotifyPlayer";
import s from './SpotifyDashboard.module.scss'
import TextField from "@material-ui/core/TextField";
import {useDispatch, useSelector} from "react-redux";
import {setRecommendedTracksTC, SpotifyMusicState} from "../../../redux-store/spotify-reducer";
import {RootReducerType} from "../../../redux-store/store";
import RecommendedTrack from "../RecommendedTrack/RecommendedTrack";

type SpotifyDashboardPropsType = {
    code: string | null
}
export const spotifyApi = new SpotifyWebApi({
    clientId: '7e6e290c64014eda969fac88d74f34be',

})

const SpotifyDashboard = React.memo(({code}: SpotifyDashboardPropsType) => {
    const dispatch = useDispatch()
    const spotifyState = useSelector<RootReducerType, SpotifyMusicState>(state => state.musicPage)
    const accessToken = useAuth(code)
    console.log(accessToken)
    const [search, setSearch] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([])
    const [playingTrack, setPlayingTrack] = React.useState()

    const chooseTrack = (track: any) => {
        setPlayingTrack(track)
        setSearch('')
    }



    useEffect(()=>{
        if(!accessToken) return
        console.log(accessToken)
        console.log(1)
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    // @ts-ignore
    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false
        if (cancel) return

        spotifyApi.searchTracks(search)
            .then((response) => {

                // @ts-ignore
                setSearchResults(response.body.tracks!.items.map( track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (biggest, image) => {
                            if (image.height! > biggest.height!) return image
                            return biggest
                        }, track.album.images[0])


                    return{
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                }))
            })
        return () => cancel = true
    },[search, accessToken])


    useEffect( () => {
        if(!accessToken) return
        dispatch(setRecommendedTracksTC())
    },[accessToken, dispatch] )

    const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    // @ts-ignore
    let currentTrack = playingTrack?.uri;



    const recTrack = spotifyState.recommendedTracks.map( t => {
        const recTrackImageUrl = t.album.images.map( i => i.url )[0]
        return(
            <RecommendedTrack track={t} trackImageUrl={recTrackImageUrl} key={t.uri}  chooseTrack={chooseTrack}/>
        )
    } )

    return(
        <div className={s.inner}>
            <div className={s.searchInput}>
                <TextField
                    placeholder={'Search Songs'}
                    value={search}
                    label={'Search Songs'}
                    onChange={searchOnChangeHandler}
                />
            </div>
            <Player accessToken={accessToken} trackUri={currentTrack}/>
            <div>
                {searchResults.length === 0 ? <div>{recTrack}</div> : searchResults.map( track => {
                    const {uri} = track;
                    return(
                        <TrackResults track={track} key={uri} chooseTrack={chooseTrack}/>
                    )
                })}
                {/*{searchResults.length === 0 && (*/}
                {/*    <div>{lyrics}</div>*/}
                {/*)}*/}
            </div>

        </div>
    )
})

export default SpotifyDashboard