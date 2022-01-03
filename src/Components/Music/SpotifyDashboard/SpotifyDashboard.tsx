import React, {ChangeEvent, useEffect} from "react";
import useAuth from "../SpotifyUseAuth/SpotifyUseAuth";
import SpotifyWebApi from 'spotify-web-api-node'
import TrackResults from "../TrackResults/TrackResults";
import Player from "../SpotifyPlayer/SpotifyPlayer";
import axios from "axios";

type SpotifyDashboardPropsType = {
    code: string | null
}
const spotifyApi = new SpotifyWebApi({
    clientId: '7e6e290c64014eda969fac88d74f34be',

})

const SpotifyDashboard = ({code}: SpotifyDashboardPropsType) => {
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
                        (smallest, image) => {
                            if (image.height! < smallest.height!) return image
                            return smallest
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

    const searchOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    // @ts-ignore
    let currentTrack = playingTrack?.uri;


    return(
        <div>
            <input type="search"
                   placeholder={'Search Songs'}
                   value={search}
                   onChange={searchOnChangeHandler}
            />
            <div>
                {searchResults.map( track => {
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