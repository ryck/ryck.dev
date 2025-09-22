'use client'

import Image from 'next/image'

import { useQuery } from '@tanstack/react-query'

interface SpotifyTrack {
  is_playing: boolean
  item: {
    name: string
    artists: { name: string }[]
    album: { name: string; images: { url: string }[] }
    external_urls: { spotify: string }
  } | null
}

const fetchNowPlaying = async (): Promise<SpotifyTrack | null> => {
  const res = await fetch('/api/spotify/now-playing')
  return res.ok ? res.json() : null
}

export default function SpotifyNowPlaying() {
  const { data: track } = useQuery({
    queryKey: ['spotify', 'now-playing'],
    queryFn: fetchNowPlaying,
    refetchInterval: 30000, // Refetch every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
  })

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
