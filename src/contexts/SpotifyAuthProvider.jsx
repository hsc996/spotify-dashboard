/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
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

// Client ID from app configured in Spotify developer dashboard
// https://developer.spotify.com/dashboard
const clientId = "4a42fc02f857419d86ae01530c82c9f0";

export function SpotifyAuthProvider({children}){
	// Code required for Spotify sign-in process, not usable in API requests
	let [userAuthCode, setUserAuthCode] = useState("");
	// User access tokens and refresh tokens - represents the current signed-in user 
	let [userAuthData, setUserAuthData] = useState(spotifyAuthScaffold);

	// When the page loads, check if we received a Spotify signin result 
	useEffect(() => {
		try {
				// Attempt to find any query params from our current page URL
			console.log("Current URL: ", window.location.href);
			const params = new URLSearchParams(window.location.search);
			console.log("URL Search Params: ", window.location.search);
			// Retrieve the auth code from the query params 
			const code = params.get("code");
			if (code){
				console.log("Authorization Code: ", code);
			} else {
				console.error("No code parameter found.");
			}

			// localhost:5173/spotifycallback?code=laksjcnalcknjaslfvjkhsadlfvksndvlsd,mn
			// code = laksjcnalcknjaslfvjkhsadlfvksndvlsd,mn

			setUserAuthCode(code);

			// Empty dependency array means that this useEffect only runs on page load
			// and never again
		} catch (error) {
			console.error("Error parsing query parameters: ", error);
		}
	}, []);

	useEffect(() => {
		async function getAuthData(){
			try {
				const authData = await getAuthTokens(clientId, userAuthCode);
				setUserAuthData(authData);
				// This cleans up the URL in the browser tab 
				// removing the Spotify auth data so it doesn't impact the pageload useEffect
				window.history.replaceState(null, "Spotify Statsboards", "/");
			} catch (error) {
				console.error("Error fetching authentication tokens: ", error);
			}
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
		params.append("redirect_uri", import.meta.env.VITE_SPOTIFY_CALLBACK);
		params.append("code_verifier", verifier);

		// https://api.spotify.com/auth?client_id={clientId}&code={code}

		const result = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded"},
			body: params
		});

		if (!result.ok){
			throw new Error(`Error fetching tokens: ${result.statusText}`);
		}

		const authTokens = await result.json();
		return authTokens;
	}

	// This is the one that sends users to Spotify 
	async function redirectToAuthCodeFlow() {
		try {
			// Create a security challenge with a verifier value
			const verifier = generateCodeVerifier(128);
			const challenge = await generateCodeChallenge(verifier);
			// persist the verifier for the access token step to use later
			localStorage.setItem("verifier", verifier);
		
			// Configure the API request to begin the auth flow with Spotify
			const params = new URLSearchParams();
			params.append("client_id", clientId);
			params.append("response_type", "code");
			params.append("redirect_uri", import.meta.env.VITE_SPOTIFY_CALLBACK);
			params.append("scope", "user-top-read user-read-private user-read-email");
			params.append("code_challenge_method", "S256");
			params.append("code_challenge", challenge);
		
			document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
		} catch (error) {
			console.error("Error during redirect to auth flow: ", error);
		}
	}
	
	// Generates a random alphanumeric value to use as a security codeword
	function generateCodeVerifier(length) {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}
	
	// Generates a challenge based on a given "codeVerifier" security codeword 
	async function generateCodeChallenge(codeVerifier) {
		try {
			const data = new TextEncoder().encode(codeVerifier);
			const digest = await window.crypto.subtle.digest('SHA-256', data);
			return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
				.replace(/\+/g, '-')
				.replace(/\//g, '_')
				.replace(/=+$/, '');
		} catch (error) {
			console.error("Error generating code challenge: ", error);
			throw error;
		}
	}


	return(
		<SpotifyAuthContext.Provider value={{userAuthData, redirectToAuthCodeFlow}}>
			{children}
		</SpotifyAuthContext.Provider>
	);
}