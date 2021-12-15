import React from 'react'
import { Track } from '../models/track.model'
import ImgSoundPlaceHolder from '../resources/images/placeholder-sound.png'

interface TrackDetailProps {
  track: Track
}

export const TrackDetail = (props: TrackDetailProps) => {
  const imageUrl = props.track.album.images[0].url || ImgSoundPlaceHolder
  return (
    <div className='media border mt-4'>
      <img alt={props.track.album.name} src={imageUrl} width={200} />
      <div className='media-body'>
        <h2>{props.track.album.name}</h2>
        <div>Type: {props.track.type}</div>
        <div>Release Date: {props.track.album.release_date}</div>
        {props.track.preview_url && (
          <audio src={props.track.preview_url} controls></audio>
        )}
      </div>
    </div>
  )
}