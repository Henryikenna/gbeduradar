import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import logo from "../assets/logo.svg";
import { fetchFromSpotify } from "../utils/spotify";
import {
  fetchGenreListFromGistFile,
  MANUAL_GENRES,
} from "../utils/fetchGenreList";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { toast } from "sonner";

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

  // console.log(MANUAL_GENRES);

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

        // Merge fetched + manual ones, filtering out duplicates
        const allGenres = Array.from(new Set([...genres, ...MANUAL_GENRES]));
        allGenres.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        console.log(allGenres);

        setGenreSeeds(allGenres);
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
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });
      console.log("REGISTERED user", user);

      const userDoc = doc(db, "users", user.uid);
      console.log("userDoc", userDoc);
      await setDoc(userDoc, {
        uid: user.uid,
        displayName: name,
        email,
        createdAt: serverTimestamp(),
        followedArtists: selectedArtists.map((a) => ({
          id: a.id,
          name: a.name,
          image: a.images[0]?.url || null,
        })),
        preferredGenres: selectedGenres,
        subscriptionTier: "free",
        notificationsEnabled: false,
      });

      console.log("REGISTERING USER SETdOC", {
        uid: user.uid,
        displayName: name,
        email,
        createdAt: serverTimestamp(),
        followedArtists: selectedArtists.map((a) => ({
          id: a.id,
          name: a.name,
          image: a.images[0]?.url || null,
        })),
        preferredGenres: selectedGenres,
        subscriptionTier: "free",
        notificationsEnabled: false,
      });

      toast.success("Account created successfully. Welcome.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed. Please try again.");
      toast.error(error);
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
                {genresLoading ? (
                  <div className="text-center py-4 text-text-secondary">
                    Loading genres...
                  </div>
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
                      <div className="text-center py-4 text-text">
                        Loading artists...
                      </div>
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
