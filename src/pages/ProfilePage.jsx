// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebaseConfig";
// import { signOut, updateProfile as updateAuthProfile } from "firebase/auth";
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
// } from "firebase/firestore";
// import { useAuth } from "../contexts/AuthContext";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { FaArrowRightToBracket } from "react-icons/fa6";

// const MAX_ARTISTS_FREE = 10;
// const MAX_ARTISTS_PRO = 50;

// function ProfilePage() {
//   const { profile } = useAuth();
//   const [currentUser, setCurrentUser] = useState(profile);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [editingName, setEditingName] = useState("");

//   const [newArtist, setNewArtist] = useState("");
//   const [artistManagementError, setArtistManagementError] = useState("");
//   const [artistManagementLoading, setArtistManagementLoading] = useState(false);

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const fetchUserData = async () => {
//   //     setLoading(true);
//   //     const user = auth.currentUser;
//   //     if (user) {
//   //       try {
//   //         const userDocRef = doc(db, 'users', user.uid);
//   //         const docSnap = await getDoc(userDocRef);
//   //         if (docSnap.exists()) {
//   //           const userData = docSnap.data();
//   //           setCurrentUser({
//   //             uid: user.uid,
//   //             email: user.email, // From auth
//   //             ...userData // displayName, followedArtists, subscriptionTier etc from Firestore
//   //           });
//   //           setEditingName(userData.displayName || '');
//   //         } else {
//   //           // Fallback if Firestore doc doesn't exist, though it should have been created on register
//   //           setCurrentUser({
//   //             uid: user.uid,
//   //             displayName: user.displayName || 'User',
//   //             email: user.email,
//   //             followedArtists: [],
//   //             subscriptionTier: 'free',
//   //           });
//   //           setEditingName(user.displayName || 'User');
//   //           setError('User profile data not found in database. Defaults loaded.');
//   //         }
//   //       } catch (err) {
//   //         console.error("Error fetching user data:", err);
//   //         setError("Could not load your profile data. Please try again.");
//   //         // Potentially set currentUser to a minimal state from auth if Firestore fails
//   //         //  setCurrentUser({
//   //         //     uid: user.uid,
//   //         //     displayName: user.displayName || 'User',
//   //         //     email: user.email,
//   //         //     followedArtists: [],
//   //         //     subscriptionTier: 'free',
//   //         //   });
//   //       }
//   //     } else {
//   //       // No user logged in, redirect to login (this should ideally be handled by a ProtectedRoute component)
//   //       navigate('/login');
//   //     }
//   //     setLoading(false);
//   //   };

//   //   fetchUserData();
//   // }, [navigate]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       setError("Failed to log out. Please try again.");
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     if (!editingName.trim()) {
//       setError("Name cannot be empty.");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         // Update Firebase Auth profile
//         await updateAuthProfile(user, { displayName: editingName });
//         // Update Firestore document
//         const userDocRef = doc(db, "users", user.uid);
//         await updateDoc(userDocRef, { displayName: editingName });
//         setCurrentUser((prev) => ({ ...prev, displayName: editingName }));
//         setIsEditingProfile(false);
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile. Please try again.");
//     }
//     setLoading(false);
//   };

//   const handleAddArtist = async (e) => {
//     e.preventDefault();
//     if (!newArtist.trim()) {
//       setArtistManagementError("Artist name cannot be empty.");
//       return;
//     }
//     const currentMaxArtists =
//       currentUser.subscriptionTier === "pro"
//         ? MAX_ARTISTS_PRO
//         : MAX_ARTISTS_FREE;
//     if (currentUser.followedArtists.length >= currentMaxArtists) {
//       setArtistManagementError(
//         `You've reached the limit of ${currentMaxArtists} artists for your plan.`
//       );
//       return;
//     }
//     if (
//       currentUser.followedArtists
//         .map((a) => a.toLowerCase())
//         .includes(newArtist.trim().toLowerCase())
//     ) {
//       setArtistManagementError(
//         `You are already following ${newArtist.trim()}.`
//       );
//       setNewArtist("");
//       return;
//     }

//     setArtistManagementLoading(true);
//     setArtistManagementError("");
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const userDocRef = doc(db, "users", user.uid);
//         await updateDoc(userDocRef, {
//           followedArtists: arrayUnion(newArtist.trim()),
//         });
//         setCurrentUser((prev) => ({
//           ...prev,
//           followedArtists: [...prev.followedArtists, newArtist.trim()],
//         }));
//         setNewArtist("");
//       }
//     } catch (err) {
//       console.error("Error adding artist:", err);
//       setArtistManagementError("Failed to add artist. Please try again.");
//     }
//     setArtistManagementLoading(false);
//   };

//   const handleRemoveArtist = async (artistToRemove) => {
//     setArtistManagementLoading(true);
//     setArtistManagementError("");
//     try {
//       // const user = auth.currentUser;
//       // console.log(currentUser);
//       if (profile) {
//         const userDocRef = doc(db, "users", profile.uid);
//         await updateDoc(userDocRef, {
//           followedArtists: arrayRemove(artistToRemove),
//         });
//         setCurrentUser((prev) => ({
//           ...prev,
//           followedArtists: prev.followedArtists.filter(
//             (artist) => artist !== artistToRemove
//           ),
//         }));
//       }
//     } catch (err) {
//       console.error("Error removing artist:", err);
//       setArtistManagementError("Failed to remove artist. Please try again.");
//     }
//     setArtistManagementLoading(false);
//   };

//   if (loading && !currentUser) {
//     // Show loading only if currentUser is not yet set from a previous render
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-text">
//         Loading Profile...
//       </div>
//     );
//   }

//   if (!currentUser) {
//     // This case should ideally be caught by a redirect if not loading,
//     // but as a fallback:
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg text-dark-text p-4">
//         <p className="mb-4">
//           You are not logged in or your session has expired.
//         </p>
//         <Link
//           to="/login"
//           className="px-6 py-2 bg-brand-accent text-white rounded-md hover:bg-brand-accent-hover"
//         >
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   const currentMaxArtists =
//     currentUser.subscriptionTier === "pro" ? MAX_ARTISTS_PRO : MAX_ARTISTS_FREE;

//   console.log("CURRENT USER", currentUser);
//   // console.log("CURRENT USER FOLLOWING LIST", currentUser.followedArtists[0].id);

//   return (
//     <div className="min-h-screen bg-bg text-text pb-12">
//       {/* Header */}
//       <header className="bg-card shadow-md py-4 px-4 sm:px-8 sticky top-0 z-10">
//         <div className="container mx-auto flex justify-between items-center">
//           <div
//             // to="/home"
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-base font-bold text-brand-primary hover:text-brand-primary-hover cursor-pointer"
//           >
//             <MdOutlineKeyboardBackspace className="text-xl" /> Go back
//           </div>
//           <h1 className="text-2xl font-semibold text-text">Your Profile</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
//             disabled={loading}
//           >
//             Logout <FaArrowRightToBracket />
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto p-4 md:p-6 space-y-8">
//         {error && (
//           <p className="bg-red-500/20 text-red-400 p-3 rounded-md text-sm text-center">
//             {error}
//           </p>
//         )}

//         {/* User Details Section */}
//         <section className="bg-card p-6 rounded-lg shadow-lg">
//           <div className="flex justify-between items-start">
//             <h2 className="text-xl font-semibold mb-4 text-brand-primary">
//               Your Details
//             </h2>
//             {!isEditingProfile && (
//               <button
//                 onClick={() => {
//                   setIsEditingProfile(true);
//                   setEditingName(currentUser.displayName);
//                   setError("");
//                 }}
//                 className="text-xs px-3 py-1 bg-brand-accent/80 hover:bg-brand-accent text-white rounded-md"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>

//           {!isEditingProfile ? (
//             <div className="space-y-2 text-sm">
//               <p>
//                 <strong className="text-text-secondary">Name:</strong>{" "}
//                 {currentUser.displayName}
//               </p>
//               <p>
//                 <strong className="text-text-secondary">Email:</strong>{" "}
//                 {currentUser.email}
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleProfileUpdate} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="editingName"
//                   className="block text-sm font-medium text-text-secondary mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   id="editingName"
//                   type="text"
//                   value={editingName}
//                   onChange={(e) => setEditingName(e.target.value)}
//                   className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//                 />
//               </div>
//               <div className="flex items-center space-x-3">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 text-sm bg-brand-primary hover:bg-brand-primary-hover text-white rounded-md disabled:opacity-50"
//                 >
//                   {loading ? "Saving..." : "Save Changes"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditingProfile(false)}
//                   className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-text rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </section>

//         {/* Subscription Section */}
//         <section className="bg-card p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-4 text-brand-primary">
//             Subscription
//           </h2>
//           <div className="text-sm">
//             <p>
//               <strong className="text-text-secondary">Current Plan:</strong>
//               <span
//                 className={`ml-2 font-semibold ${
//                   currentUser.subscriptionTier === "pro"
//                     ? "text-brand-accent"
//                     : "text-dark-text"
//                 }`}
//               >
//                 {currentUser.subscriptionTier === "pro"
//                   ? "Pro Tier"
//                   : "Free Tier"}
//               </span>
//             </p>
//             <p className="text-xs text-text-secondary mt-1">
//               {currentUser.subscriptionTier === "free"
//                 ? `Follow up to ${MAX_ARTISTS_FREE} artists and get announcement day alerts.`
//                 : `Follow up to ${MAX_ARTISTS_PRO} artists and get all 3 alert types.`}
//             </p>
//             {currentUser.subscriptionTier === "free" && (
//               <button
//                 onClick={() =>
//                   alert("Placeholder: Navigate to subscription upgrade page.")
//                 } // TODO: Link to actual subscription page
//                 className="mt-4 px-4 py-2 text-sm bg-brand-accent hover:bg-brand-accent-hover text-white rounded-md"
//               >
//                 Upgrade to Pro (₦500/month)
//               </button>
//             )}
//             {currentUser.subscriptionTier === "pro" && (
//               <button
//                 onClick={() =>
//                   alert("Placeholder: Navigate to manage subscription page.")
//                 } // TODO: Link to actual subscription management
//                 className="mt-4 px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-dark-text rounded-md"
//               >
//                 Manage Subscription
//               </button>
//             )}
//           </div>
//         </section>

//         {/* Followed Artists Section */}
//         <section className="bg-card p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-1 text-brand-primary">
//             Artists You Follow
//           </h2>
//           <p className="text-xs text-text-secondary mb-4">
//             ({currentUser.followedArtists?.length || 0} / {currentMaxArtists})
//           </p>

//           <form
//             onSubmit={handleAddArtist}
//             className="flex items-center gap-3 mb-6"
//           >
//             <input
//               type="text"
//               value={newArtist}
//               onChange={(e) => setNewArtist(e.target.value)}
//               placeholder="Add artist name (e.g., Olamide)"
//               className="flex-grow bg-dark-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//               disabled={
//                 currentUser.followedArtists?.length >= currentMaxArtists
//               }
//             />
//             <button
//               type="submit"
//               disabled={
//                 artistManagementLoading ||
//                 !newArtist.trim() ||
//                 currentUser.followedArtists?.length >= currentMaxArtists
//               }
//               className="px-4 py-2 text-sm bg-brand-accent hover:bg-brand-accent-hover text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {artistManagementLoading ? "Adding..." : "Add"}
//             </button>
//           </form>
//           {artistManagementError && (
//             <p className="text-red-400 text-xs mb-4">{artistManagementError}</p>
//           )}

//           {currentUser.followedArtists &&
//           currentUser.followedArtists.length > 0 ? (
//             <ul className="space-y-2">
//               {currentUser.followedArtists.map((artist) => (
//                 <li
//                   key={artist.id}
//                   className="flex justify-between items-center p-2 bg-bg rounded text-sm"
//                 >
//                   <div className="flex items-center">
//                     {artist.image ? (
//                       <img
//                         src={artist.image}
//                         alt={artist.name}
//                         className="w-6 h-6 rounded-full mr-2"
//                       />
//                     ) : (
//                       <div className="w-6 h-6 rounded-full bg-gray-500 mr-2" />
//                     )}
//                     <span className="">{artist.name}</span>
//                   </div>
//                   <button
//                     onClick={() => handleRemoveArtist(artist)}
//                     disabled={artistManagementLoading}
//                     className="text-xs px-2 py-0.5 bg-red-600/70 hover:bg-red-600 text-white rounded-sm disabled:opacity-50"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-text-secondary">
//               You are not following any artists yet.
//             </p>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// export default ProfilePage;



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { auth, db } from "../firebaseConfig";
// import { signOut, updateProfile as updateAuthProfile } from "firebase/auth";
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
//   arrayRemove,
// } from "firebase/firestore";
// import { useAuth } from "../contexts/AuthContext";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";
// import { FaArrowRightToBracket } from "react-icons/fa6";
// import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
// import { fetchFromSpotify } from "../utils/spotify";
// import {
//   fetchGenreListFromGistFile,
//   MANUAL_GENRES,
// } from "../utils/fetchGenreList";

// const MAX_ARTISTS_FREE = 10;
// const MAX_ARTISTS_PRO = 50;
// const MAX_GENRES_FREE = 3;
// const MAX_GENRES_PRO = 15;

// function ProfilePage() {
//   const { profile } = useAuth();
//   const [currentUser, setCurrentUser] = useState(profile);
//   const [loading, setLoading] = useState(true);
//   const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [editingName, setEditingName] = useState("");

//   // Artists management
//   const [newArtist, setNewArtist] = useState("");
//   const [artistSearchQuery, setArtistSearchQuery] = useState("");
//   const [artistManagementError, setArtistManagementError] = useState("");
//   const [artistManagementLoading, setArtistManagementLoading] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [artistsLoading, setArtistsLoading] = useState(false);

//   // Genres management
//   const [genreSeeds, setGenreSeeds] = useState([]);
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [genresLoading, setGenresLoading] = useState(false);
//   const [genresError, setGenresError] = useState("");
//   const [isManagingGenres, setIsManagingGenres] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (profile) {
//       setCurrentUser(profile);
//       setEditingName(profile.displayName || "");
//       setSelectedGenres(profile.preferredGenres || []);
//       setLoading(false);
//     }
//   }, [profile]);

//   // Fetch genre list when managing genres
//   useEffect(() => {
//     if (isManagingGenres) {
//       const loadGenres = async () => {
//         setGenresLoading(true);
//         setGenresError("");

//         try {
//           const files = await fetchGenreListFromGistFile();

//           // Parse genre-seeds.json content
//           const rawJson = files ? files["genre-seeds.json"]?.content : "";
//           const genres = rawJson ? JSON.parse(rawJson).genres : [];

//           // Merge fetched + manual ones, filtering out duplicates
//           const allGenres = Array.from(new Set([...genres, ...MANUAL_GENRES]));
//           allGenres.sort((a, b) =>
//             a.localeCompare(b, undefined, { sensitivity: "base" })
//           );

//           setGenreSeeds(allGenres);
//         } catch (err) {
//           console.error("Failed to load genres", err);
//           setGenresError("Failed to load music categories. Please try again.");
//         } finally {
//           setGenresLoading(false);
//         }
//       };

//       loadGenres();
//     }
//   }, [isManagingGenres]);

//   // Fetch artists when search query changes and genres are selected
//   useEffect(() => {
//     if (!artistSearchQuery.trim() || selectedGenres.length === 0) {
//       setSearchResults([]);
//       return;
//     }

//     const searchArtists = async () => {
//       setArtistsLoading(true);
//       try {
//         // Search artists with genre filter and name query
//         const genreFilter = selectedGenres.map(genre => `genre:${encodeURIComponent(genre)}`).join(" ");
//         const query = `${encodeURIComponent(artistSearchQuery)} ${genreFilter}`;
//         // const genreFilter = selectedGenres.map(genre => `${encodeURIComponent(genre)}`).join(" ");
//         // const query = `${encodeURIComponent(artistSearchQuery)} genre:${genreFilter}`;

//         console.log("HREF", `/search?q=${encodeURIComponent(query)}&type=artist&limit=50`)
//         const data = await fetchFromSpotify(
//           // `/search?q=${query}&type=artist&limit=20`
//           `/search?q=${encodeURIComponent(query)}&type=artist&limit=50`
//         );

//         console.log(data);

//         setSearchResults(data.artists.items);

//         // Fetch artists for each selected genre
//         // const artistPromises = selectedGenres.map(async (genre) => {
//         //   const data = await fetchFromSpotify(
//         //     `/search?q=genre:${encodeURIComponent(genre)}&type=artist&limit=50`
//         //     // `/search?q=genre:${encodeURIComponent(genre)}&type=artist`
//         //   );
//         //   return data.artists.items;
//         // });

//         // const results = await Promise.all(artistPromises);

//         // // Flatten and deduplicate artists
//         // const allArtists = Array.from(
//         //   new Map(results.flat().map((artist) => [artist.id, artist])).values()
//         // );

//         // console.log(allArtists);

//         // setSearchResults(allArtists);
//       } catch (err) {
//         console.error("Failed to search artists", err);
//         setArtistManagementError("Failed to search artists. Please try again.");
//       } finally {
//         setArtistsLoading(false);
//       }
//     };

//     // Debounce search to avoid too many API calls
//     const timer = setTimeout(searchArtists, 500);
//     return () => clearTimeout(timer);
//   }, [artistSearchQuery, selectedGenres]);

//   const toggleGenre = (genre) => {
//     setSelectedGenres((prev) => {
//       // If already selected, remove it
//       if (prev.includes(genre)) {
//         return prev.filter((g) => g !== genre);
//       }

//       // If not selected but already at max limit based on subscription, don't add
//       const currentMaxGenres =
//         currentUser.subscriptionTier === "pro"
//           ? MAX_GENRES_PRO
//           : MAX_GENRES_FREE;
//       if (prev.length >= currentMaxGenres) {
//         setGenresError(
//           `${
//             currentUser.subscriptionTier === "pro" ? "Pro" : "Free"
//           } plan is limited to a maximum of ${currentMaxGenres} genres`
//         );
//         return prev;
//       }

//       // Otherwise add it
//       return [...prev, genre];
//     });

//     // Clear error when user adjusts selection
//     setGenresError("");
//   };

//   const saveGenres = async () => {
//     if (selectedGenres.length === 0) {
//       setGenresError("Please select at least one genre.");
//       return;
//     }

//     setGenresLoading(true);
//     try {
//       if (profile) {
//         const userDocRef = doc(db, "users", profile.uid);
//         await updateDoc(userDocRef, {
//           preferredGenres: selectedGenres,
//         });

//         setCurrentUser((prev) => ({
//           ...prev,
//           preferredGenres: selectedGenres,
//         }));

//         setIsManagingGenres(false);
//       }
//     } catch (err) {
//       console.error("Error updating genres:", err);
//       setGenresError("Failed to update genres. Please try again.");
//     } finally {
//       setGenresLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       setError("Failed to log out. Please try again.");
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     if (!editingName.trim()) {
//       setError("Name cannot be empty.");
//       return;
//     }
//     setProfileUpdateLoading(true);
//     setError("");
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         // Update Firebase Auth profile
//         await updateAuthProfile(user, { displayName: editingName });
//         // Update Firestore document
//         const userDocRef = doc(db, "users", user.uid);
//         await updateDoc(userDocRef, { displayName: editingName });
//         setCurrentUser((prev) => ({ ...prev, displayName: editingName }));
//         setIsEditingProfile(false);
//       }
//     } catch (err) {
//       console.error("Error updating profile:", err);
//       setError("Failed to update profile. Please try again.");
//     }
//     setProfileUpdateLoading(false);
//   };

//   const handleAddArtist = async (artist) => {
//     if (!artist) return;

//     // Check if already following
//     if (
//       currentUser.followedArtists &&
//       currentUser.followedArtists.some((a) => a.id === artist.id)
//     ) {
//       setArtistManagementError(`You are already following ${artist.name}.`);
//       return;
//     }

//     const currentMaxArtists =
//       currentUser.subscriptionTier === "pro"
//         ? MAX_ARTISTS_PRO
//         : MAX_ARTISTS_FREE;
//     if (
//       currentUser.followedArtists &&
//       currentUser.followedArtists.length >= currentMaxArtists
//     ) {
//       setArtistManagementError(
//         `You've reached the limit of ${currentMaxArtists} artists for your plan.`
//       );
//       return;
//     }

//     setArtistManagementLoading(true);
//     setArtistManagementError("");
//     try {
//       const user = auth.currentUser;
//       if (user) {
//         const artistData = {
//           id: artist.id,
//           name: artist.name,
//           image: artist.images[0]?.url || null,
//         };

//         const userDocRef = doc(db, "users", user.uid);
//         await updateDoc(userDocRef, {
//           followedArtists: arrayUnion(artistData),
//         });

//         setCurrentUser((prev) => ({
//           ...prev,
//           followedArtists: [...(prev.followedArtists || []), artistData],
//         }));

//         setArtistSearchQuery("");
//         setSearchResults([]);
//       }
//     } catch (err) {
//       console.error("Error adding artist:", err);
//       setArtistManagementError("Failed to add artist. Please try again.");
//     }
//     setArtistManagementLoading(false);
//   };

//   const handleRemoveArtist = async (artistToRemove) => {
//     setArtistManagementLoading(true);
//     setArtistManagementError("");
//     try {
//       if (profile) {
//         const userDocRef = doc(db, "users", profile.uid);
//         await updateDoc(userDocRef, {
//           followedArtists: arrayRemove(artistToRemove),
//         });
//         setCurrentUser((prev) => ({
//           ...prev,
//           followedArtists: prev.followedArtists.filter(
//             (artist) => artist.id !== artistToRemove.id
//           ),
//         }));
//       }
//     } catch (err) {
//       console.error("Error removing artist:", err);
//       setArtistManagementError("Failed to remove artist. Please try again.");
//     }
//     setArtistManagementLoading(false);
//   };

//   if (loading && !currentUser) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-text">
//         Loading Profile...
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg text-dark-text p-4">
//         <p className="mb-4">
//           You are not logged in or your session has expired.
//         </p>
//         <Link
//           to="/login"
//           className="px-6 py-2 bg-brand-accent text-white rounded-md hover:bg-brand-accent-hover"
//         >
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   const currentMaxArtists =
//     currentUser.subscriptionTier === "pro" ? MAX_ARTISTS_PRO : MAX_ARTISTS_FREE;
//   const currentMaxGenres =
//     currentUser.subscriptionTier === "pro" ? MAX_GENRES_PRO : MAX_GENRES_FREE;

//   return (
//     <div className="min-h-screen bg-bg text-text pb-12">
//       {/* Header */}
//       <header className="bg-card shadow-md py-4 px-4 sm:px-8 sticky top-0 z-10">
//         <div className="container mx-auto flex justify-between items-center">
//           <div
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-base font-bold text-brand-primary hover:text-brand-primary-hover cursor-pointer"
//           >
//             <MdOutlineKeyboardBackspace className="text-xl" /> Go back
//           </div>
//           <h1 className="text-2xl font-semibold text-text">Your Profile</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
//             disabled={loading}
//           >
//             Logout <FaArrowRightToBracket />
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto p-4 md:p-6 space-y-8">
//         {error && (
//           <p className="bg-red-500/20 text-red-400 p-3 rounded-md text-sm text-center">
//             {error}
//           </p>
//         )}

//         {/* User Details Section */}
//         <section className="bg-card p-6 rounded-lg shadow-lg">
//           <div className="flex justify-between items-start">
//             <h2 className="text-xl font-semibold mb-4 text-brand-primary">
//               Your Details
//             </h2>
//             {!isEditingProfile && (
//               <button
//                 onClick={() => {
//                   setIsEditingProfile(true);
//                   setEditingName(currentUser.displayName);
//                   setError("");
//                 }}
//                 className="text-xs px-3 py-1 bg-brand-accent/80 hover:bg-brand-accent text-white rounded-md"
//               >
//                 Edit Profile
//               </button>
//             )}
//           </div>

//           {!isEditingProfile ? (
//             <div className="space-y-2 text-sm">
//               <p>
//                 <strong className="text-text-secondary">Name:</strong>{" "}
//                 {currentUser.displayName}
//               </p>
//               <p>
//                 <strong className="text-text-secondary">Email:</strong>{" "}
//                 {currentUser.email}
//               </p>
//             </div>
//           ) : (
//             <form onSubmit={handleProfileUpdate} className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="editingName"
//                   className="block text-sm font-medium text-text-secondary mb-1"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   id="editingName"
//                   type="text"
//                   value={editingName}
//                   onChange={(e) => setEditingName(e.target.value)}
//                   className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//                 />
//               </div>
//               <div className="flex items-center space-x-3">
//                 <button
//                   type="submit"
//                   disabled={profileUpdateLoading}
//                   className="px-4 py-2 text-sm bg-brand-primary hover:bg-brand-primary-hover text-white rounded-md disabled:opacity-50"
//                 >
//                   {profileUpdateLoading ? "Saving..." : "Save Changes"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditingProfile(false)}
//                   className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-text rounded-md"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}
//         </section>

//         {/* Subscription Section */}
//         <section className="bg-card p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-4 text-brand-primary">
//             Subscription
//           </h2>
//           <div className="text-sm">
//             <p>
//               <strong className="text-text-secondary">Current Plan:</strong>
//               <span
//                 className={`ml-2 font-semibold ${
//                   currentUser.subscriptionTier === "pro"
//                     ? "text-brand-accent"
//                     : "text-dark-text"
//                 }`}
//               >
//                 {currentUser.subscriptionTier === "pro"
//                   ? "Pro Tier"
//                   : "Free Tier"}
//               </span>
//             </p>
//             <p className="text-xs text-text-secondary mt-1">
//               {currentUser.subscriptionTier === "free"
//                 ? `Follow up to ${MAX_ARTISTS_FREE} artists, ${MAX_GENRES_FREE} genres and get announcement day alerts.`
//                 : `Follow up to ${MAX_ARTISTS_PRO} artists, ${MAX_GENRES_PRO} genres and get all 3 alert types.`}
//             </p>
//             {currentUser.subscriptionTier === "free" && (
//               <button
//                 onClick={() =>
//                   alert("Placeholder: Navigate to subscription upgrade page.")
//                 }
//                 className="mt-4 px-4 py-2 text-sm bg-brand-accent hover:bg-brand-accent-hover text-white rounded-md"
//               >
//                 Upgrade to Pro (₦500/month)
//               </button>
//             )}
//             {currentUser.subscriptionTier === "pro" && (
//               <button
//                 onClick={() =>
//                   alert("Placeholder: Navigate to manage subscription page.")
//                 }
//                 className="mt-4 px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-dark-text rounded-md"
//               >
//                 Manage Subscription
//               </button>
//             )}
//           </div>
//         </section>

//         {/* Genre Management Section */}
//         <section className="bg-card p-6 rounded-lg shadow-lg">
//           <div className="flex justify-between items-start">
//             <h2 className="text-xl font-semibold mb-1 text-brand-primary">
//               Your Preferred Genres
//             </h2>
//             {!isManagingGenres && (
//               <button
//                 onClick={() => setIsManagingGenres(true)}
//                 className="text-xs px-3 py-1 bg-brand-accent/80 hover:bg-brand-accent text-white rounded-md"
//               >
//                 Manage Genres
//               </button>
//             )}
//           </div>
//           <p className="text-xs text-text-secondary mb-4">
//             ({selectedGenres?.length || 0} / {currentMaxGenres})
//           </p>

//           {!isManagingGenres ? (
//             <div className="flex flex-wrap gap-2">
//               {selectedGenres && selectedGenres.length > 0 ? (
//                 selectedGenres.map((genre) => (
//                   <div
//                     key={genre}
//                     className="bg-gray-700 px-3 py-1 rounded-full text-sm"
//                   >
//                     {genre}
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-text-secondary">
//                   You haven't selected any preferred genres yet.
//                 </p>
//               )}
//             </div>
//           ) : (
//             <div className="mt-4">
//               {genresError && (
//                 <p className="text-red-400 text-sm mb-4">{genresError}</p>
//               )}

//               {genresLoading ? (
//                 <div className="text-center py-4">Loading genres...</div>
//               ) : (
//                 <div className="relative">
//                   {/* Left arrow */}
//                   <button
//                     onClick={() =>
//                       document
//                         .getElementById("genre-scroll")
//                         .scrollBy({ left: -200, behavior: "smooth" })
//                     }
//                     className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 cursor-pointer hover:bg-gray-700"
//                   >
//                     <IoChevronBackOutline className="text-text" />
//                   </button>

//                   {/* Scrollable strip */}
//                   <div
//                     id="genre-scroll"
//                     className="flex snap-x snap-mandatory overflow-x-auto space-x-4 pb-2 px-4 scrollbar-none"
//                   >
//                     {genreSeeds.map((genre) => (
//                       <button
//                         key={genre}
//                         onClick={() => toggleGenre(genre)}
//                         className={`
//                           snap-center
//                           flex flex-col items-center justify-center
//                           min-w-32 px-4 py-3
//                           rounded-2xl border transition-colors
//                           cursor-pointer
//                           ${
//                             selectedGenres.includes(genre)
//                               ? "border-brand-primary bg-brand-primary/20"
//                               : "border-gray-600 hover:border-gray-400"
//                           }
//                         `}
//                       >
//                         <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-2 overflow-hidden">
//                           <span className="text-2xl text-text-secondary">
//                             {genre.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                         <span className="text-sm text-text text-center capitalize">
//                           {genre}
//                         </span>
//                       </button>
//                     ))}
//                   </div>

//                   {/* Right arrow */}
//                   <button
//                     onClick={() =>
//                       document
//                         .getElementById("genre-scroll")
//                         .scrollBy({ left: 200, behavior: "smooth" })
//                     }
//                     className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 cursor-pointer hover:bg-gray-700"
//                   >
//                     <IoChevronForwardOutline className="text-text" />
//                   </button>
//                 </div>
//               )}

//               <div className="flex justify-end mt-6 space-x-3">
//                 <button
//                   onClick={() => {
//                     setIsManagingGenres(false);
//                     // Reset to original genres if canceling
//                     setSelectedGenres(currentUser.preferredGenres || []);
//                   }}
//                   className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-text rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={saveGenres}
//                   disabled={genresLoading}
//                   className="px-4 py-2 text-sm bg-brand-primary hover:bg-brand-primary-hover text-white rounded-md disabled:opacity-50"
//                 >
//                   {genresLoading ? "Saving..." : "Save Genres"}
//                 </button>
//               </div>
//             </div>
//           )}
//         </section>

//         {/* Followed Artists Section */}
//         <section className="bg-card p-6 rounded-lg shadow-lg">
//           <h2 className="text-xl font-semibold mb-1 text-brand-primary">
//             Artists You Follow
//           </h2>
//           <p className="text-xs text-text-secondary mb-4">
//             ({currentUser.followedArtists?.length || 0} / {currentMaxArtists})
//           </p>

//           {/* Artist Search */}
//           <div className="mb-6">
//             <label
//               htmlFor="artistSearch"
//               className="block text-sm font-medium text-text-secondary mb-2"
//             >
//               Search for artists to follow:
//             </label>
//             <div className="flex items-center gap-3">
//               <input
//                 id="artistSearch"
//                 type="text"
//                 value={artistSearchQuery}
//                 onChange={(e) => setArtistSearchQuery(e.target.value)}
//                 placeholder="Search by artist name"
//                 disabled={selectedGenres.length === 0}
//                 className="flex-grow bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//               />
//             </div>
//             {selectedGenres.length === 0 && (
//               <p className="text-amber-400 text-xs mt-1">
//                 Please add at least one genre before searching for artists.
//               </p>
//             )}
//           </div>

//           {/* Search Results */}
//           {artistSearchQuery && searchResults.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-sm font-medium text-text-secondary mb-2">
//                 Search Results:
//               </h3>
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                 {searchResults.map((artist) => (
//                   <button
//                     key={artist.id}
//                     onClick={() => handleAddArtist(artist)}
//                     disabled={
//                       artistManagementLoading ||
//                       currentUser.followedArtists?.some(
//                         (a) => a.id === artist.id
//                       )
//                     }
//                     className={`flex flex-col items-center p-2 rounded-lg border transition-colors ${
//                       currentUser.followedArtists?.some(
//                         (a) => a.id === artist.id
//                       )
//                         ? "border-brand-primary bg-opacity-20 bg-brand-primary text-text cursor-not-allowed"
//                         : "border-gray-600 hover:border-gray-400 text-text-secondary"
//                     }`}
//                   >
//                     <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-2 overflow-hidden">
//                       {artist.images && artist.images[0] ? (
//                         <img
//                           src={artist.images[0].url}
//                           alt={artist.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-xl">
//                           {artist.name.slice(0, 1)}
//                         </span>
//                       )}
//                     </div>
//                     <span className="text-xs text-center truncate w-full">
//                       {artist.name}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {artistsLoading && (
//             <div className="text-center py-4">Searching artists...</div>
//           )}

//           {artistManagementError && (
//             <p className="text-red-400 text-xs mb-4">{artistManagementError}</p>
//           )}

//           {/* Followed Artists List */}
//           <h3 className="text-sm font-medium text-text-secondary mb-2">
//             Your followed artists:
//           </h3>
//           {currentUser.followedArtists &&
//           currentUser.followedArtists.length > 0 ? (
//             <ul className="space-y-2">
//               {currentUser.followedArtists.map((artist) => (
//                 <li
//                   key={artist.id}
//                   className="flex justify-between items-center p-2 bg-bg rounded text-sm"
//                 >
//                   <div className="flex items-center">
//                     {artist.image ? (
//                       <img
//                         src={artist.image}
//                         alt={artist.name}
//                         className="w-6 h-6 rounded-full mr-2"
//                       />
//                     ) : (
//                       <div className="w-6 h-6 rounded-full bg-gray-500 mr-2" />
//                     )}
//                     <span className="">{artist.name}</span>
//                   </div>
//                   <button
//                     onClick={() => handleRemoveArtist(artist)}
//                     disabled={artistManagementLoading}
//                     className="text-xs px-2 py-0.5 bg-red-600/70 hover:bg-red-600 text-white rounded-sm disabled:opacity-50"
//                   >
//                     Remove
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-text-secondary">
//               You are not following any artists yet.
//             </p>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// export default ProfilePage;
















import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signOut, updateProfile as updateAuthProfile } from "firebase/auth"; 
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext"; 
import { MdOutlineKeyboardBackspace } from "react-icons/md"; 
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { fetchFromSpotify } from "../utils/spotify";
import {
  fetchGenreListFromGistFile,
  MANUAL_GENRES,
} from "../utils/fetchGenreList";

const MAX_ARTISTS_FREE = 10;
const MAX_ARTISTS_PRO = 50;
const MAX_GENRES_FREE = 3;
const MAX_GENRES_PRO = 15;

function ProfilePage() {
  const { profile } = useAuth();
  const [currentUser, setCurrentUser] = useState(profile);
  const [loading, setLoading] = useState(true); // General page loading
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editingName, setEditingName] = useState("");

  // Artists management
  const [artistSearchQuery, setArtistSearchQuery] = useState("");
  const [artistManagementError, setArtistManagementError] = useState("");
  const [artistManagementLoading, setArtistManagementLoading] = useState(false); // For add/remove actions
  const [searchResults, setSearchResults] = useState([]); // Filtered artists for display
  const [artistsLoading, setArtistsLoading] = useState(false); // For initial loading of artists by genre
  const [allFetchedArtists, setAllFetchedArtists] = useState([]); // NEW: Stores all artists based on preferred genres

  // Genres management
  const [genreSeeds, setGenreSeeds] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]); // For genre editing UI
  const [genresLoading, setGenresLoading] = useState(false);
  const [genresError, setGenresError] = useState("");
  const [isManagingGenres, setIsManagingGenres] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setCurrentUser(profile);
      setEditingName(profile.displayName || "");
      setSelectedGenres(profile.preferredGenres || []); // Initialize for genre management UI
      setLoading(false);
    } else {
      // If no profile and not already loading, it implies user might not be fetched yet or is logged out.
      // If it remains null after AuthContext has tried loading, then redirection or error might be needed.
      // For now, this relies on the !currentUser check later for redirection.
      setLoading(false); // Stop general loading if profile is null initially
    }
  }, [profile]); 

  // Fetch genre list when "Manage Genres" is opened
  useEffect(() => {
    if (isManagingGenres) {
      const loadGenres = async () => {
        setGenresLoading(true); 
        setGenresError(""); 
        try {
          const files = await fetchGenreListFromGistFile(); 
          const rawJson = files ? files["genre-seeds.json"]?.content : ""; 
          const genres = rawJson ? JSON.parse(rawJson).genres : []; 
          const allGenres = Array.from(new Set([...genres, ...MANUAL_GENRES])); 
          allGenres.sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
          );
          setGenreSeeds(allGenres); 
        } catch (err) {
          console.error("Failed to load genres", err); 
          setGenresError("Failed to load music categories. Please try again."); 
        } finally {
          setGenresLoading(false); 
        }
      };
      loadGenres(); 
    }
  }, [isManagingGenres]); 

  // Fetch artists based on user's preferred genres
  useEffect(() => {
    if (!currentUser || !currentUser.preferredGenres || currentUser.preferredGenres.length === 0) {
      setAllFetchedArtists([]);
      setSearchResults([]); // Clear search results if no genres
      setArtistsLoading(false); // Ensure loading is false if no genres
      return;
    }

    const loadArtistsByGenre = async () => {
      setArtistsLoading(true); 
      setArtistManagementError("");
      try {
        const artistPromises = currentUser.preferredGenres.map(async (genre) => {
          const data = await fetchFromSpotify(
            `/search?q=genre:${encodeURIComponent(genre)}&type=artist&limit=50` 
          );
          return data.artists.items; 
        });

        const results = await Promise.all(artistPromises); 
        // Flatten and deduplicate artis
        const uniqueArtists = Array.from(
          new Map(results.flat().map((artist) => [artist.id, artist])).values()
        );
        setAllFetchedArtists(uniqueArtists);
      } catch (err) {
        console.error("Failed to load artists by genre", err);
        setArtistManagementError("Failed to load artists based on your genres. Please try again.");
        setAllFetchedArtists([]);
        setSearchResults([]);
      } finally {
        setArtistsLoading(false);
      }
    };

    loadArtistsByGenre();
  }, [currentUser]); // Re-fetch if currentUser or their preferredGenres change

 useEffect(() => {
    if (!artistSearchQuery.trim()) {
      setSearchResults(allFetchedArtists); // Show all fetched artists if search is empty 
      return;
    }
    // Filter artists local
    const filtered = allFetchedArtists.filter((artist) =>
      artist.name.toLowerCase().includes(artistSearchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  }, [artistSearchQuery, allFetchedArtists]);


  const toggleGenre = (genre) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genre)) {
        return prev.filter((g) => g !== genre); 
      }
      const currentMaxGenres =
        currentUser.subscriptionTier === "pro"
          ? MAX_GENRES_PRO 
          : MAX_GENRES_FREE; 
      if (prev.length >= currentMaxGenres) {
        setGenresError(
          `${
            currentUser.subscriptionTier === "pro" ? "Pro" : "Free"
          } plan is limited to a maximum of ${currentMaxGenres} genres` 
        );
        return prev;
      }
      return [...prev, genre]; 
    });
    setGenresError(""); 
  };

  const saveGenres = async () => {
    if (selectedGenres.length === 0) {
      setGenresError("Please select at least one genre."); 
      return; 
    }
    setGenresLoading(true); 
    try {
      if (profile) {
        const userDocRef = doc(db, "users", profile.uid); 
        await updateDoc(userDocRef, {
          preferredGenres: selectedGenres, 
        });
        setCurrentUser((prev) => ({
          ...prev,
          preferredGenres: selectedGenres, 
        }));
        setIsManagingGenres(false); 
      }
    } catch (err) {
      console.error("Error updating genres:", err); 
      setGenresError("Failed to update genres. Please try again."); 
    } finally {
      setGenresLoading(false); 
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate("/login"); 
    } catch (err) {
      console.error("Logout error:", err); 
      setError("Failed to log out. Please try again."); 
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault(); 
    if (!editingName.trim()) {
      setError("Name cannot be empty."); 
      return;
    }
    setProfileUpdateLoading(true); 
    setError(""); 
    try {
      const user = auth.currentUser; 
      if (user) { 
        await updateAuthProfile(user, { displayName: editingName }); 
        const userDocRef = doc(db, "users", user.uid); 
        await updateDoc(userDocRef, { displayName: editingName }); 
        setCurrentUser((prev) => ({ ...prev, displayName: editingName })); 
        setIsEditingProfile(false); 
      }
    } catch (err) {
      console.error("Error updating profile:", err); 
      setError("Failed to update profile. Please try again."); 
    }
    setProfileUpdateLoading(false); 
  };

  const handleAddArtist = async (artist) => {
    if (!artist) return; 
    if (
      currentUser.followedArtists &&
      currentUser.followedArtists.some((a) => a.id === artist.id) 
    ) {
      setArtistManagementError(`You are already following ${artist.name}.`); 
      return; 
    }

    const currentMaxArtists =
      currentUser.subscriptionTier === "pro"
        ? MAX_ARTISTS_PRO 
        : MAX_ARTISTS_FREE; 
    if (
      currentUser.followedArtists &&
      currentUser.followedArtists.length >= currentMaxArtists 
    ) {
      setArtistManagementError(
        `You've reached the limit of ${currentMaxArtists} artists for your plan.` 
      );
      return; 
    }

    setArtistManagementLoading(true); //  For the add operation itself
    setArtistManagementError(""); 
    try {
      const user = auth.currentUser; 
      if (user) { 
        const artistData = {
          id: artist.id, 
          name: artist.name, 
          image: artist.images && artist.images[0] ? artist.images[0].url : null, 
        };
        const userDocRef = doc(db, "users", user.uid); 
        await updateDoc(userDocRef, {
          followedArtists: arrayUnion(artistData), 
        });
        setCurrentUser((prev) => ({
          ...prev,
          followedArtists: [...(prev.followedArtists || []), artistData], 
        }));
        // Do not clear artistSearchQuery here, user might want to add more from the same search
        // setSearchResults([]); // Results will naturally update if the artist is now followed (disabled button)
      }
    } catch (err) {
      console.error("Error adding artist:", err); 
      setArtistManagementError("Failed to add artist. Please try again."); 
    }
    setArtistManagementLoading(false); 
  };

  const handleRemoveArtist = async (artistToRemove) => {
    setArtistManagementLoading(true); 
    setArtistManagementError(""); 
    try {
      if (profile) { 
        const userDocRef = doc(db, "users", profile.uid); 
        await updateDoc(userDocRef, {
          followedArtists: arrayRemove(artistToRemove), 
        });
        setCurrentUser((prev) => ({
          ...prev,
          followedArtists: prev.followedArtists.filter(
            (artist) => artist.id !== artistToRemove.id 
          ),
        }));
      }
    } catch (err) {
      console.error("Error removing artist:", err); 
      setArtistManagementError("Failed to remove artist. Please try again."); 
    }
    setArtistManagementLoading(false); 
  };

  if (loading && !currentUser) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg text-dark-text">
        Loading Profile...
      </div>
    );
  }

  if (!currentUser) { 
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg text-dark-text p-4">
        <p className="mb-4">
          You are not logged in or your session has expired.
        </p>
        <Link
          to="/login"
          className="px-6 py-2 bg-brand-accent text-white rounded-md hover:bg-brand-accent-hover"
        >
          Go to Login
        </Link>
      </div> 
    );
  }

  const currentMaxArtists =
    currentUser.subscriptionTier === "pro" ? MAX_ARTISTS_PRO : MAX_ARTISTS_FREE; 
  const currentMaxGenres =
    currentUser.subscriptionTier === "pro" ? MAX_GENRES_PRO : MAX_GENRES_FREE; 

  return (
    <div className="min-h-screen bg-bg text-text pb-12"> 
      <header className="bg-card shadow-md py-4 px-4 sm:px-8 sticky top-0 z-10"> 
        <div className="container mx-auto flex justify-between items-center"> 
          <div
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-base font-bold text-brand-primary hover:text-brand-primary-hover cursor-pointer"
          >
            <MdOutlineKeyboardBackspace className="text-xl" /> Go back 
          </div>
          <h1 className="text-2xl font-semibold text-text">Your Profile</h1> 
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
            disabled={profileUpdateLoading} // Changed from 'loading' to 'profileUpdateLoading' or other specific loading if needed
          >
            Logout <FaArrowRightToBracket />
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 space-y-8">
        {error && (
          <p className="bg-red-500/20 text-red-400 p-3 rounded-md text-sm text-center">
            {error}
          </p>
        )}

        {/* User Details Section */}
        <section className="bg-card p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-4 text-brand-primary">
              Your Details
            </h2>
            {!isEditingProfile && (
              <button
                onClick={() => {
                  setIsEditingProfile(true);
                  setEditingName(currentUser.displayName || "");
                  setError("");
                }}
                className="text-xs px-3 py-1 bg-brand-accent/80 hover:bg-brand-accent text-white rounded-md"
              >
                Edit Profile
              </button>
            )}
          </div>

          {!isEditingProfile ? (
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-text-secondary">Name:</strong>{" "}
                {currentUser.displayName}
              </p>
              <p>
                <strong className="text-text-secondary">Email:</strong>{" "}
                {currentUser.email}
              </p>
            </div>
          ) : (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label
                  htmlFor="editingName"
                  className="block text-sm font-medium text-text-secondary mb-1"
                >
                  Full Name
                </label>
                <input
                  id="editingName"
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
                />
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  disabled={profileUpdateLoading}
                  className="px-4 py-2 text-sm bg-brand-primary hover:bg-brand-primary-hover text-white rounded-md disabled:opacity-50"
                >
                  {profileUpdateLoading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-text rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Subscription Section */}
        <section className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-brand-primary">
            Subscription
          </h2>
          <div className="text-sm">
            <p>
              <strong className="text-text-secondary">Current Plan:</strong>
              <span
                className={`ml-2 font-semibold ${
                  currentUser.subscriptionTier === "pro"
                    ? "text-brand-accent"
                    : "text-dark-text"
                }`}
              >
                {currentUser.subscriptionTier === "pro"
                  ? "Pro Tier"
                  : "Free Tier"}
              </span>
            </p>
            <p className="text-xs text-text-secondary mt-1">
              {currentUser.subscriptionTier === "free"
                ? `Follow up to ${MAX_ARTISTS_FREE} artists, ${MAX_GENRES_FREE} genres and get announcement day alerts.`
                : `Follow up to ${MAX_ARTISTS_PRO} artists, ${MAX_GENRES_PRO} genres and get all 3 alert types.`}
            </p>
            {currentUser.subscriptionTier === "free" && (
              <button
                onClick={() =>
                  alert("Placeholder: Navigate to subscription upgrade page.")
                }
                className="mt-4 px-4 py-2 text-sm bg-brand-accent hover:bg-brand-accent-hover text-white rounded-md"
              >
                Upgrade to Pro (₦500/month)
              </button>
            )}
            {currentUser.subscriptionTier === "pro" && (
              <button
                onClick={() =>
                  alert("Placeholder: Navigate to manage subscription page.")
                }
                className="mt-4 px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-dark-text rounded-md"
              >
                Manage Subscription
              </button>
            )}
          </div>
        </section>

        {/* Genre Management Section */}
        <section className="bg-card p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold mb-1 text-brand-primary">
              Your Preferred Genres
            </h2>
            {!isManagingGenres && (
              <button
                onClick={() => setIsManagingGenres(true)}
                className="text-xs px-3 py-1 bg-brand-accent/80 hover:bg-brand-accent text-white rounded-md"
              >
                Manage Genres
              </button>
            )}
          </div>
          <p className="text-xs text-text-secondary mb-4">
            ({(currentUser.preferredGenres || []).length} / {currentMaxGenres}) {/* Modified to use currentUser.preferredGenres for count */}
          </p> 

          {!isManagingGenres ? (
            <div className="flex flex-wrap gap-2">
              {currentUser.preferredGenres && currentUser.preferredGenres.length > 0 ? (
                currentUser.preferredGenres.map((genre) => (
                  <div
                    key={genre}
                    className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-secondary">
                  You haven't selected any preferred genres yet.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-4">
              {genresError && (
                <p className="text-red-400 text-sm mb-4">{genresError}</p>
              )}
              {genresLoading ? (
                <div className="text-center py-4">Loading genres...</div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() =>
                      document
                        .getElementById("genre-scroll-profile") // Unique ID
                        .scrollBy({ left: -200, behavior: "smooth" })
                    }
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 cursor-pointer hover:bg-gray-700"
                  >
                    <IoChevronBackOutline className="text-text" />
                  </button>
                  <div
                    id="genre-scroll-profile" // Unique ID
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
                  <button
                    onClick={() =>
                      document
                        .getElementById("genre-scroll-profile") // Unique ID
                        .scrollBy({ left: 200, behavior: "smooth" })
                    }
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gray-800 cursor-pointer hover:bg-gray-700"
                  >
                    <IoChevronForwardOutline className="text-text" />
                  </button>
                </div>
              )}
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => {
                    setIsManagingGenres(false);
                    setSelectedGenres(currentUser.preferredGenres || []); // Reset to saved genres
                    setGenresError("");
                  }}
                  className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-text rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={saveGenres}
                  disabled={genresLoading}
                  className="px-4 py-2 text-sm bg-brand-primary hover:bg-brand-primary-hover text-white rounded-md disabled:opacity-50"
                >
                  {genresLoading ? "Saving..." : "Save Genres"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Followed Artists Section */}
        <section className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-1 text-brand-primary">
            Artists You Follow
          </h2>
          <p className="text-xs text-text-secondary mb-4">
            ({currentUser.followedArtists?.length || 0} / {currentMaxArtists})
          </p>

          {/* Artist Search */}
          <div className="mb-6">
            <label
              htmlFor="artistSearch"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              Search for artists to follow (based on your preferred genres):
            </label>
            <div className="flex items-center gap-3">
              <input
                id="artistSearch"
                type="text"
                value={artistSearchQuery}
                onChange={(e) => setArtistSearchQuery(e.target.value)}
                placeholder="Search by artist name"
                disabled={(!currentUser.preferredGenres || currentUser.preferredGenres.length === 0) || artistsLoading}
                className="flex-grow bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>
            {(!currentUser.preferredGenres || currentUser.preferredGenres.length === 0) && !artistsLoading && (
              <p className="text-amber-400 text-xs mt-1">
                Please add at least one genre from the 'Your Preferred Genres' section above before searching for artists.
              </p>
            )}
          </div>
          
          {artistManagementError && (
            <p className="text-red-400 text-xs mb-4 text-center">{artistManagementError}</p>
          )}

          {/* Artist Search Results / Available Artists */}
          {artistsLoading ? (
            <div className="text-center py-4 text-text-secondary">Loading available artists...</div>
          ) : !artistsLoading && (!allFetchedArtists || allFetchedArtists.length === 0) && currentUser.preferredGenres && currentUser.preferredGenres.length > 0 ? (
            <p className="text-sm text-text-secondary text-center py-4">
              No artists found for your selected genres. Try adding more genres.
            </p>
          ) : !artistsLoading && searchResults.length === 0 && artistSearchQuery && allFetchedArtists.length > 0 ? (
            <p className="text-sm text-text-secondary text-center py-4">
              No artists found matching your search criteria.
            </p>
          ) : !artistsLoading && searchResults.length > 0 ? (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-text-secondary mb-2">
                {artistSearchQuery ? "Search Results:" : "Available Artists (based on your preferred genres):"}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {searchResults.map((artist) => (
                  <button
                    key={artist.id}
                    onClick={() => handleAddArtist(artist)}
                    disabled={
                      artistManagementLoading || // For the add operation itself
                      (currentUser.followedArtists?.some( (a) => a.id === artist.id))
                    }
                    className={`flex flex-col items-center p-2 rounded-lg border transition-colors ${
                      currentUser.followedArtists?.some( (a) => a.id === artist.id)
                        ? "border-brand-primary bg-opacity-20 bg-brand-primary text-text cursor-not-allowed"
                        : "border-gray-600 hover:border-gray-400 text-text-secondary"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-2 overflow-hidden">
                      {artist.images && artist.images[0] ? (
                        <img
                          src={artist.images[0].url}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xl">
                          {artist.name?.slice(0, 1).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-center truncate w-full">
                      {artist.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null }


          {/* Followed Artists List */}
          <h3 className="text-sm font-medium text-text-secondary mb-2 mt-6">
            Your followed artists:
          </h3>
          {currentUser.followedArtists &&
          currentUser.followedArtists.length > 0 ? (
            <ul className="space-y-2">
              {currentUser.followedArtists.map((artist) => (
                <li
                  key={artist.id}
                  className="flex justify-between items-center p-2 bg-bg rounded text-sm"
                >
                  <div className="flex items-center">
                    {artist.image ? (
                      <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-500 mr-2" />
                    )}
                    <span className="">{artist.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveArtist(artist)}
                    disabled={artistManagementLoading} // For the remove operation
                    className="text-xs px-2 py-0.5 bg-red-600/70 hover:bg-red-600 text-white rounded-sm disabled:opacity-50"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-secondary">
              You are not following any artists yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;