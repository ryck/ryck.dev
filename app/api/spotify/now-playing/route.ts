import { NextResponse } from 'next/server'

// You need to set these environment variables in your deployment
const client_id = process.env.SPOTIFY_CLIENT_ID!
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')
async function getAccessToken(): Promise<string> {
  const response: Response = await fetch(
    'https://accounts.spotify.com/api/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    },
  )
  if (!response.ok) throw new Error('Failed to refresh Spotify token')
  const data: unknown = await response.json()
  if (
    typeof data === 'object' &&
    data !== null &&
    'access_token' in data &&
    typeof (data as { access_token: unknown }).access_token === 'string'
  ) {
    return (data as { access_token: string }).access_token
  }
  throw new Error('Invalid token response')
}

export async function GET(): Promise<Response> {
  // Ensure correct types for linting
  try {
    const access_token: string = await getAccessToken()
    const res: Response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        next: { revalidate: 30 },
      },
    )
    if (res.status === 204 || res.status > 400) {
      return NextResponse.json(
        { is_playing: false, item: null },
        { status: 200 },
      )
    }
    const data: unknown = await res.json()
    if (
      typeof data === 'object' &&
      data !== null &&
      'is_playing' in data &&
      'item' in data
    ) {
      const d = data as {
        is_playing: boolean
        item: null | {
          name: string
          artists: { name: string }[]
          album: { name: string; images: { url: string }[] }
          external_urls: { spotify: string }
        }
      }
      return NextResponse.json(
        {
          is_playing: Boolean(d.is_playing),
          item: d.item
            ? {
                name: String(d.item.name),
                artists: Array.isArray(d.item.artists)
                  ? d.item.artists.map((a) => ({ name: String(a.name) }))
                  : [],
                album: {
                  name: String(d.item.album?.name ?? ''),
                  images: Array.isArray(d.item.album?.images)
                    ? d.item.album.images.map((img) => ({
                        url: String(img.url),
                      }))
                    : [],
                },
                external_urls: d.item.external_urls ?? {},
              }
            : null,
        },
        { status: 200 },
      )
    }
    return NextResponse.json({ is_playing: false, item: null }, { status: 200 })
  } catch {
    return NextResponse.json({ is_playing: false, item: null }, { status: 200 })
  }
}
