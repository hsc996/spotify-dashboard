import { createContext, useContext, useEffect, useState } from "react"

export const spotifyAuthScaffold = {
	access_token: "",
	token_type: "",
	expires_in: "",
	refresh_token: "",
	scope: ""
}

export const SpotifyAuthContext = createContext(spotifyAuthScaffold);

export function useSpotifyAuthContext(){
	return useContext(SpotifyAuthContext);
}

const clientId = "4a42fc02f857419d86ae01530c82c9f0";

export function SpotifyAuthProvider({children}){
	// Code required for Spotify sign-in process, not usable in API requests
	let [userAuthCode, setUserAuthCode] = useState("");
	// User access tokens and refresh tokens - represents the current signed-in user 
	let [userAuthData, setUserAuthData] = useState(spotifyAuthScaffold);

	// When the page loads, check if we received a Spotify signin result 
	useEffect(() => {
		// Attempt to find any query params from our current page URL
		const params = new URLSearchParams(window.location.search);
		// Retrieve the auth code from the query params 
		const code = params.get("code");

		// localhost:5173/spotifycallback?code=laksjcnalcknjaslfvjkhsadlfvksndvlsd,mn
		// code = laksjcnalcknjaslfvjkhsadlfvksndvlsd,mn

		setUserAuthCode(code);

		// Empty dependency array means that this useEffect only runs on page load
		// and never again
	}, []);

    useEffect(() => {
        async function getAuthData(){
            const authData = await getAuthTokens(clientId, userAuthCode);
            setUserAuthData(authData);
            // This cleans up the URL in the browser tab 
            // removing the Spotify auth data so it doesn't impact the pageload useEffect
            window.history.replace(null, "Spotify Statsboards", "/");
        }
        if (userAuthCode){
            getAuthData();
        }
        // When userAuthCode changes or initialises, we'll try and run this useEffect
    }, [userAuthCode]);

    async function getAuthTokens(clientId, code){
        const verifier = localStorage.getItem("verifier");

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        // params.append("redirect_uri", process.env.SOME_SPOTIFY_REDIRECT_URI)
        params.append("redirect_uri", "https://localhost:5173/spotifycallback");

        const result = await fetch("https://acounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-type:": "application/x-www-form-urlencoded" },
            body: params
        });

        const authTokens = await result.json();
		return authTokens;
    }

	return(
		<SpotifyAuthContext.Provider value={{userAuthData}}>
			{children}
		</SpotifyAuthContext.Provider>
	);
}