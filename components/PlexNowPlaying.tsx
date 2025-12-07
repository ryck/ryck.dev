"use client";

import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

interface PlexTrack {
	is_playing: boolean;
	item: {
		name: string;
		artist: string;
		album: string;
		image: string | null;
		type: string;
	} | null;
}

const fetchNowPlaying = async (): Promise<PlexTrack | null> => {
	const res = await fetch("/api/plex/now-playing");
	return res.ok ? res.json() : null;
};

export default function PlexNowPlaying() {
	const { data: track } = useQuery({
		queryKey: ["plex", "now-playing"],
		queryFn: fetchNowPlaying,
		refetchInterval: 30000, // Refetch every 30 seconds
		staleTime: 25000, // Consider data stale after 25 seconds
	});

	if (!track || !track.is_playing || !track.item) return null;

	const { name, artist, album, image, type } = track.item;

	return (
		<div
			className="group flex items-center gap-3 rounded bg-yellow-50 px-3 py-2 text-xs font-medium text-orange-900 shadow dark:bg-yellow-900 dark:text-orange-100"
			title={`Watching: ${name}${artist ? ` - ${artist}` : ""}`}
		>
			{image && (
				<Image
					src={image}
					alt={album || name}
					width={type === "track" ? 48 : 48}
					height={type === "track" ? 48 : 72}
					className={
						type === "track"
							? "h-12 w-12 rounded shadow"
							: "h-18 w-12 rounded shadow"
					}
					unoptimized
				/>
			)}
			<div className="flex flex-col gap-2">
				<div className="truncate">
					<span className="font-semibold">{name}</span>
				</div>
				<span>{artist && artist !== name && <>{artist}</>}</span>
			</div>
		</div>
	);
}
