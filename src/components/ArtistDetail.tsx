import React from 'react'
import { Artist } from '../models/artists.model'
import personPlaceHolder from '../resources/images/placeholder-person.png'

interface ArtistDetailProps {
  artist: Artist
  onSelectArtist: (id: string) => void
}

export const ArtistDetail = (props: ArtistDetailProps) => {
  const imageUrl = props.artist?.images[0]?.url || personPlaceHolder

  const handleClick = () => {
    props.onSelectArtist(props.artist.id)
  }

  return (
    <div onClick={handleClick} className='col cursor-pointer'>
      <div className="media border mt-4">
        <img
          src={imageUrl}
          className=''
          alt={props.artist.name}
          style={{ maxHeight: 160, maxWidth: 160 }}
        />
        <div className='media-body'>
          <h5>{props.artist.name}</h5>
          <div>Popularity: {props.artist.popularity}</div>
          <div>
            {props.artist.genres.length > 0
              ? `Genres: ${props.artist.genres.join(', ')}`
              : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}