import { NextResponse } from "next/server";

// You need to set these environment variables in your deployment
const PLEX_URL = process.env.PLEX_URL!; // e.g., http://your-plex-server:32400
const PLEX_TOKEN = process.env.PLEX_TOKEN!;

interface PlexSession {
	MediaContainer: {
		Metadata?: Array<{
			type: string; // 'track', 'movie', 'episode', etc.
			title: string;
			grandparentTitle?: string; // Artist name for music, Show name for TV
			parentTitle?: string; // Album name for music, Season for TV
			grandparentThumb?: string;
			parentThumb?: string;
			thumb?: string;
			year?: number; // For movies
			Director?: Array<{ tag: string }>; // For movies
			Player?: {
				state: string;
			};
			User?: {
				title: string;
			};
		}>;
	};
}

async function getPlexSessions(): Promise<PlexSession> {
	const response = await fetch(
		`${PLEX_URL}/status/sessions?X-Plex-Token=${PLEX_TOKEN}`,
		{
			headers: {
				Accept: "application/json",
			},
			next: { revalidate: 30 },
		},
	);

	if (!response.ok) {
		throw new Error("Failed to fetch Plex sessions");
	}

	return response.json();
}

export async function GET(): Promise<Response> {
	try {
		const data = await getPlexSessions();

		// Check if there are any active sessions
		const sessions = data.MediaContainer.Metadata;

		if (!sessions || sessions.length === 0) {
			return NextResponse.json(
				{ is_playing: false, item: null },
				{ status: 200 },
			);
		}

		// Find the first playing media (any type) by user "ryck"
		const playingMedia = sessions.find(
			(session) =>
				session.Player?.state === "playing" && session.User?.title === "ryck",
		);

		if (!playingMedia) {
			return NextResponse.json(
				{ is_playing: false, item: null },
				{ status: 200 },
			);
		}

		// Format the response based on media type
		let formattedItem;
		switch (playingMedia.type) {
			case "track":
				// Music track
				formattedItem = {
					name: playingMedia.title,
					artist: playingMedia.grandparentTitle || "Unknown Artist",
					album: playingMedia.parentTitle || "Unknown Album",
					image: playingMedia.thumb
						? `${PLEX_URL}${playingMedia.thumb}?X-Plex-Token=${PLEX_TOKEN}`
						: null,
					type: "track",
					year: playingMedia.year || null,
				};
				break;
			case "movie":
				// Movie
				formattedItem = {
					name: playingMedia.title,
					artist: playingMedia.Director?.[0]?.tag,
					album: "", // No album for movies
					image: playingMedia.thumb
						? `${PLEX_URL}${playingMedia.thumb}?X-Plex-Token=${PLEX_TOKEN}`
						: null,
					type: "movie",
					year: playingMedia.year || null,
				};
				break;
			case "episode":
				// TV Episode
				formattedItem = {
					name: playingMedia.title,
					artist: playingMedia.grandparentTitle || "TV Show",
					album: playingMedia.parentTitle || "", // Season info
					image: playingMedia.grandparentThumb
						? `${PLEX_URL}${playingMedia.grandparentThumb}?X-Plex-Token=${PLEX_TOKEN}`
						: null,
					type: "episode",
				};
				break;
			default:
				// Other media types
				formattedItem = {
					name: playingMedia.title,
					artist: playingMedia.grandparentTitle || playingMedia.type,
					album: playingMedia.parentTitle || "",
					image: playingMedia.thumb
						? `${PLEX_URL}${playingMedia.thumb}?X-Plex-Token=${PLEX_TOKEN}`
						: null,
					type: playingMedia.type,
				};
		}

		return NextResponse.json(
			{
				is_playing: true,
				item: formattedItem,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error("Plex API error:", error);
		return NextResponse.json(
			{ is_playing: false, item: null, error: String(error) },
			{ status: 200 },
		);
	}
}
