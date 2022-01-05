import React, {ChangeEvent, useEffect} from "react";
import useAuth from "../SpotifyUseAuth/SpotifyUseAuth";
import SpotifyWebApi from 'spotify-web-api-node'
import TrackResults from "../TrackResults/TrackResults";
import Player from "../SpotifyPlayer/SpotifyPlayer";
import axios from "axios";
import s from './SpotifyDashboard.module.scss'
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import {setRecommendedTracksTC} from "../../../redux-store/spotify-reducer";

type SpotifyDashboardPropsType = {
    code: string | null
}
export const spotifyApi = new SpotifyWebApi({
    clientId: '7e6e290c64014eda969fac88d74f34be',

})

const SpotifyDashboard = ({code}: SpotifyDashboardPropsType) => {
    const dispatch = useDispatch()
    const accessToken = useAuth(code)
    const [search, setSearch] = React.useState('')
    const [searchResults, setSearchResults] = React.useState([])
    const [playingTrack, setPlayingTrack] = React.useState()
    const [lyrics, setLyrics] = React.useState('')

    const chooseTrack = (track: any) => {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(()=> {
        if (!playingTrack) return
        const {title} = playingTrack;
        const {artist} = playingTrack;
        axios.get('http://localhost:3001/lyrics', {
            params: {
                track: title,
                artist: artist
            }
        })
            .then((response) => {
                setLyrics(response.data.lyrics)
            })
    },[playingTrack])

    useEffect(()=>{
        if(!accessToken) return
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
    } )

    const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    // @ts-ignore
    let currentTrack = playingTrack?.uri;



    return(
        <div className={s.inner}>
            {/*<input type="search"*/}
            {/*       placeholder={'Search Songs'}*/}
            {/*       value={search}*/}
            {/*       onChange={searchOnChangeHandler}*/}
            {/*       className={s.searchInput}*/}
            {/*/>*/}
            <div className={s.searchInput}>
                <TextField
                    placeholder={'Search Songs'}
                    value={search}
                    label={'Search Songs'}
                    onChange={searchOnChangeHandler}
                />
            </div>

            <div>

                {searchResults.length === 0 ? <div>No tracks found with such name, please try to type another name</div> : searchResults.map( track => {
                    const {uri} = track;
                    return(
                        <TrackResults track={track} key={uri} chooseTrack={chooseTrack}/>
                    )
                })}
                {searchResults.length === 0 && (
                    <div>{lyrics}</div>
                )}
            </div>
            <Player accessToken={accessToken} trackUri={currentTrack}/>
        </div>
    )
}

export default SpotifyDashboard