export interface TrackApiRes{
    tracks: Track[]
}

export interface Track{
    id: string
    album: Album
    preview_url: string
    type: string
}

export interface Album {
    id: string
    name: string
    type: string
    release_date: string
    images: {
        url: string
    }[]
}