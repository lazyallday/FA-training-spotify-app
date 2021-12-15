export interface ArtistSearchApiRes {
    artists: {
        href: string
        items: Artist[]
    }
}

export interface Artist {
    id: string
    name: string
    images: [
        {
            url: string
            width: string
            height: string
        }
    ],
    genres: string[]
    popularity: number
}
