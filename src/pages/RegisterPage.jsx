// // src/pages/RegisterPage.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebaseConfig"; // Import Firebase auth and Firestore instance
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // For creating user doc

// // Placeholder for a logo if you have one
// // import logo from '../assets/gbeduradar-logo.svg';

// // Placeholder data - in a real app, genres would come from Firestore or config
// const GENRES = [
//   "Afrobeats",
//   "Hip-Hop",
//   "R&B",
//   "Pop",
//   "Gospel",
//   "Fuji",
//   "Alté",
//   "Amapiano",
//   "Soul",
//   "Jazz",
// ];

// function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [selectedArtists, setSelectedArtists] = useState(new Array(5).fill("")); // Array for 5 artist inputs
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleGenreToggle = (genre) => {
//     setSelectedGenres((prev) =>
//       prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
//     );
//   };

//   const handleArtistChange = (index, value) => {
//     const newArtists = [...selectedArtists];
//     newArtists[index] = value;
//     setSelectedArtists(newArtists);
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!name || !email || !password || !confirmPassword) {
//       setError("Please fill in all required fields.");
//       setLoading(false);
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password should be at least 6 characters long.");
//       setLoading(false);
//       return;
//     }
//     // Basic check for at least one artist, can be more robust
//     const artistsToSave = selectedArtists.filter(
//       (artist) => artist.trim() !== ""
//     );
//     if (artistsToSave.length < 1) {
//       setError("Please add at least one artist to follow.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Update Firebase user profile (displayName)
//       await updateProfile(user, { displayName: name });

//       // Create a user document in Firestore
//       const userDocRef = doc(db, "users", user.uid);
//       await setDoc(userDocRef, {
//         uid: user.uid,
//         displayName: name,
//         email: user.email,
//         createdAt: serverTimestamp(),
//         followedArtists: artistsToSave.slice(0, 5), // Save the first 5 non-empty artists
//         preferredGenres: selectedGenres,
//         subscriptionTier: "free", // Default to free tier
//         notificationsEnabled: false, // Default, user will be prompted
//       });

//       navigate("/home"); // Redirect to homepage after registration
//     } catch (err) {
//       if (err.code === "auth/email-already-in-use") {
//         setError("This email address is already in use.");
//       } else if (err.code === "auth/invalid-email") {
//         setError("Please enter a valid email address.");
//       } else if (err.code === "auth/weak-password") {
//         setError("Password is too weak. Please choose a stronger password.");
//       } else {
//         setError("Failed to create an account. Please try again later.");
//         console.error("Firebase registration error:", err);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg px-4 py-12">
//       <div className="w-full max-w-lg space-y-8 p-8 sm:p-10 bg-dark-card rounded-xl shadow-2xl">
//         {/* Logo */}
// <div className="flex justify-center">
//   <Link
//     to="/"
//     className="text-4xl font-bold text-brand-primary hover:text-brand-primary-hover"
//   >
//     {/* <img src={logo} alt="GbeduRadar Logo" className="h-12" /> */}
//     GbeduRadar
//   </Link>
// </div>

// <div className="text-center">
//   <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-dark-text">
//     Join GbeduRadar
//   </h2>
//   <p className="mt-2 text-sm text-dark-text-secondary">
//     Create your account to start tracking new music.
//   </p>
// </div>

//         <form className="space-y-6" onSubmit={handleRegister}>
// <div>
//   <label
//     htmlFor="name"
//     className="block text-sm font-medium text-dark-text-secondary mb-1"
//   >
//     Full Name
//   </label>
//   <input
//     id="name"
//     name="name"
//     type="text"
//     autoComplete="name"
//     required
//     value={name}
//     onChange={(e) => setName(e.target.value)}
//     className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-dark-bg text-dark-text sm:text-sm"
//     placeholder="Your Name"
//   />
// </div>

// <div>
//   <label
//     htmlFor="email"
//     className="block text-sm font-medium text-dark-text-secondary mb-1"
//   >
//     Email address
//   </label>
//   <input
//     id="email"
//     name="email"
//     type="email"
//     autoComplete="email"
//     required
//     value={email}
//     onChange={(e) => setEmail(e.target.value)}
//     className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-dark-bg text-dark-text sm:text-sm"
//     placeholder="you@example.com"
//   />
// </div>

// <div>
//   <label
//     htmlFor="password"
//     className="block text-sm font-medium text-dark-text-secondary mb-1"
//   >
//     Password
//   </label>
//   <input
//     id="password"
//     name="password"
//     type="password"
//     required
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-dark-bg text-dark-text sm:text-sm"
//     placeholder="•••••••• (min. 6 characters)"
//   />
// </div>

// <div>
//   <label
//     htmlFor="confirmPassword"
//     className="block text-sm font-medium text-dark-text-secondary mb-1"
//   >
//     Confirm Password
//   </label>
//   <input
//     id="confirmPassword"
//     name="confirmPassword"
//     type="password"
//     required
//     value={confirmPassword}
//     onChange={(e) => setConfirmPassword(e.target.value)}
//     className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-dark-bg text-dark-text sm:text-sm"
//     placeholder="••••••••"
//   />
// </div>

//           {/* Genre Selection */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-dark-text-secondary">
//               Select Your Favorite Genres (Optional)
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {GENRES.map((genre) => (
//                 <button
//                   type="button"
//                   key={genre}
//                   onClick={() => handleGenreToggle(genre)}
//                   className={`px-3 py-1.5 text-xs rounded-full border transition-colors
//                     ${
//                       selectedGenres.includes(genre)
//                         ? "bg-brand-primary border-brand-primary text-white"
//                         : "bg-dark-bg border-gray-600 text-dark-text-secondary hover:border-brand-primary hover:text-brand-primary"
//                     }`}
//                 >
//                   {genre}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Artist Selection */}
//           <div className="space-y-3">
//             <label className="block text-sm font-medium text-dark-text-secondary">
//               Add up to 5 Artists to Follow
//             </label>
//             {selectedArtists.map((artist, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={artist}
//                 onChange={(e) => handleArtistChange(index, e.target.value)}
//                 className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-dark-bg text-dark-text sm:text-sm"
//                 placeholder={`Artist ${index + 1} Name (e.g., Wizkid)`}
//               />
//             ))}
//             <p className="text-xs text-dark-text-secondary">
//               You can change these later. Adding at least one is recommended to
//               start.
//             </p>
//           </div>

//           {error && <p className="text-sm text-red-400 text-center">{error}</p>}

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>
//           </div>
//         </form>

//         <p className="mt-8 text-center text-sm text-dark-text-secondary">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="font-medium text-brand-primary hover:text-brand-primary-hover"
//           >
//             Sign In
//           </Link>
//         </p>
//       </div>
//       <Link
//         to="/"
//         className="mt-8 text-xs text-brand-primary hover:underline dark:text-dark-text-secondary dark:hover:text-dark-text"
//       >
//         &larr; Back to Landing Page
//       </Link>
//     </div>
//   );
// }

// export default RegisterPage;

// Helper to fetch Spotify token (replace with your backend endpoint)
// async function fetchSpotifyToken() {
//   const res = await fetch("/api/spotify/token");
//   const data = await res.json();
//   return data.access_token;
// }

// export async function fetchSpotifyToken() {
//   const res = await fetch("/api/spotify/token");
//   console.log("fetchSpotifyToken RES", res);
//   if (!res.ok) {
//     const text = await res.text();
//     console.error("Token endpoint error:", text);
//     throw new Error("Failed to fetch Spotify token");
//   }
//   const { access_token } = await res.json();
//   console.log("fetchSpotifyToken access_token", res.json());
//   return access_token;
// }

// export async function fetchSpotifyToken() {
//   const res = await fetch("/api/spotify/token");
//   console.log("fetchSpotifyToken RES", res);
//   if (!res.ok) {
//     const text = await res.text();
//     console.error("Token endpoint error:", text);
//     throw new Error("Failed to fetch Spotify token");
//   }
//   const data = await res.json();
//   console.log("fetchSpotifyToken access_token", data.access_token);
//   return data.access_token;
// }

// export default function RegisterPage() {
//   const [step, setStep] = useState(1);

//   // Personal info
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Genre & artist selection
//   const [genres, setGenres] = useState([]);
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedArtists, setSelectedArtists] = useState([]);

//   // Form states
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET } = import.meta.env;

//   console.log("SPOTIFY_CLIENT_ID", VITE_SPOTIFY_CLIENT_ID);

//   // Fetch Spotify genres on step 2
//   useEffect(() => {
//     if (step !== 2) return;
//     let token = null;
//     (async () => {
//       try {
//         token = await fetchSpotifyToken();
//         console.log("Fetch Spotify genres TOKEN", token);
//         const res = await fetch(
//           "https://api.spotify.com/v1/browse/categories?limit=20",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const json = await res.json();
//         setGenres(json.categories.items);
//       } catch (e) {
//         console.error("Failed to load genres", e);
//       }
//     })();
//   }, [step]);

//   // Fetch artist suggestions as user types
//   useEffect(() => {
//     if (!searchQuery) {
//       setSuggestions([]);
//       return;
//     }
//     let token = null;
//     const timeout = setTimeout(async () => {
//       try {
//         token = await fetchSpotifyToken();
//         const res = await fetch(
//           `https://api.spotify.com/v1/search?q=${encodeURIComponent(
//             searchQuery
//           )}&type=artist&limit=5`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const json = await res.json();
//         setSuggestions(json.artists.items);
//       } catch (e) {
//         console.error("Artist search failed", e);
//       }
//     }, 300);
//     return () => clearTimeout(timeout);
//   }, [searchQuery]);

//   const toggleGenre = (id) => {
//     setSelectedGenres((prev) =>
//       prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
//     );
//   };

//   const addArtist = (artist) => {
//     if (
//       selectedArtists.find((a) => a.id === artist.id) ||
//       selectedArtists.length >= 5
//     )
//       return;
//     setSelectedArtists((prev) => [...prev, artist]);
//     setSearchQuery("");
//     setSuggestions([]);
//   };

//   const removeArtist = (id) => {
//     setSelectedArtists((prev) => prev.filter((a) => a.id !== id));
//   };

//   const handleNext = () => {
//     setError("");
//     // if (!name || !email || !password || !confirmPassword) {
//     //   setError("Please fill all fields.");
//     //   return;
//     // }
//     // if (password !== confirmPassword) {
//     //   setError("Passwords do not match.");
//     //   return;
//     // }
//     // if (password.length < 6) {
//     //   setError("Password should be at least 6 characters.");
//     //   return;
//     // }
//     setStep(2);
//   };

//   const handleRegister = async () => {
//     setError("");
//     if (selectedArtists.length < 1) {
//       setError("Please add at least one artist.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       await updateProfile(user, { displayName: name });

//       const userDoc = doc(db, "users", user.uid);
//       await setDoc(userDoc, {
//         uid: user.uid,
//         displayName: name,
//         email,
//         createdAt: serverTimestamp(),
//         followedArtists: selectedArtists.map((a) => ({
//           id: a.id,
//           name: a.name,
//           image: a.images[0]?.url,
//         })),
//         preferredGenres: selectedGenres,
//         subscriptionTier: "free",
//         notificationsEnabled: false,
//       });

//       navigate("/home");
//     } catch (err) {
//       console.error(err);
//       setError("Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebaseConfig";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import logo from "../assets/logo.svg";

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
//     console.log("Spotify token received successfully");
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

// export default function RegisterPage() {
//   const [step, setStep] = useState(1);

//   // Personal info
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Genre & artist selection
//   const [genres, setGenres] = useState([]);
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [genresLoading, setGenresLoading] = useState(false);
//   const [genresError, setGenresError] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [selectedArtists, setSelectedArtists] = useState([]);

//   // Form states
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fetch Spotify genres on step 2
//   useEffect(() => {
//     if (step !== 2) return;

//     const loadGenres = async () => {
//       setGenresLoading(true);
//       setGenresError("");

//       try {
//         const data = await fetchFromSpotify("/browse/categories?limit=20&country=US");
//         setGenres(data.categories.items);
//       } catch (err) {
//         console.error("Failed to load genres", err);
//         setGenresError("Failed to load music categories. Please try again.");
//       } finally {
//         setGenresLoading(false);
//       }
//     };

//     loadGenres();
//   }, [step]);

//   // Fetch artist suggestions as user types
//   useEffect(() => {
//     if (!searchQuery) {
//       setSuggestions([]);
//       return;
//     }

//     const timeout = setTimeout(async () => {
//       setSearchLoading(true);

//       try {
//         const data = await fetchFromSpotify(
//           `/search?q=${encodeURIComponent(searchQuery)}&type=artist&limit=5`
//         );
//         setSuggestions(data.artists.items);
//       } catch (err) {
//         console.error("Artist search failed", err);
//       } finally {
//         setSearchLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [searchQuery]);

//   const toggleGenre = (id) => {
//     setSelectedGenres((prev) =>
//       prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
//     );
//   };

//   const addArtist = (artist) => {
//     if (
//       selectedArtists.find((a) => a.id === artist.id) ||
//       selectedArtists.length >= 5
//     )
//       return;
//     setSelectedArtists((prev) => [...prev, artist]);
//     setSearchQuery("");
//     setSuggestions([]);
//   };

//   const removeArtist = (id) => {
//     setSelectedArtists((prev) => prev.filter((a) => a.id !== id));
//   };

//   const handleNext = () => {
//     setError("");

//     // Form validation
//     if (!name.trim()) {
//       setError("Please enter your name.");
//       return;
//     }

//     if (!email.trim()) {
//       setError("Please enter your email address.");
//       return;
//     }

//     if (password.length < 6) {
//       setError("Password should be at least 6 characters.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setStep(2);
//   };

//   const handleRegister = async () => {
//     setError("");
//     if (selectedArtists.length < 1) {
//       setError("Please add at least one artist.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       await updateProfile(user, { displayName: name });

//       const userDoc = doc(db, "users", user.uid);
//       await setDoc(userDoc, {
//         uid: user.uid,
//         displayName: name,
//         email,
//         createdAt: serverTimestamp(),
//         followedArtists: selectedArtists.map((a) => ({
//           id: a.id,
//           name: a.name,
//           image: a.images[0]?.url || null,
//         })),
//         preferredGenres: selectedGenres,
//         subscriptionTier: "free",
//         notificationsEnabled: false,
//       });

//       navigate("/home");
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebaseConfig";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import logo from "../assets/logo.svg";
// import { fetchFromSpotify } from "../utils/spotify";
// import { fetchGenreListFromGistFile } from "../utils/fetchGenreList";

// export default function RegisterPage() {
//   const [step, setStep] = useState(1);

//   // Personal info
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Genre & artist selection
//   const [genres, setGenres] = useState([]);
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [genresLoading, setGenresLoading] = useState(false);
//   const [genresError, setGenresError] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [searchLoading, setSearchLoading] = useState(false);
//   const [selectedArtists, setSelectedArtists] = useState([]);

//   // Form states
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [genreGistFiles, setGenreGistFiles] = useState(null);

//   // Fetch Spotify genres on step 2
//   useEffect(() => {
//     if (step !== 2) return;

//     const loadGenres = async () => {
//       setGenresLoading(true);
//       setGenresError("");

//       try {
//         const data = await fetchFromSpotify(
//           "/browse/categories?limit=20&country=US"
//         );
//         setGenres(data.categories.items);
//       } catch (err) {
//         console.error("Failed to load genres", err);
//         setGenresError("Failed to load music categories. Please try again.");
//       } finally {
//         setGenresLoading(false);
//       }
//     };

//     loadGenres();
//   }, [step]);

//   // Fetch artist suggestions as user types
//   useEffect(() => {
//     if (!searchQuery) {
//       setSuggestions([]);
//       return;
//     }

//     const timeout = setTimeout(async () => {
//       setSearchLoading(true);

//       try {
//         const data = await fetchFromSpotify(
//           `/search?q=${encodeURIComponent(searchQuery)}&type=artist&limit=5`
//         );
//         setSuggestions(data.artists.items);
//       } catch (err) {
//         console.error("Artist search failed", err);
//       } finally {
//         setSearchLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [searchQuery]);

//   const toggleGenre = (id) => {
//     setSelectedGenres((prev) =>
//       prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
//     );
//   };

//   const addArtist = (artist) => {
//     if (
//       selectedArtists.find((a) => a.id === artist.id) ||
//       selectedArtists.length >= 5
//     )
//       return;
//     setSelectedArtists((prev) => [...prev, artist]);
//     setSearchQuery("");
//     setSuggestions([]);
//   };

//   const removeArtist = (id) => {
//     setSelectedArtists((prev) => prev.filter((a) => a.id !== id));
//   };

//   const handleNext = () => {
//     setError("");

//     // Form validation
//     // if (!name.trim()) {
//     //   setError("Please enter your name.");
//     //   return;
//     // }

//     // if (!email.trim()) {
//     //   setError("Please enter your email address.");
//     //   return;
//     // }

//     // if (password.length < 6) {
//     //   setError("Password should be at least 6 characters.");
//     //   return;
//     // }

//     // if (password !== confirmPassword) {
//     //   setError("Passwords do not match.");
//     //   return;
//     // }

//     setStep(2);
//   };

//   const handlePrevious = (currentStep) => {
//     setError("");

//     setStep(currentStep - 1);
//   };

//   const handleRegister = async () => {
//     setError("");
//     if (selectedArtists.length < 1) {
//       setError("Please add at least one artist.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;
//       await updateProfile(user, { displayName: name });

//       const userDoc = doc(db, "users", user.uid);
//       await setDoc(userDoc, {
//         uid: user.uid,
//         displayName: name,
//         email,
//         createdAt: serverTimestamp(),
//         followedArtists: selectedArtists.map((a) => ({
//           id: a.id,
//           name: a.name,
//           image: a.images[0]?.url || null,
//         })),
//         preferredGenres: selectedGenres,
//         subscriptionTier: "free",
//         notificationsEnabled: false,
//       });

//       navigate("/home");
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Registration failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // console.log("fetchGenreListFromGistFile", fetchGenreListFromGistFile);

//   //   useEffect(() => {
//   //     // fetchGenreListFromGistFile
//   //     //   .then((gist) => {
//   //     //     // gist.files is an object whose keys are filenames
//   //     //     // e.g. gist.files['myData.json'].content
//   //     //     console.log(gist);
//   //     //     setFiles(gist);
//   //     //   })
//   //     //   .catch(console.error);
//   //     fetchGenreListFromGistFile()
//   //       .then((files) => {
//   //         console.log("files", files);

//   //         setFiles(files);
//   //       })
//   //       .catch(console.error);
//   //   }, []);

//   //   // if (!files) return <div>Loading...</div>;
//   // console.log("files", files);
//   //   const jsonContent = files["genre-seeds.json"]?.content;
//   //   // const data = jsonContent ? JSON.parse(jsonContent) : null;

//   useEffect(() => {
//     fetchGenreListFromGistFile()
//       .then((files) => {
//         console.log("Gist files:", files);
//         setGenreGistFiles(files);
//       })
//       .catch((err) => {
//         console.error("Error loading gist:", err);
//         toast.error("Failed to load genre list.");
//       });
//   }, []);

//   // if (!genreGistFiles) return <div></div>;

//   // Parse genre-seeds.json content
//   const rawJson = genreGistFiles
//     ? genreGistFiles["genre-seeds.json"]?.content
//     : "";
//   const genreSeeds = rawJson ? JSON.parse(rawJson).genres : [];
//   console.log("genreSeeds:", genreSeeds);

//   return (
//     // <div className="min-h-screen flex items-center justify-center bg-bg p-4">
//     <div className="h-screen flex flex-col items-center justify-center bg-bg px-4 py-20">
//       {/* //       <div className="w-full max-w-lg space-y-8 p-8 sm:p-10 bg-dark-card rounded-xl shadow-2xl"></div> */}
//       <div className="relative w-full max-w-xl max-h-dvh overflow-y-scroll overflow-hidden">
//         <div
//           className={`flex w-[200%] transition-transform duration-500 ease-in-out ${
//             step === 1 ? "-translate-x-0" : "-translate-x-1/2"
//           }`}
//         >
//           {/* Step 1 */}
//           {/* <div className="w-1/2 p-8 bg-dark-card rounded-xl"> */}
//           <div className="w-1/2 p-8 bg-card rounded-xl sm:p-10">
//             {/* <pre className="text-white">
//               {genreGistFiles && genreSeeds
//                 ? JSON.stringify(genreSeeds, null, 2)
//                 : "No JSON file named genre-seeds.json found in this gist."}
//             </pre> */}
//             {/* <h2 className="text-2xl font-bold text-text mb-4">
//               Account Details
//             </h2> */}
//             <div className="flex justify-center mb-8">
//               <Link to="/" className="">
//                 <img src={logo} alt="GbeduRadar Logo" className="h-12" />
//                 {/* GbeduRadar */}
//               </Link>
//             </div>

//             <div className="text-center mb-8">
//               <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
//                 Join GbeduRadar
//               </h2>
//               <p className="mt-2 text-sm text-text-secondary">
//                 Create your account to start tracking new music.
//               </p>
//             </div>
//             <div className="space-y-6">
//               {/* Name, email, password, confirm password inputs */}
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-text-secondary mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   autoComplete="name"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
//                   placeholder="Your Name"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-text-secondary mb-1"
//                 >
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
//                   placeholder="you@example.com"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-text-secondary mb-1"
//                 >
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
//                   placeholder="•••••••• (min. 6 characters)"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-text-secondary mb-1"
//                 >
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   required
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
//                   placeholder="••••••••"
//                 />
//               </div>
//               {error && <p className="text-red-400">{error}</p>}
//               <button
//                 onClick={handleNext}
//                 // className="w-full py-2 px-4 bg-brand-accent text-white rounded-md disabled:opacity-50"
//                 className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>

//           {/* Step 2 */}
//           <div className="w-1/2 p-8 pb-0 bg-card rounded-xl sm:p-10 sm:pb-0 flex flex-col">
//             <div className="flex-1 overflow-y-auto mb-4">
//               <div className="flex justify-center mb-8 text-text">
//                 <Link to="/" className="">
//                   Go back
//                 </Link>
//               </div>
//               <h2 className="text-2xl font-bold text-text mb-4">
//                 Choose Genres & Artists
//               </h2>
//               {/* Genre Grid */}
//               <div className="grid grid-cols-4 gap-4 mb-6">
//                 {genres.map((g) => (
//                 // {/* {genreSeeds.map((g) => ( */}
//                   <button
//                     key={g.id}
//                     onClick={() => toggleGenre(g.id)}
//                     className={`flex flex-col items-center p-2 rounded-lg border transition-colors ${
//                       selectedGenres.includes(g.id)
//                         ? "border-brand-primary"
//                         : "border-transparent hover:border-gray-600"
//                     }`}
//                   >
//                     <img
//                       src={g.icons[0]?.url}
//                       alt={g.name}
//                       className="w-16 h-16 rounded-full object-cover mb-2"
//                     />
//                     <span className="text-sm text-text-secondary">
//                       {g.name}
//                     </span>
//                   </button>
//                 ))}
//               </div>

//               {/* Artist Search & Chips */}
//               <div className="mb-4">
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {selectedArtists.map((a) => (
//                     <div
//                       key={a.id}
//                       className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full"
//                     >
//                       <img
//                         src={a.images[0]?.url}
//                         alt={a.name}
//                         className="w-6 h-6 rounded-full mr-2"
//                       />
//                       <span>{a.name}</span>
//                       <button
//                         onClick={() => removeArtist(a.id)}
//                         className="ml-2"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search for artists"
//                   className="w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-md"
//                 />
//                 {/* Suggestions */}
//                 {suggestions.length > 0 && (
//                   <ul className="border border-gray-600 rounded-md mt-2 max-h-48 overflow-y-auto">
//                     {suggestions.map((s) => (
//                       <li
//                         key={s.id}
//                         onClick={() => addArtist(s)}
//                         className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
//                       >
//                         <img
//                           src={s.images[0]?.url}
//                           alt={s.name}
//                           className="w-8 h-8 rounded-full mr-3"
//                         />
//                         <span>{s.name}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>

//             <div className="sticky bottom-0 bg-card py-4">
//               {error && <p className="text-red-400 mb-2">{error}</p>}
//               <button
//                 onClick={handleRegister}
//                 disabled={loading}
//                 className="w-full py-2 px-4 bg-brand-primary text-white rounded-md disabled:opacity-50"
//               >
//                 {loading ? "Creating Account..." : "Create Account"}
//               </button>

//               {/* <p className="mt-3 text-sm">
//                 <Link to="/login" className="text-brand-accent underline">
//                   Already have an account? Sign In
//                 </Link>
//               </p> */}
//               <p className="mt-3 text-sm text-text-secondary">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="font-medium text-brand-primary hover:text-brand-accent"
//                 >
//                   Log In
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import logo from "../assets/logo.svg";
import { fetchFromSpotify } from "../utils/spotify";
import { fetchGenreListFromGistFile } from "../utils/fetchGenreList";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  // Personal info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Genre & artist selection
  const [genreSeeds, setGenreSeeds] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(false);
  const [genresError, setGenresError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [artistsByGenre, setArtistsByGenre] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [artistsLoading, setArtistsLoading] = useState(false);
  const [selectedArtists, setSelectedArtists] = useState([]);

  // Form states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [genreGistFiles, setGenreGistFiles] = useState(null);

  // Fetch genre list from gist file
  useEffect(() => {
    const loadGenres = async () => {
      setGenresLoading(true);
      setGenresError("");

      try {
        const files = await fetchGenreListFromGistFile();
        setGenreGistFiles(files);

        // Parse genre-seeds.json content
        const rawJson = files ? files["genre-seeds.json"]?.content : "";
        const genres = rawJson ? JSON.parse(rawJson).genres : [];
        setGenreSeeds(genres);
      } catch (err) {
        console.error("Failed to load genres", err);
        setGenresError("Failed to load music categories. Please try again.");
      } finally {
        setGenresLoading(false);
      }
    };

    loadGenres();
  }, []);

  // Fetch artists when genres are selected
  useEffect(() => {
    if (selectedGenres.length === 0) {
      setArtistsByGenre([]);
      setFilteredArtists([]);
      return;
    }

    const loadArtists = async () => {
      setArtistsLoading(true);
      try {
        // Fetch artists for each selected genre
        const artistPromises = selectedGenres.map(async (genre) => {
          const data = await fetchFromSpotify(
            `/search?q=genre:${encodeURIComponent(genre)}&type=artist&limit=50`
            // `/search?q=genre:${encodeURIComponent(genre)}&type=artist`
          );
          return data.artists.items;
        });

        const results = await Promise.all(artistPromises);

        // Flatten and deduplicate artists
        const allArtists = Array.from(
          new Map(results.flat().map((artist) => [artist.id, artist])).values()
        );

        setArtistsByGenre(allArtists);
        setFilteredArtists(allArtists);
      } catch (err) {
        console.error("Failed to load artists", err);
      } finally {
        setArtistsLoading(false);
      }
    };

    loadArtists();
  }, [selectedGenres]);

  // Filter artists based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredArtists(artistsByGenre);
      return;
    }

    const filtered = artistsByGenre.filter((artist) =>
      artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArtists(filtered);
  }, [searchQuery, artistsByGenre]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) => {
      // If already selected, remove it
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre);
      }

      // If not selected but already at max (3), don't add
      if (prev.length >= 3) {
        setError("Free plan is limited to a maximum of 3 genres");
        return prev;
      }

      // Otherwise add it
      return [...prev, genre];
    });

    // Clear error when user adjusts selection
    setError("");
  };

  const addArtist = (artist) => {
    if (selectedArtists.find((a) => a.id === artist.id)) return;

    if (selectedArtists.length >= 10) {
      setError("Free plan is limited to a maximum of 10 artists");
      return;
    }

    setSelectedArtists((prev) => [...prev, artist]);
    setError("");
  };

  const removeArtist = (id) => {
    setSelectedArtists((prev) => prev.filter((a) => a.id !== id));
  };

  const handleNext = () => {
    setError("");

    // Form validation
    // if (!name.trim()) {
    //   setError("Please enter your name.");
    //   return;
    // }

    // if (!email.trim()) {
    //   setError("Please enter your email address.");
    //   return;
    // }

    // if (password.length < 6) {
    //   setError("Password should be at least 6 characters.");
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   setError("Passwords do not match.");
    //   return;
    // } //TODO: UNCOMMENT THIS IN PRODUCTION

    setStep(2);
  };

  const handlePrevious = () => {
    setError("");
    setStep(1);
  };

  const handleRegister = async () => {
    setError("");

    // Validation for genres and artists
    if (selectedGenres.length === 0) {
      setError("Please select at least one genre.");
      return;
    }

    if (selectedArtists.length < 5) {
      setError("Please select at least 5 artists.");
      return;
    }

    setLoading(true);
    try {
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // const user = userCredential.user;
      // await updateProfile(user, { displayName: name });

      // const userDoc = doc(db, "users", user.uid);
      // await setDoc(userDoc, {
      //   uid: user.uid,
      //   displayName: name,
      //   email,
      //   createdAt: serverTimestamp(),
      //   followedArtists: selectedArtists.map((a) => ({
      //     id: a.id,
      //     name: a.name,
      //     image: a.images[0]?.url || null,
      //   })),
      //   preferredGenres: selectedGenres,
      //   subscriptionTier: "free",
      //   notificationsEnabled: false,
      // });

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-bg px-4 py-20">
      <div className="relative w-full max-w-xl max-h-dvh overflow-y-scroll overflow-hidden">
        <div
          className={`flex w-[200%] transition-transform duration-500 ease-in-out ${
            step === 1 ? "-translate-x-0" : "-translate-x-1/2"
          }`}
        >
          {/* Step 1 */}
          <div className="w-1/2 p-8 bg-card rounded-xl sm:p-10">
            <div className="flex justify-center mb-6">
              <Link to="/" className="">
                <img src={logo} alt="GbeduRadar Logo" className="h-12" />
              </Link>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
                Join GbeduRadar
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Create your account to start tracking new music.
              </p>
            </div>
            <div className="space-y-6">
              {/* Name, email, password, confirm password inputs */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-secondary mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-secondary mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
                  placeholder="•••••••• (min. 6 characters)"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-text-secondary mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-bg text-text sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-400">{error}</p>}
              <button
                onClick={handleNext}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="w-1/2 p-8 pb-0 bg-card rounded-xl sm:p-10 sm:pb-0 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="flex justify-between mb-8 text-text">
                <button
                  onClick={handlePrevious}
                  className="flex items-center gap-1 text-text"
                >
                  <MdOutlineKeyboardBackspace /> Back
                </button>
                <div className="text-text-secondary text-sm">
                  Free plan: 1-3 genres, 5-10 artists
                </div>
              </div>

              {/* Genre Selection */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-text mb-4">
                  Step 1: Choose Genres (Max 3)
                </h2>
                {/* {genresLoading ? (
                  <div className="text-center py-4">Loading genres...</div>
                ) : genresError ? (
                  <div className="text-red-400 text-center py-4">{genresError}</div>
                ) : (
                  // <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex overflow-x-scroll gap-4"> */}
                {/* {genreSeeds.slice(0, 20).map((genre) => ( */}
                {/* {genreSeeds.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        // className={`flex flex-col items-center py-3 px-1 rounded-lg border transition-colors cursor-pointer ${
                        className={`flex flex-col items-center justify-center px-4 rounded-lg border transition-colors cursor-pointer ${
                          selectedGenres.includes(genre)
                            ? "border-brand-primary bg-opacity-20 bg-brand-primary"
                            : "border-gray-600 hover:border-gray-400"
                        }`}
                      >
                        <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2 overflow-hidden">
                          <span className="text-2xl text-text-secondary">{genre.slice(0, 1).toUpperCase()}</span>
                        </div>
                        <span className="text-sm text-text text-center capitalize">
                          {genre}
                        </span>
                      </button>
                    ))}
                  </div>
                )} */}

                {genresLoading ? (
                  <div className="text-center py-4 text-text-secondary">Loading genres...</div>
                ) : genresError ? (
                  <div className="text-red-400 text-center py-4">
                    {genresError}
                  </div>
                ) : (
                  <div className="relative">
                    {/* Left arrow */}
                    <button
                      onClick={() =>
                        document
                          .getElementById("genre-scroll")
                          .scrollBy({ left: -200, behavior: "smooth" })
                      }
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 cursor-pointer hover:bg-gray-700"
                    >
                      <IoChevronBackOutline className="text-text" />
                    </button>

                    {/* Scrollable strip */}
                    <div
                      id="genre-scroll"
                      className="flex snap-x snap-mandatory overflow-x-auto space-x-4 pb-2 px-4 scrollbar-none"
                    >
                      {genreSeeds.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => toggleGenre(genre)}
                          className={`
              snap-center
              flex flex-col items-center justify-center
              min-w-32 px-4 py-3
              rounded-2xl border transition-colors
              cursor-pointer
              ${
                selectedGenres.includes(genre)
                  ? "border-brand-primary bg-brand-primary/20"
                  : "border-gray-600 hover:border-gray-400"
              }
            `}
                        >
                          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2 overflow-hidden">
                            <span className="text-2xl text-text-secondary">
                              {genre.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm text-text text-center capitalize">
                            {genre}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Right arrow */}
                    <button
                      onClick={() =>
                        document
                          .getElementById("genre-scroll")
                          .scrollBy({ left: 200, behavior: "smooth" })
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 cursor-pointer hover:bg-gray-700"
                    >
                      <IoChevronForwardOutline className="text-text" />
                    </button>
                  </div>
                )}
              </div>

              {/* Artist Selection */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-text mb-4">
                  Step 2: Choose Artists (Min 5, Max 10)
                </h2>

                {selectedGenres.length === 0 ? (
                  <div className="text-center py-4 border border-dashed border-gray-600 rounded-lg text-text-secondary">
                    Please select at least one genre first
                  </div>
                ) : (
                  <>
                    {/* Selected artists chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedArtists.map((artist) => (
                        <div
                          key={artist.id}
                          className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full"
                        >
                          {artist.images && artist.images[0] ? (
                            <img
                              src={artist.images[0].url}
                              alt={artist.name}
                              className="w-6 h-6 rounded-full mr-2"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-500 mr-2" />
                          )}
                          <span>{artist.name}</span>
                          <button
                            onClick={() => removeArtist(artist.id)}
                            className="ml-2"
                            aria-label={`Remove ${artist.name}`}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Artist search */}
                    <div className="mb-4">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for artists in selected genres"
                        className="w-full px-3 py-2 bg-bg border border-gray-600 rounded-md text-text focus:outline-none focus:ring-brand-primary focus:border-brand-primary placeholder:text-text-secondary"
                      />
                    </div>

                    {/* Artist grid */}
                    {artistsLoading ? (
                      <div className="text-center py-4 text-text">Loading artists...</div>
                    ) : filteredArtists.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {filteredArtists.map((artist) => (
                          <button
                            key={artist.id}
                            onClick={() => addArtist(artist)}
                            disabled={selectedArtists.some(
                              (a) => a.id === artist.id
                            )}
                            className={`flex flex-col items-center p-2 rounded-lg border transition-colors ${
                              selectedArtists.some((a) => a.id === artist.id)
                                ? "border-brand-primary bg-opacity-20 bg-brand-primary text-text"
                                : "border-gray-600 hover:border-gray-400 text-text-secondary"
                            }`}
                          >
                            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2 overflow-hidden">
                              {artist.images && artist.images[0] ? (
                                <img
                                  src={artist.images[0].url}
                                  alt={artist.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-2xl">
                                  {artist.name.slice(0, 1)}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-center">
                              {artist.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 border border-dashed border-gray-600 rounded-lg">
                        No artists found for the selected genres
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-card py-4">
              {error && <p className="text-red-400 mb-2">{error}</p>}
              <button
                onClick={handleRegister}
                disabled={
                  loading ||
                  selectedGenres.length === 0 ||
                  selectedArtists.length < 5
                }
                className="w-full py-2 px-4 bg-brand-primary text-white rounded-md disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="mt-3 text-sm text-text-secondary">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-brand-primary hover:text-brand-accent"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
