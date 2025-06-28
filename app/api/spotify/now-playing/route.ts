import { NextRequest, NextResponse } from 'next/server'

// You need to set these environment variables in your deployment
const client_id = process.env.SPOTIFY_CLIENT_ID!
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

async function getAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })
  if (!response.ok) throw new Error('Failed to refresh Spotify token')
  const data = await response.json()
  return data.access_token
}

export async function GET(req: NextRequest) {
  try {
    const access_token = await getAccessToken()
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 30 },
    })
    if (res.status === 204 || res.status > 400) {
      return NextResponse.json({ is_playing: false, item: null }, { status: 200 })
    }
    const data = await res.json()
    return NextResponse.json({
      is_playing: data.is_playing,
      item: data.item ? {
        name: data.item.name,
        artists: data.item.artists.map((a: any) => ({ name: a.name })),
        album: {
          name: data.item.album.name,
          images: data.item.album.images.map((img: any) => ({ url: img.url })),
        },
        external_urls: data.item.external_urls,
      } : null,
    }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ is_playing: false, item: null }, { status: 200 })
  }
}
