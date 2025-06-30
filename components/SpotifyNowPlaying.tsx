'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface SpotifyTrack {
  is_playing: boolean
  item: {
    name: string
    artists: { name: string }[]
    album: { name: string; images: { url: string }[] }
    external_urls: { spotify: string }
  } | null
}

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState<SpotifyTrack | null>(null)
  useEffect(() => {
    fetch('/api/spotify/now-playing')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setTrack(data))
  }, [])

  if (!track || !track.is_playing || !track.item) return null
  const { name, artists, album, external_urls } = track.item
  return (
    <a
      href={external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded bg-green-50 px-3 py-2 text-xs font-medium text-green-900 shadow hover:bg-green-100 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
      title={`Listening now: ${name} by ${artists.map((a) => a.name).join(', ')}`}
    >
      <Image
        src={album.images[2]?.url || album.images[0]?.url}
        alt={album.name}
        width={32}
        height={32}
        className="h-8 w-8 rounded shadow"
        unoptimized
      />
      <span className="truncate">
        <span className="font-semibold">{name}</span> by{' '}
        {artists.map((a) => a.name).join(', ')}
      </span>
      <span className="ml-2 animate-pulse text-green-500">●</span>
    </a>
  )
}
