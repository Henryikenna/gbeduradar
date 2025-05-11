// "use strict";

// import express from "express";
// import fetch from "node-fetch";
// import qs from "qs";

// const router = express.Router();
// const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET } = import.meta.env;

// router.get("/token", async (req, res) => {
//     // console.log("SPOTIFY_CLIENT_ID", VITE_SPOTIFY_CLIENT_ID);
//   // Build Basic auth header
//   const creds = Buffer.from(
//     `${VITE_SPOTIFY_CLIENT_ID}:${VITE_SPOTIFY_CLIENT_SECRET}`
//   ).toString("base64");

//   try {
//     const response = await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: {
//         Authorization: `Basic ${creds}`,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: qs.stringify({ grant_type: "client_credentials" }),
//     });
    
//   console.log("fetchSpotifyToken ROUTER RESPONSE", response);

//     if (!response.ok) {
//       const text = await response.text();
//       console.error("Spotify token error:", text);
//       return res.status(response.status).send(text);
//     }

//     const { access_token } = await response.json();
//     res.json({ access_token });
//   } catch (err) {
//     console.error("Spotify token exception:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

// export default router;











// // Spotify API credentials and utils
// const SPOTIFY_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
// const SPOTIFY_API_BASE = "https://api.spotify.com/v1";




// // This function uses the Client Credentials Flow to get a token
// // Note: The client secret should never be exposed in frontend code in a production app
// // For a production app, you would use a backend service or serverless function to handle token requests
// async function getSpotifyToken() {
//   try {
//     // Get environment variables
//     const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
//     const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

//     if (!clientId || !clientSecret) {
//       throw new Error("Missing Spotify credentials in environment variables");
//     }

//     // Create authorization string (base64 encoded client_id:client_secret)
//     const authString = btoa(`${clientId}:${clientSecret}`);
    
//     // Request parameters for Client Credentials Flow
//     const params = new URLSearchParams();
//     params.append("grant_type", "client_credentials");
    
//     // Make the token request
//     const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Authorization": `Basic ${authString}`
//       },
//       body: params
//     });
    
//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Spotify token request failed:", errorText);
//       throw new Error("Failed to get Spotify token");
//     }
    
//     const data = await response.json();
//     // console.log("Spotify token received successfully", data);
//     return data.access_token;
//   } catch (error) {
//     console.error("Spotify token error:", error);
//     throw error;
//   }
// }

// // Helper to fetch Spotify data with automatic token handling
// async function fetchFromSpotify(endpoint, options = {}) {
//   try {
//     const token = await getSpotifyToken();
    
//     const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
//       ...options,
//       headers: {
//         ...options.headers,
//         'Authorization': `Bearer ${token}`
//       }
//     });
    
//     if (!response.ok) {
//       throw new Error(`Spotify API error: ${response.status}`);
//     }
    
//     return await response.json();
//   } catch (error) {
//     console.error(`Error fetching from Spotify (${endpoint}):`, error);
//     throw error;
//   }
// }