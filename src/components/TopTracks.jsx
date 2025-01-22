import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider";
import "../styles/TopTracks.css";

export function TopTracks() {
    let { topTracks } = useSpotifyProfileData();

    if (topTracks.items && topTracks.items.length > 0) {
        return (
            <div id="topTracksContainer">
                {topTracks.items.map((track) => (
                    <div className="trackCard" key={track.name}>
                        <img src={track.album.images[0].url} alt={`${track.name} album art`} />
                        <h3>{track.name}</h3>
                        <h4>By {track.artists.map(artist => artist.name).join(", ")}</h4>
                        <button>
                            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                Listen to track
                            </a>
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return null;
}
