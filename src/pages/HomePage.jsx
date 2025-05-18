// // src/pages/HomePage.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import SongCard from "../components/SongCard";

// import logo from "../assets/logo.svg";
// import { useAuth } from "../contexts/AuthContext";
// import { FaArrowRightLong } from "react-icons/fa6";

// // Mock data for releases - replace with actual data fetching from Firebase
// const mockReleases = {
//   announced: [
//     {
//       id: "a1",
//       title: "Sounds From The Other Side Vol. 2",
//       artist: "Wizkid",
//       releaseDate: "June 15, 2025",
//       announcedDate: "May 10, 2025",
//       artworkUrl: "https://images.unsplash.com/photo-1722971380810-a4f29b2efc36?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       votes: { excitement: 105 },
//       userVote: {},
//     },
//     {
//       id: "a2",
//       title: "Love Damini Deluxe",
//       artist: "Burna Boy",
//       releaseDate: "July 1, 2025",
//       announcedDate: "May 5, 2025",
//       artworkUrl: "https://images.unsplash.com/photo-1744578413523-33596836891b?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       votes: { excitement: 230 },
//       userVote: { excitement: "excited" },
//     },
//   ],
//   releasingTomorrow: [
//     {
//       id: "rt1",
//       title: "New Single Teaser",
//       artist: "Ayra Starr",
//       releaseDate: "May 12, 2025",
//       artworkUrl: "https://images.unsplash.com/photo-1745282480794-10427e218c76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       votes: { excitement: 500 },
//       userVote: {},
//     },
//   ],
//   liveNow: [
//     {
//       id: "ln1",
//       title: "Timeless Album",
//       artist: "Davido",
//       releaseDate: "May 8, 2025",
//       artworkUrl: "https://images.unsplash.com/photo-1746083984990-ba2a8cabc88e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       votes: { quality: 1200 },
//       userVote: {},
//     },
//     {
//       id: "ln2",
//       title: "Work of Art",
//       artist: "Asake",
//       releaseDate: "May 6, 2025",
//       artworkUrl: "https://images.unsplash.com/uploads/1411074708175ba26fea4/498d4c3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       votes: { quality: 950 },
//       userVote: { quality: "good" },
//     },
//   ],
// };

// // Mock user - replace with actual auth state

// function HomePage() {
//   // const mockCurrentUser = {
//   //   displayName: "Henry",
//   //   // photoURL: 'https://via.placeholder.com/40'
//   // };

//   const { profile } = useAuth();
//   console.log("PROFILE DATA", profile);

//   const [currentUser, setCurrentUser] = useState(profile); // Replace with actual auth logic
//   const [releases, setReleases] = useState(mockReleases); // Replace with actual fetching logic
//   const [loading, setLoading] = useState(false); // For data fetching
//   const [error, setError] = useState("");

//   const [showNotificationReminder, setShowNotificationReminder] =
//     useState(false);
//   const [notificationPermission, setNotificationPermission] =
//     useState("default"); // 'default', 'granted', 'denied'

//   // --- Placeholder for actual Firebase User & Data Fetching ---
//   useEffect(() => {
//     // // Listen for auth state changes
//     // const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
//     //   if (user) {
//     //     // Fetch user profile from Firestore
//     //     const userDocRef = doc(db, 'users', user.uid);
//     //     const userDocSnap = await getDoc(userDocRef);
//     //     if (userDocSnap.exists()) {
//     //       setCurrentUser({ uid: user.uid, ...userDocSnap.data() });
//     //     } else {
//     //       setCurrentUser({ uid: user.uid, displayName: user.displayName, email: user.email });
//     //     }
//     //     // Check notification permission status
//     //     if (typeof Notification !== 'undefined') {
//     //         setNotificationPermission(Notification.permission);
//     //         if (Notification.permission === 'denied') {
//     //             setShowNotificationReminder(true);
//     //         } else if (Notification.permission === 'default') {
//     //             // Optionally prompt here or wait for user interaction
//     //         }
//     //     }
//     //   } else {
//     //     setCurrentUser(null);
//     //     // navigate('/login'); // Redirect if not logged in (handle in App.jsx or a protected route component)
//     //   }
//     // });
//     // // Fetch releases data (simplified - this would be more complex)
//     // setLoading(true);
//     // const fetchReleases = async () => {
//     //   try {
//     //     // This is where you'd query Firestore based on followed artists, etc.
//     //     // For now, we use mock data.
//     //     // const releasesSnapshot = await getDocs(collection(db, 'releases'));
//     //     // const fetchedReleases = releasesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
//     //     // setReleases(groupReleases(fetchedReleases)); // You'd need a helper to group them
//     //     setTimeout(() => { // Simulate fetch delay
//     //       setReleases(mockReleases);
//     //       setLoading(false);
//     //     }, 1000);
//     //   } catch (err) {
//     //     console.error("Error fetching releases:", err);
//     //     setError("Could not load releases.");
//     //     setLoading(false);
//     //   }
//     // };
//     // fetchReleases();
//     // return () => unsubscribeAuth(); // Cleanup auth listener
//   }, []);

//   const requestNotificationPermission = async () => {
//     // if (!('Notification' in window) || !('serviceWorker' in navigator) || !messaging) {
//     //   alert("This browser does not support desktop notification or Firebase Messaging is not initialized.");
//     //   return;
//     // }
//     // try {
//     //   const permission = await Notification.requestPermission();
//     //   setNotificationPermission(permission);
//     //   if (permission === 'granted') {
//     //     setShowNotificationReminder(false);
//     //     console.log('Notification permission granted.');
//     //     // Get token
//     //     // const currentToken = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY_FROM_FIREBASE_CONSOLE' });
//     //     // if (currentToken) {
//     //     //   console.log('FCM Token:', currentToken);
//     //     //   // Send this token to your server (Cloud Function) to save it against the user
//     //     // } else {
//     //     //   console.log('No registration token available. Request permission to generate one.');
//     //     // }
//     //   } else {
//     //     console.log('Notification permission denied.');
//     //     setShowNotificationReminder(true);
//     //   }
//     // } catch (error) {
//     //   console.error('Error requesting notification permission: ', error);
//     // }
//     alert("Placeholder: Requesting notification permission...");
//     // For testing UI:
//     setNotificationPermission((prev) =>
//       prev === "denied" ? "default" : "denied"
//     );
//     setShowNotificationReminder((prev) => !prev);
//   };

//   // --- Render Logic ---
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-bg text-text">
//         Loading Gbedu...
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-bg text-red-400">
//         {error}
//       </div>
//     );
//   }
//   if (!currentUser) {
//     // This should ideally be handled by a protected route redirecting to login
//     return (
//       <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-bg text-text">
//         Please log in to see your radar.

//         <Link to="/login">
//               {/* Placeholder for profile icon */}
//               <div className="px-4 py-2 bg-brand-primary rounded-full flex gap-2 items-center justify-center text-white font-medium">
//                 Go to Login <FaArrowRightLong />
//               </div>
//             </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-bg text-text">
//       {/* Notification Reminder Bar */}
//       {showNotificationReminder && notificationPermission === "denied" && (
//         <div className="bg-brand-accent text-white text-sm p-2 text-center flex justify-between items-center">
//           <span>Enable notifications to get instant alerts!</span>
//           <button
//             onClick={requestNotificationPermission}
//             className="ml-4 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-xs"
//           >
//             Request Permission
//           </button>
//           <button
//             onClick={() => setShowNotificationReminder(false)}
//             className="ml-2 text-lg"
//           >
//             &times;
//           </button>
//         </div>
//       )}

//       {/* Header */}
//       {/* <header className="bg-card shadow-md p-4 sticky top-0 z-10"> */}
//       <header className="py-4 px-4 sm:px-8 lg:px-16 shadow-lg shadow-brand-primary/10">
//         <div className="container mx-auto flex justify-between items-center">
//           <Link to="/" className="">
//             <img src={logo} alt="GbeduRadar Logo" className="h-12" />
//           </Link>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-text-secondary">
//               Hi, {currentUser.displayName || "User"}!
//             </span>
//             <Link to="/profile">
//               {/* Placeholder for profile icon */}
//               <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-semibold">
//                 {currentUser.displayName
//                   ? currentUser.displayName.charAt(0).toUpperCase()
//                   : "U"}
//               </div>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto p-4 md:p-6">
//         {/* Filters (Placeholder UI) */}
//         <div className="mb-6 p-4 bg-card rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-3 text-text">Filters</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label
//                 htmlFor="genre-filter"
//                 className="block text-xs font-medium text-text-secondary mb-1"
//               >
//                 Genre
//               </label>
//               <select
//                 id="genre-filter"
//                 className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//               >
//                 <option value="">All Genres</option>
//                 {/* Populate with actual genres later */}
//                 <option value="afrobeats">Afrobeats</option>
//                 <option value="hiphop">Hip-Hop</option>
//               </select>
//             </div>
//             <div>
//               <label
//                 htmlFor="artist-filter"
//                 className="block text-xs font-medium text-text-secondary mb-1"
//               >
//                 Artist
//               </label>
//               <select
//                 id="artist-filter"
//                 className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//               >
//                 <option value="">All Followed Artists</option>
//                 {/* Populate with user's followed artists */}
//               </select>
//             </div>
//             <div>
//               <label
//                 htmlFor="sort-filter"
//                 className="block text-xs font-medium text-text-secondary mb-1"
//               >
//                 Sort By
//               </label>
//               <select
//                 id="sort-filter"
//                 className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//               >
//                 <option value="date">Release Date</option>
//                 <option value="trending">Trending</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Release Sections */}
//         {Object.entries(releases).map(([categoryKey, categoryReleases]) => {
//           if (categoryReleases.length === 0) return null; // Don't render empty sections

//           let categoryTitle = "Releases";
//           if (categoryKey === "announced") categoryTitle = <div className="flex items-center gap-2"> <img className="w-8 h-8" src="./megaphone_img.png" alt="" /> Announced </div>;
//           if (categoryKey === "releasingTomorrow")
//             // categoryTitle = "⏳ Releasing Tomorrow";
//             categoryTitle = <div className="flex items-center gap-2"> <img className="w-8 h-8" src="./hourglass_img.png" alt="" /> Releasing Tomorrow</div>;
//           if (categoryKey === "liveNow")
//             // categoryTitle = "🔥 Live Now (Last 5 Days)";
//             categoryTitle = <div className="flex items-center gap-2"> <img className="w-8 h-8" src="./fire_img.png" alt="" /> Live Now (Last 5 Days)</div>

//           return (
//             <section key={categoryKey} className="mb-8">
//               <h2 className="text-2xl font-semibold mb-4 text-brand-primary border-b-2 border-brand-primary/30 pb-2">
//                 {categoryTitle}
//               </h2>
//               {categoryReleases.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//                   {categoryReleases.map((release) => (
//                     <SongCard
//                       key={release.id}
//                       release={release}
//                       type={categoryKey}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-text-secondary">
//                   No releases in this category right now.
//                 </p>
//               )}
//             </section>
//           );
//         })}
//       </main>
//     </div>
//   );
// }

// export default HomePage;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import SongCard from "../components/SongCard";

// import logo from "../assets/logo.svg";
// import { useAuth } from "../contexts/AuthContext";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { fetchFromSpotify } from "../utils/spotify"; // Assuming this is the correct import

// function HomePage() {
//   const { profile } = useAuth();
//   const [currentUser, setCurrentUser] = useState(profile);
//   const [releases, setReleases] = useState({
//     announced: [],
//     releasingTomorrow: [],
//     liveNow: []
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filteredReleases, setFilteredReleases] = useState(null);

//   // Filters state
//   const [genreFilter, setGenreFilter] = useState("");
//   const [artistFilter, setArtistFilter] = useState("");
//   const [sortFilter, setSortFilter] = useState("date");

//   const [showNotificationReminder, setShowNotificationReminder] = useState(false);
//   const [notificationPermission, setNotificationPermission] = useState("default");

//   // Function to format date as YYYY-MM-DD
//   const formatDate = (date) => {
//     return date.toISOString().split('T')[0];
//   };

//   // Function to get releases from Spotify API
//   const fetchReleases = async () => {
//     if (!profile) return;

//     setLoading(true);
//     try {
//       const today = new Date();
//       const fiveDaysAgo = new Date(today);
//       fiveDaysAgo.setDate(today.getDate() - 5);

//       const tomorrow = new Date(today);
//       tomorrow.setDate(today.getDate() + 1);

//       const thirtyDaysFromNow = new Date(today);
//       thirtyDaysFromNow.setDate(today.getDate() + 30);

//       // Get user's preferred genres and followed artists
//       const { preferredGenres, followedArtists } = profile;

//       // Create empty collections for each category
//       let announcedReleases = [];
//       let releasingTomorrowReleases = [];
//       let liveNowReleases = [];

//       // First, get releases from followed artists
//       if (followedArtists && followedArtists.length > 0) {
//         const artistPromises = followedArtists.map(async (artist) => {
//           try {
//             // Get albums for this artist
//             const artistAlbums = await fetchFromSpotify(`/artists/${artist.id}/albums?include_groups=album,single&limit=50`);

//             return artistAlbums.items.map(album => ({
//               id: album.id,
//               title: album.name,
//               artist: artist.name,
//               releaseDate: album.release_date,
//               artworkUrl: album.images[0]?.url,
//               artistId: artist.id,
//               fromFollowedArtist: true,
//               votes: { excitement: Math.floor(Math.random() * 500) + 50, quality: Math.floor(Math.random() * 500) + 50 },
//               userVote: {}
//             }));
//           } catch (error) {
//             console.error(`Error fetching albums for artist ${artist.name}:`, error);
//             return [];
//           }
//         });

//         const artistAlbumsArrays = await Promise.all(artistPromises);
//         const allArtistAlbums = artistAlbumsArrays.flat();

//         // Categorize releases
//         allArtistAlbums.forEach(album => {
//           const releaseDate = new Date(album.releaseDate);
//           const isToday = formatDate(releaseDate) === formatDate(today);
//           const isTomorrow = formatDate(releaseDate) === formatDate(tomorrow);
//           const isWithinPastFiveDays = releaseDate >= fiveDaysAgo && releaseDate <= today;
//           const isAnnounced = releaseDate > tomorrow && releaseDate <= thirtyDaysFromNow;

//           if (isAnnounced) {
//             announcedReleases.push({
//               ...album,
//               announcedDate: formatDate(new Date(today.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)) // Random date within past week
//             });
//           } else if (isTomorrow) {
//             releasingTomorrowReleases.push(album);
//           } else if (isToday || isWithinPastFiveDays) {
//             liveNowReleases.push(album);
//           }
//         });
//       }

//       // Then get releases for preferred genres
//       if (preferredGenres && preferredGenres.length > 0) {
//         const genrePromises = preferredGenres.map(async (genre) => {
//           try {
//             // Since Spotify API doesn't allow direct search by genre,
//             // we search for new releases and filter by genre metadata
//             const newReleases = await fetchFromSpotify('/browse/new-releases?limit=50');

//             // For each release, get its full album data to check genres
//             const albumDetailsPromises = newReleases.albums.items.map(async (album) => {
//               try {
//                 const albumDetails = await fetchFromSpotify(`/albums/${album.id}`);
//                 const artistDetails = await fetchFromSpotify(`/artists/${album.artists[0].id}`);

//                 // Check if any of the artist's genres include our target genre
//                 const artistGenres = artistDetails.genres || [];
//                 const matchesGenre = artistGenres.some(g =>
//                   g.toLowerCase().includes(genre.toLowerCase()) ||
//                   genre.toLowerCase().includes(g.toLowerCase())
//                 );

//                 if (matchesGenre) {
//                   return {
//                     id: album.id,
//                     title: album.name,
//                     artist: album.artists[0].name,
//                     releaseDate: album.release_date,
//                     artworkUrl: album.images[0]?.url,
//                     artistId: album.artists[0].id,
//                     genres: artistGenres,
//                     fromFollowedArtist: false,
//                     votes: { excitement: Math.floor(Math.random() * 300) + 20, quality: Math.floor(Math.random() * 300) + 20 },
//                     userVote: {}
//                   };
//                 }
//                 return null;
//               } catch (error) {
//                 console.error(`Error fetching details for album ${album.name}:`, error);
//                 return null;
//               }
//             });

//             const albumDetails = await Promise.all(albumDetailsPromises);
//             return albumDetails.filter(album => album !== null);

//           } catch (error) {
//             console.error(`Error fetching releases for genre ${genre}:`, error);
//             return [];
//           }
//         });

//         const genreAlbumsArrays = await Promise.all(genrePromises);
//         const allGenreAlbums = genreAlbumsArrays.flat();

//         // Deduplicate albums (in case same album appears in multiple genres)
//         const albumIds = new Set();
//         const uniqueGenreAlbums = allGenreAlbums.filter(album => {
//           if (!albumIds.has(album.id)) {
//             albumIds.add(album.id);
//             return true;
//           }
//           return false;
//         });

//         // Also deduplicate against artist albums we already have
//         const existingAlbumIds = new Set([
//           ...announcedReleases.map(a => a.id),
//           ...releasingTomorrowReleases.map(a => a.id),
//           ...liveNowReleases.map(a => a.id)
//         ]);

//         // Categorize unique genre albums
//         uniqueGenreAlbums.forEach(album => {
//           if (existingAlbumIds.has(album.id)) return;

//           const releaseDate = new Date(album.releaseDate);
//           const isToday = formatDate(releaseDate) === formatDate(today);
//           const isTomorrow = formatDate(releaseDate) === formatDate(tomorrow);
//           const isWithinPastFiveDays = releaseDate >= fiveDaysAgo && releaseDate <= today;
//           const isAnnounced = releaseDate > tomorrow && releaseDate <= thirtyDaysFromNow;

//           if (isAnnounced) {
//             announcedReleases.push({
//               ...album,
//               announcedDate: formatDate(new Date(today.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000)) // Random date within past week
//             });
//           } else if (isTomorrow) {
//             releasingTomorrowReleases.push(album);
//           } else if (isToday || isWithinPastFiveDays) {
//             liveNowReleases.push(album);
//           }
//         });
//       }

//       // Sort each category
//       // Prioritize followed artists, then sort by date
//       const sortByDate = (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate);
//       const sortByFollowedThenDate = (a, b) => {
//         if (a.fromFollowedArtist && !b.fromFollowedArtist) return -1;
//         if (!a.fromFollowedArtist && b.fromFollowedArtist) return 1;
//         return sortByDate(a, b);
//       };

//       announcedReleases.sort(sortByFollowedThenDate);
//       releasingTomorrowReleases.sort(sortByFollowedThenDate);
//       liveNowReleases.sort(sortByFollowedThenDate);

//       // Update state with fetched releases
//       setReleases({
//         announced: announcedReleases,
//         releasingTomorrow: releasingTomorrowReleases,
//         liveNow: liveNowReleases
//       });

//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching releases:", err);
//       setError("Could not load releases. Please try again later.");
//       setLoading(false);
//     }
//   };

//   // Fetch releases on component mount or when profile changes
//   useEffect(() => {
//     if (profile) {
//       setCurrentUser(profile);
//       fetchReleases();

//       // Check notification permission status
//       if (typeof Notification !== 'undefined') {
//         setNotificationPermission(Notification.permission);
//         if (Notification.permission === 'denied') {
//           setShowNotificationReminder(true);
//         }
//       }
//     }
//   }, [profile]);

//   // Apply filters to releases
//   useEffect(() => {
//     if (!releases) return;

//     let filtered = JSON.parse(JSON.stringify(releases)); // Deep clone

//     // Apply genre filter
//     if (genreFilter) {
//       Object.keys(filtered).forEach(category => {
//         filtered[category] = filtered[category].filter(release =>
//           release.genres &&
//           release.genres.some(g => g.toLowerCase().includes(genreFilter.toLowerCase()))
//         );
//       });
//     }

//     // Apply artist filter
//     if (artistFilter) {
//       Object.keys(filtered).forEach(category => {
//         filtered[category] = filtered[category].filter(release =>
//           release.artistId === artistFilter
//         );
//       });
//     }

//     // Apply sorting
//     const sortReleases = (releases, sortType) => {
//       switch (sortType) {
//         case 'trending':
//           return [...releases].sort((a, b) => {
//             const aVotes = (a.votes.excitement || 0) + (a.votes.quality || 0);
//             const bVotes = (b.votes.excitement || 0) + (b.votes.quality || 0);
//             return bVotes - aVotes;
//           });
//         case 'date':
//         default:
//           return [...releases].sort((a, b) => {
//             if (a.fromFollowedArtist && !b.fromFollowedArtist) return -1;
//             if (!a.fromFollowedArtist && b.fromFollowedArtist) return 1;
//             return new Date(a.releaseDate) - new Date(b.releaseDate);
//           });
//       }
//     };

//     Object.keys(filtered).forEach(category => {
//       filtered[category] = sortReleases(filtered[category], sortFilter);
//     });

//     setFilteredReleases(filtered);
//   }, [releases, genreFilter, artistFilter, sortFilter]);

//   const requestNotificationPermission = async () => {
//     alert("Placeholder: Requesting notification permission...");
//     setNotificationPermission((prev) =>
//       prev === "denied" ? "default" : "denied"
//     );
//     setShowNotificationReminder((prev) => !prev);
//   };

//   // --- Render Logic ---
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-bg text-text">
//         Loading Gbedu...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-bg text-red-400">
//         {error}
//       </div>
//     );
//   }

//   if (!currentUser) {
//     return (
//       <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-bg text-text">
//         Please log in to see your radar.

//         <Link to="/login">
//           <div className="px-4 py-2 bg-brand-primary rounded-full flex gap-2 items-center justify-center text-white font-medium">
//             Go to Login <FaArrowRightLong />
//           </div>
//         </Link>
//       </div>
//     );
//   }

//   // Get all unique genres from releases for filter dropdown
//   const getAllGenres = () => {
//     const genres = new Set();

//     Object.values(releases).forEach(categoryReleases => {
//       categoryReleases.forEach(release => {
//         if (release.genres) {
//           release.genres.forEach(genre => genres.add(genre));
//         }
//       });
//     });

//     return Array.from(genres).sort();
//   };

//   // Data to display (filtered or original)
//   const displayReleases = filteredReleases || releases;

//   return (
//     <div className="min-h-screen bg-bg text-text">
//       {/* Notification Reminder Bar */}
//       {showNotificationReminder && notificationPermission === "denied" && (
//         <div className="bg-brand-accent text-white text-sm p-2 text-center flex justify-between items-center">
//           <span>Enable notifications to get instant alerts!</span>
//           <button
//             onClick={requestNotificationPermission}
//             className="ml-4 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-xs"
//           >
//             Request Permission
//           </button>
//           <button
//             onClick={() => setShowNotificationReminder(false)}
//             className="ml-2 text-lg"
//           >
//             &times;
//           </button>
//         </div>
//       )}

//       {/* Header */}
//       <header className="py-4 px-4 sm:px-8 lg:px-16 shadow-lg shadow-brand-primary/10">
//         <div className="container mx-auto flex justify-between items-center">
//           <Link to="/" className="">
//             <img src={logo} alt="GbeduRadar Logo" className="h-12" />
//           </Link>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-text-secondary">
//               Hi, {currentUser.displayName || "User"}!
//             </span>
//             <Link to="/profile">
//               <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-semibold">
//                 {currentUser.displayName
//                   ? currentUser.displayName.charAt(0).toUpperCase()
//                   : "U"}
//               </div>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto p-4 md:p-6">
//         {/* Filters */}
//         <div className="mb-6 p-4 bg-card rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-3 text-text">Filters</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div>
//               <label
//                 htmlFor="genre-filter"
//                 className="block text-xs font-medium text-text-secondary mb-1"
//               >
//                 Genre
//               </label>
//               <select
//                 id="genre-filter"
//                 value={genreFilter}
//                 onChange={(e) => setGenreFilter(e.target.value)}
//                 className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//               >
//                 <option value="">All Genres</option>
//                 {getAllGenres().map(genre => (
//                   <option key={genre} value={genre}>{genre}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label
//                 htmlFor="artist-filter"
//                 className="block text-xs font-medium text-text-secondary mb-1"
//               >
//                 Artist
//               </label>
//               <select
//                 id="artist-filter"
//                 value={artistFilter}
//                 onChange={(e) => setArtistFilter(e.target.value)}
//                 className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//               >
//                 <option value="">All Artists</option>
//                 {profile.followedArtists && profile.followedArtists.map(artist => (
//                   <option key={artist.id} value={artist.id}>{artist.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label
//                 htmlFor="sort-filter"
//                 className="block text-xs font-medium text-text-secondary mb-1"
//               >
//                 Sort By
//               </label>
//               <select
//                 id="sort-filter"
//                 value={sortFilter}
//                 onChange={(e) => setSortFilter(e.target.value)}
//                 className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
//               >
//                 <option value="date">Release Date</option>
//                 <option value="trending">Trending</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Release Sections */}
//         {Object.entries(displayReleases).map(([categoryKey, categoryReleases]) => {
//           let categoryTitle = "Releases";
//           if (categoryKey === "announced")
//             categoryTitle = <div className="flex items-center gap-2"> <img className="w-8 h-8" src="./megaphone_img.png" alt="" /> Announced </div>;
//           if (categoryKey === "releasingTomorrow")
//             categoryTitle = <div className="flex items-center gap-2"> <img className="w-8 h-8" src="./hourglass_img.png" alt="" /> Releasing Tomorrow</div>;
//           if (categoryKey === "liveNow")
//             categoryTitle = <div className="flex items-center gap-2"> <img className="w-8 h-8" src="./fire_img.png" alt="" /> Live Now (Last 5 Days)</div>;

//           return (
//             <section key={categoryKey} className="mb-8">
//               <h2 className="text-2xl font-semibold mb-4 text-brand-primary border-b-2 border-brand-primary/30 pb-2">
//                 {categoryTitle}
//               </h2>
//               {categoryReleases.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//                   {categoryReleases.map((release) => (
//                     <SongCard
//                       key={release.id}
//                       release={release}
//                       type={categoryKey}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-text-secondary">
//                   No releases in this category right now.
//                 </p>
//               )}
//             </section>
//           );
//         })}

//         {/* Add a refresh button */}
//         <div className="flex justify-center mt-8 mb-4">
//           <button
//             onClick={fetchReleases}
//             className="px-4 py-2 bg-brand-primary rounded-full flex gap-2 items-center justify-center text-white font-medium hover:bg-brand-primary/90 transition"
//           >
//             Refresh Releases
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default HomePage;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SongCard from "../components/SongCard";

import logo from "../assets/logo.svg";
import { useAuth } from "../contexts/AuthContext";
import { FaArrowRightLong } from "react-icons/fa6";
import { fetchFromSpotify } from "../utils/spotify";
import { formatDateWithDay } from "../helpers/formatDateWithDay";

function HomePage() {
  const { profile } = useAuth();
  const [currentUser, setCurrentUser] = useState(profile);
  const [releases, setReleases] = useState({
    announced: [],
    releasingTomorrow: [],
    liveNow: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filteredReleases, setFilteredReleases] = useState(null);

  // Filters state
  const [genreFilter, setGenreFilter] = useState("");
  const [artistFilter, setArtistFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("date");

  const [showNotificationReminder, setShowNotificationReminder] =
    useState(false);
  const [notificationPermission, setNotificationPermission] =
    useState("default");

  // Function to format date as YYYY-MM-DD
  // const formatDate = (date) => {
  //   return date.toISOString().split("T")[0];
  // };

  // Helper function to throttle API requests
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Helper function to throttle batch API requests
  const batchProcess = async (
    items,
    processFn,
    batchSize = 5,
    delayMs = 1000
  ) => {
    const results = [];
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(processFn));
      results.push(...batchResults);
      if (i + batchSize < items.length) {
        await delay(delayMs); // Add delay between batches
      }
    }
    return results;
  };

  // Function to get releases from Spotify API
  const fetchReleases = async () => {
    if (!profile) return;

    setLoading(true);
    setError("");
    try {
      const today = new Date();
      const fiveDaysAgo = new Date(today);
      fiveDaysAgo.setDate(today.getDate() - 5);
      // fiveDaysAgo.setDate(today.getDate() - 6);

      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(today.getDate() + 30);

      // Get user's preferred genres and followed artists
      const { preferredGenres, followedArtists } = profile;

      // Create empty collections for each category
      let announcedReleases = [];
      let releasingTomorrowReleases = [];
      let liveNowReleases = [];

      // First, get releases from followed artists
      if (followedArtists && followedArtists.length > 0) {
        // Process artists in small batches to avoid rate limits
        const processArtist = async (artist) => {
          try {
            // Get albums for this artist
            const artistAlbums = await fetchFromSpotify(
              // `/artists/${artist.id}/albums?include_groups=album,single&limit=20`
              `/artists/${artist.id}/albums?include_groups=album,single&limit=50`
            );

            return artistAlbums.items.map((album) => {
              console.log("album", album);
             return ({
                id: album.id,
                title: album.name,
                artist: artist.name,
                releaseDate: album.release_date,
                artworkUrl: album.images[0]?.url || artist.image, // Fallback to artist image
                artistId: artist.id,
                fromFollowedArtist: true,
                votes: {
                  excitement: Math.floor(Math.random() * 500) + 50,
                  quality: Math.floor(Math.random() * 500) + 50,
                },
                userVote: {},
                releaseType: album.album_type,
                totalTracks: album.total_tracks,
              });
            });
          } catch (error) {
            console.error(
              `Error fetching albums for artist ${artist.name}:`,
              error
            );
            return [];
          }
        };

        // Process artists in batches
        const artistAlbumsArrays = await batchProcess(
          followedArtists,
          processArtist,
          2,
          1000
        );
        const allArtistAlbums = artistAlbumsArrays.flat();

        // Categorize releases
        allArtistAlbums.forEach((album) => {
          const releaseDate = new Date(album.releaseDate);
          const isToday = formatDateWithDay(releaseDate) === formatDateWithDay(today);
          const isTomorrow = formatDateWithDay(releaseDate) === formatDateWithDay(tomorrow);
          const isWithinPastFiveDays =
            releaseDate >= fiveDaysAgo && releaseDate <= today;
          const isAnnounced =
            releaseDate > tomorrow && releaseDate <= thirtyDaysFromNow;

          if (isAnnounced) {
            announcedReleases.push({
              ...album,
              announcedDate: formatDateWithDay(
                new Date(
                  today.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000
                )
              ), // Random date within past week
            });
          } else if (isTomorrow) {
            releasingTomorrowReleases.push(album);
          } else if (isToday || isWithinPastFiveDays) {
            liveNowReleases.push(album);
          }
        });
      }

      // Then get releases for preferred genres - limit to avoid too many API calls
      if (preferredGenres && preferredGenres.length > 0) {
        try {
          // Get new releases only once
          const newReleases = await fetchFromSpotify(
            // "/browse/new-releases?limit=20"
            "/browse/new-releases?limit=50"
          );

          // Process these releases in batches
          const processAlbum = async (album) => {
            try {
              // Get artist details to check genres
              const artistDetails = await fetchFromSpotify(
                `/artists/${album.artists[0].id}`
              );

              // Check if any of the artist's genres match user's preferred genres
              const artistGenres = artistDetails.genres || [];
              const matchesGenre = preferredGenres.some((genre) =>
                artistGenres.some(
                  (g) =>
                    g.toLowerCase().includes(genre.toLowerCase()) ||
                    genre.toLowerCase().includes(g.toLowerCase())
                )
              );

              if (matchesGenre) {
                return {
                  id: album.id,
                  title: album.name,
                  artist: album.artists[0].name,
                  releaseDate: album.release_date,
                  artworkUrl: album.images[0]?.url,
                  artistId: album.artists[0].id,
                  genres: artistGenres,
                  fromFollowedArtist: false,
                  votes: {
                    excitement: Math.floor(Math.random() * 300) + 20,
                    quality: Math.floor(Math.random() * 300) + 20,
                  },
                  userVote: {},
                  releaseType: album.album_type,
                  totalTracks: album.total_tracks,
                };
              }
              return null;
            } catch (error) {
              console.error(
                `Error fetching details for album ${album.name}:`,
                error
              );
              return null;
            }
          };

          // Process each album with throttling
          const genreAlbums = await batchProcess(
            newReleases.albums.items,
            processAlbum,
            3,
            1200
          );
          const allGenreAlbums = genreAlbums.filter((album) => album !== null);

          // Deduplicate albums
          const albumIds = new Set();
          const uniqueGenreAlbums = allGenreAlbums.filter((album) => {
            if (!albumIds.has(album.id)) {
              albumIds.add(album.id);
              return true;
            }
            return false;
          });

          // Also deduplicate against artist albums we already have
          const existingAlbumIds = new Set([
            ...announcedReleases.map((a) => a.id),
            ...releasingTomorrowReleases.map((a) => a.id),
            ...liveNowReleases.map((a) => a.id),
          ]);

          // Categorize unique genre albums
          uniqueGenreAlbums.forEach((album) => {
            if (existingAlbumIds.has(album.id)) return;

            const releaseDate = new Date(album.releaseDate);
            const isToday = formatDateWithDay(releaseDate) === formatDateWithDay(today);
            const isTomorrow = formatDateWithDay(releaseDate) === formatDateWithDay(tomorrow);
            const isWithinPastFiveDays =
              releaseDate >= fiveDaysAgo && releaseDate <= today;
            const isAnnounced =
              releaseDate > tomorrow && releaseDate <= thirtyDaysFromNow;

            if (isAnnounced) {
              announcedReleases.push({
                ...album,
                announcedDate: formatDateWithDay(
                  new Date(
                    today.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000
                  )
                ),
              });
            } else if (isTomorrow) {
              releasingTomorrowReleases.push(album);
            } else if (isToday || isWithinPastFiveDays) {
              liveNowReleases.push(album);
            }
          });
        } catch (error) {
          console.error("Error fetching or processing genre releases:", error);
          // Continue with what we have instead of failing completely
        }
      }

      // Sort each category
      // Prioritize followed artists, then sort by date
      const sortByDate = (a, b) =>
        new Date(a.releaseDate) - new Date(b.releaseDate);
      const sortByFollowedThenDate = (a, b) => {
        if (a.fromFollowedArtist && !b.fromFollowedArtist) return -1;
        if (!a.fromFollowedArtist && b.fromFollowedArtist) return 1;
        return sortByDate(a, b);
      };

      announcedReleases.sort(sortByFollowedThenDate);
      releasingTomorrowReleases.sort(sortByFollowedThenDate);
      liveNowReleases.sort(sortByFollowedThenDate);

      // Update state with fetched releases
      setReleases({
        announced: announcedReleases,
        releasingTomorrow: releasingTomorrowReleases,
        liveNow: liveNowReleases,
      });

      setLoading(false);
    } catch (err) {
      console.error("Error fetching releases:", err);
      setError("Could not load releases. Please try again later.");
      setLoading(false);
    }
  };

  // Check notification permission on component mount
  useEffect(() => {
    if (profile) {
      setCurrentUser(profile);

      // Don't fetch on every mount to avoid rate limiting
      if (Object.values(releases).every((arr) => arr.length === 0)) {
        fetchReleases();
      }

      // Check notification permission status
      if (typeof Notification !== "undefined") {
        const permission = Notification.permission;
        setNotificationPermission(permission);
        if (permission === "denied") {
          setShowNotificationReminder(true);
        }
      }
    }
  }, [profile]);

  // Apply filters to releases
  useEffect(() => {
    if (!releases) return;

    let filtered = JSON.parse(JSON.stringify(releases)); // Deep clone

    // Apply genre filter
    if (genreFilter) {
      Object.keys(filtered).forEach((category) => {
        filtered[category] = filtered[category].filter(
          (release) =>
            release.genres &&
            release.genres.some((g) =>
              g.toLowerCase().includes(genreFilter.toLowerCase())
            )
        );
      });
    }

    // Apply artist filter
    if (artistFilter) {
      Object.keys(filtered).forEach((category) => {
        filtered[category] = filtered[category].filter(
          (release) => release.artistId === artistFilter
        );
      });
    }

    // Apply sorting
    const sortReleases = (releases, sortType) => {
      switch (sortType) {
        case "trending":
          return [...releases].sort((a, b) => {
            const aVotes = (a.votes.excitement || 0) + (a.votes.quality || 0);
            const bVotes = (b.votes.excitement || 0) + (b.votes.quality || 0);
            return bVotes - aVotes;
          });
        case "date":
        default:
          return [...releases].sort((a, b) => {
            if (a.fromFollowedArtist && !b.fromFollowedArtist) return -1;
            if (!a.fromFollowedArtist && b.fromFollowedArtist) return 1;
            return new Date(a.releaseDate) - new Date(b.releaseDate);
          });
      }
    };

    Object.keys(filtered).forEach((category) => {
      filtered[category] = sortReleases(filtered[category], sortFilter);
    });

    setFilteredReleases(filtered);
  }, [releases, genreFilter, artistFilter, sortFilter]);

  const requestNotificationPermission = async () => {
    if (typeof Notification !== "undefined") {
      try {
        // Reset in case it was previously denied
        if (Notification.permission === "denied") {
          alert(
            "Please enable notifications in your browser settings and try again."
          );
          return;
        }

        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);

        if (permission === "granted") {
          setShowNotificationReminder(false);

          // Send a test notification
          const testNotification = new Notification(
            "GbeduRadar Notifications Enabled",
            {
              body: "You'll receive alerts when your favorite artists release new music!",
              icon: logo, // This should reference your logo imported at the top
            }
          );

          // Optional: Update user preferences in database
          // You can add code here to update the user's notification preferences in your database
          console.log("Notification permission granted");
        } else {
          setShowNotificationReminder(true);
          console.log("Notification permission denied");
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        alert(
          "There was an error requesting notification permissions. Please try again."
        );
      }
    } else {
      alert("This browser doesn't support notifications");
    }
  };

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-text">
        Loading Gbedu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg text-red-400">
        {error}
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col gap-3 items-center justify-center bg-bg text-text">
        Please log in to see your radar.
        <Link to="/login">
          <div className="px-4 py-2 bg-brand-primary rounded-full flex gap-2 items-center justify-center text-white font-medium">
            Go to Login <FaArrowRightLong />
          </div>
        </Link>
      </div>
    );
  }

  // Get all unique genres from releases for filter dropdown
  const getAllGenres = () => {
    const genres = new Set();

    Object.values(releases).forEach((categoryReleases) => {
      console.log(categoryReleases);
      categoryReleases.forEach((release) => {
        if (release.genres) {
          release.genres.forEach((genre) => genres.add(genre));
        }
      });
    });

    return Array.from(genres).sort();
  };

  // Data to display (filtered or original)
  const displayReleases = filteredReleases || releases;

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Notification Reminder Bar */}
      {showNotificationReminder && notificationPermission === "denied" && (
        <div className="bg-brand-accent text-white text-sm p-2 text-center flex justify-between items-center">
          <span>Enable notifications to get instant alerts!</span>
          <button
            onClick={requestNotificationPermission}
            className="ml-4 px-2 py-0.5 bg-white/20 hover:bg-white/30 rounded text-xs"
          >
            Request Permission
          </button>
          <button
            onClick={() => setShowNotificationReminder(false)}
            className="ml-2 text-lg"
          >
            &times;
          </button>
        </div>
      )}

      {/* Header */}
      <header className="py-4 px-4 sm:px-8 lg:px-16 shadow-lg shadow-brand-primary/10">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="">
            <img src={logo} alt="GbeduRadar Logo" className="h-12" />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">
              Hi, {currentUser.displayName || "User"}!
            </span>
            <Link to="/profile">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-semibold">
                {currentUser.displayName
                  ? currentUser.displayName.charAt(0).toUpperCase()
                  : "U"}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        {/* Filters */}
        <div className="mb-6 p-4 bg-card rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3 text-text">Filters</h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* <div>
              <label
                htmlFor="genre-filter"
                className="block text-xs font-medium text-text-secondary mb-1"
              >
                Genre
              </label>
              <select
                id="genre-filter"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
              >
                <option value="">All Genres</option>
                {getAllGenres().map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div> */}
            <div>
              <label
                htmlFor="artist-filter"
                className="block text-xs font-medium text-text-secondary mb-1"
              >
                Artist
              </label>
              <select
                id="artist-filter"
                value={artistFilter}
                onChange={(e) => setArtistFilter(e.target.value)}
                className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
              >
                <option value="">All Artists</option>
                {profile.followedArtists &&
                  profile.followedArtists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="sort-filter"
                className="block text-xs font-medium text-text-secondary mb-1"
              >
                Sort By
              </label>
              <select
                id="sort-filter"
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                className="w-full bg-bg border border-gray-600 text-text rounded-md p-2 text-sm focus:ring-brand-primary focus:border-brand-primary"
              >
                <option value="date">Release Date</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Release Sections */}
        {Object.entries(displayReleases).map(
          ([categoryKey, categoryReleases]) => {
            let categoryTitle = "Releases";
            if (categoryKey === "announced")
              categoryTitle = (
                <div className="flex items-center gap-2">
                  {" "}
                  <img
                    className="w-8 h-8"
                    src="./megaphone_img.png"
                    alt=""
                  />{" "}
                  Announced{" "}
                </div>
              );
            if (categoryKey === "releasingTomorrow")
              categoryTitle = (
                <div className="flex items-center gap-2">
                  {" "}
                  <img
                    className="w-8 h-8"
                    src="./hourglass_img.png"
                    alt=""
                  />{" "}
                  Releasing Tomorrow
                </div>
              );
            if (categoryKey === "liveNow")
              categoryTitle = (
                <div className="flex items-center gap-2">
                  {" "}
                  <img className="w-8 h-8" src="./fire_img.png" alt="" /> Live
                  Now (Last 5 Days)
                  {/* Now (Last 6 Days) */}
                </div>
              );

            return (
              <section key={categoryKey} className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-brand-primary border-b-2 border-brand-primary/30 pb-2">
                  {categoryTitle}
                </h2>
                {categoryReleases.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {categoryReleases.map((release) => (
                      <SongCard
                        key={release.id}
                        release={release}
                        type={categoryKey}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-text-secondary">
                    No releases in this category right now.
                  </p>
                )}
              </section>
            );
          }
        )}

        {/* Add a refresh button */}
        <div className="flex justify-center mt-8 mb-4">
          <button
            onClick={fetchReleases}
            className="px-4 py-2 bg-brand-primary rounded-full flex gap-2 items-center justify-center text-white font-medium hover:bg-brand-primary/90 transition"
          >
            Refresh Releases
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
