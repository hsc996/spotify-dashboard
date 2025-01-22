import { useSpotifyProfileData } from "../contexts/SpotifyProfileProvider"
import "../styles/ProfileHeader.css";

export function ProfileHeader(){

	let {profileData} = useSpotifyProfileData();

	if (profileData.id){
		return <div id="profileHeader">
					<h1 id="title">Top Tracks for</h1>
					{profileData.images.length > 0 && (
					<img src={profileData.images[1].url} />
					)}
					<h1 id="name">{profileData.display_name}</h1>
				</div>
	}
	return null;
}