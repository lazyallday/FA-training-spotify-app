import React, { useState } from 'react';
import './App.css';
import { ArtistDetail } from './components/ArtistDetail';
import SearchQuery from './components/SearchQuery';
import { TrackDetail } from './components/TrackDetail';
import { Artist } from './models/artists.model';
import { Track } from './models/track.model';
import SpotifyService from './services/spotify.service';

function App() {
  const [artists, setArtists] = useState([] as Artist[])
  const [tracks, setTracks] = useState([] as Track[])

  const searchArtists = async (query: string) => {
    setTracks([])
    if (query) {
      const res = await SpotifyService.getArtists(query)
      if (res) {
        setArtists(res.artists.items)
      }
    }
  }

  const selectArtist = async (id: string) => {
    const res = await SpotifyService.getTopTracks(id)
    if (res) {
      setTracks(res.tracks)
    }
  }

  return (
    <main className='container mt-4'>
      <SearchQuery onSearch={searchArtists} />
      <div className='row row-cols-1 row-cols-lg-3'>
        {artists.map(artist => (
          <ArtistDetail
            key={artist.id}
            artist={artist}
            onSelectArtist={selectArtist}
          />
        ))}
      </div>
      <div>
        {tracks.map(track => (
          <TrackDetail track={track} />
        ))}
      </div>
    </main>
  );
}

export default App;
