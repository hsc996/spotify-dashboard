import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider"
import "../styles/ProfileHeader.css";

export function ProfileHeader(){

	let {profileData} = useSpotifyProfileData();

	if (profileData.id){
		return <div id="profileHeader">
        <h2 id="title">Spotify Stats for </h2>
        {profileData.images.length > 0 && (
        <img src={profileData.images[1].url} />
        )}
        <h1 id="name">{profileData.display_name}</h1>
      </div>
	} else {
		return <div id="profileHeader">
			<p>Please sign in to see your profile data.</p>
		</div>
	}
}