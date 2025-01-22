import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider";
import "../styles/TopTracks.css";

export function TopTracks() {
    let { topTracks } = useSpotifyProfileData();

    if (topTracks.items && topTracks.items.length > 0) {
        return (
            <div className="flex flex-wrap justify-center gap-9 p-4">
                {topTracks.items.map((track) => (
                    <div
                        className="trackCard w-64 h-80 flex flex-col items-center bg-white shadow-md rounded-lg overflow-hidden"
                        key={track.name}
                    >
                        <img
                            src={track.album.images[0].url}
                            alt={`${track.name} album art`}
                            className="w-full h-40 object-contain"
                        />
                        <div className="p-4 flex flex-col items-center">
                            <h3 className="text-lg font-semibold text-center">{track.name}</h3>
                            <h4 className="text-sm text-gray-600 text-center">
                                By {track.artists.map((artist) => artist.name).join(", ")}
                            </h4>
                            <button className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-purple-600">
                                <a
                                    href={track.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    Listen to track
                                </a>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}
