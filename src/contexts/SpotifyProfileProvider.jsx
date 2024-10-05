import { createContext, useContext, useEffect, useState } from "react"
import { useSpotifyAuthContext } from "./SpotifyAuthProvider";


export const defaultProfileData = {
	userId: "",
	email: "",
	uri: "",
	link: "",
	profileImage: "",
}

// export const defaultProfileData
// import {defaultProfileData} from "./SpotifyProfileProvider.jsx";
// 
// export default const defaultProfileData
// import defaultProfileData from "./SpotifyProfileProvider.jsx"

export const SpotifyProfileContext = createContext(defaultProfileData);

export function useSpotifyProfileData(){
	return useContext(SpotifyProfileContext);
}

export function SpotifyProfileProvider({children}){

	let [profileData, setProfileData] = useState(defaultProfileData);
	let [topTracks, setTopTracks] = useState({});

	// Access auth data from AuthProvider so that we can make more fetch requsts
	let {userAuthData} = useSpotifyAuthContext();

	async function fetchProfileData(accessToken){
		const result = await fetch(
			"https://api.spotify.com/v1/me",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		return await result.json();
	}

	async function fetchTopTracks(accessToken){
		const result = await fetch(
			"https://api.spotify.com/v1/me/top/tracks",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		);

		return await result.json();
	}

	useEffect(() => {
		// if authdata has an access token, start making fetch requests
		if (userAuthData && userAuthData.access_token){
			fetchProfileData(userAuthData.access_token).then(profileData => {
				setProfileData(profileData);
			});
			fetchTopTracks(userAuthData.access_token).then(result => {
				setTopTracks(result);
			});
		}

		// whenever auth data changes, check it and maybe make fetch request
	}, [userAuthData]);

	return (
		<SpotifyProfileContext.Provider value={{profileData, topTracks}}>
			{children}
		</SpotifyProfileContext.Provider>
	)
}