import axios from 'axios'
import { ArtistSearchApiRes } from '../models/artists.model'
import { TrackApiRes } from '../models/track.model'

// const _code = 'AQD0fJ-ddn8Qe_uAArKgkEMZzkXovYcj_QgJS3dBFkW5owxt35hE53IvU6QHTIWEVDV0QYGWPIYXb2mBWtI7eqrPvaekO_aY4980cfFrskKOrFU6EdL_LME3BbY8j7O2yTv4G6slG4kZ5quSetjVyppzZ4yLJC6JsOxCbz_rJINcd2OLNMQrCAi6eULiGzJeZq_BjlZDYkbQTNLUay4'
class SpotifyService {
  static AUTH_TOKEN =
    'BQDDYEJchcKFNDS-P-ebQzbtuumvAOSTq7Gm-MVLhB7Z1uU1P57KVe-1fw9lHjWDyUDEU6K-8-7ZaFl4kIgty7_ASdgTg4nTJ77wp44l6Fuc78K6_N0rZdwERBs1MZnjQftGKUeO23ep';

  static axiosClient = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    headers: { Authorization: `Bearer ${SpotifyService.AUTH_TOKEN}` },
  });

  static async getArtists(query: string): Promise<ArtistSearchApiRes | undefined> {
    try {
      // const response = await axios.get<ArtistSearchApiRes>('https://api.spotify.com/v1/search', {
      //   params: {
      //     q: query,
      //     type: 'artist'
      //   },
      //   headers: {
      //     Authorization: `Bearer ${await this.getAccessToken(_code)}`
      //   }
      // })

      const response = await SpotifyService.axiosClient.get<ArtistSearchApiRes>(
        '/search',
        {
          params: {
            q: query,
            type: 'artist',
          },
        }
      );

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  static async getTopTracks(id: string): Promise<any> {
    try {
      const response = await SpotifyService.axiosClient.get<TrackApiRes>(`artists/${id}/top-tracks?market=US`)
      if (response.status === 200) {
        return response.data
      }
    } catch (error) {
      console.log(error)
    }
    return undefined
  }

  // For refresh access-token
  static async login() {
    const uri = new URL('authorize', 'https://accounts.spotify.com')
    uri.searchParams.append('client_id', '5bda837da49b4d118cfa0e8be74b72df')
    uri.searchParams.append('scope', 'user-read-private user-read-email')
    uri.searchParams.append('response_type', 'code')
    uri.searchParams.append('redirect_uri', 'http://localhost:3000/')
    window.open(uri.toString())
  }

  static async getAccessToken(code: string) {
    const url = 'https://accounts.spotify.com/api/token'
    const client_id = '5bda837da49b4d118cfa0e8be74b72df'
    const client_secret = '84ecfa33bea1444abc641366b7ac3cd9'
    const data = new FormData()
    data.append('code', code)
    data.append('redirect_uri', 'http://localhost:3000/')
    data.append('grant_type', 'authorization_code')
    const headers = { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) }

    try {
      const res = await axios.post(url, data, { headers })
      if (res.status === 200) {
        const access_token = res.data.access_token
        const refresh_token = res.data.refresh_token;

        return access_token
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default SpotifyService