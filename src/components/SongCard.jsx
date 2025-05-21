// import React from "react";
// import { FaFire } from "react-icons/fa";
// import { FaThumbsUp } from "react-icons/fa6";
// import { formatDateWithDay } from "../helpers/formatDateWithDay";

// function SongCard({ release, type }) {
//   // type can be 'announced', 'releasing_tomorrow', 'live_now'
//   const {
//     title,
//     artist,
//     releaseDate,
//     announcedDate,
//     artworkUrl,
//     votes,
//     userVote,
//     releaseType,
//     totalTracks,
//   } = release;

//   // const handleVote = (voteType, value) => {
//   //   // Placeholder for actual vote submission logic
//   //   console.log(`Voted for ${release.id}: ${voteType} - ${value}`);
//   //   // This would typically involve:
//   //   // 1. Getting the current user's ID.
//   //   // 2. Updating the vote count in Firestore for the specific release.
//   //   // 3. Storing/updating the user's specific vote to prevent re-voting or allow changing vote.
//   //   // 4. Potentially re-fetching or locally updating the UI to reflect the new vote count/status.
//   // };
  

//   let dateInfo;
//   if (type === "announced") {
//     dateInfo = `Announced: ${formatDateWithDay(
//       announcedDate
//     )} | Releasing: ${formatDateWithDay(releaseDate)}`;
//   } else if (type === "releasing_tomorrow") {
//     dateInfo = `Releasing: ${formatDateWithDay(releaseDate)} (Tomorrow!)`;
//   } else {
//     dateInfo = `Released: ${formatDateWithDay(releaseDate)}`;
//   }

//   return (
//     <div
//       className="bg-dark-card p-4 rounded-lg shadow-lg flex space-x-4 hover:shadow-brand-primary/20 transition-shadow duration-200"
//     >
//       <img
//         src={
//           artworkUrl ||
//           `https://via.placeholder.com/80x80.png?text=${artist.substring(0, 1)}`
//         }
//         alt={`${title} artwork`}
//         className="w-20 h-20 object-cover rounded"
//       />
//       <div className="flex-1">
//         <a
//           href={`https://open.spotify.com/album/${release.id}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-lg font-semibold text-text leading-tight hover:underline cursor-pointer"
//         >
//           {title}
//         </a>
//         <h3 className="text-xs font-light text-text">
//           {/* {release.releaseType} */}
//           <span className="capitalize">{release.releaseType}</span>
//           {release.totalTracks > 1 && ` (${release.totalTracks} tracks)`}
//         </h3>
//         <a
//           href={`https://open.spotify.com/artist/${release.artistId}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-sm text-brand-primary hover:underline cursor-pointer"
//         >
//           {artist}
//         </a>
//         <p className="text-xs text-text-secondary mt-1">{dateInfo}</p>

//         <div className="mt-2 flex items-center space-x-3">
//           {type !== "live_now" && (
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick={() => handleVote("excitement", "excited")}
//                 title="Excited!"
//                 className={`p-1 rounded-full hover:bg-brand-accent/20 ${
//                   userVote?.excitement === "excited"
//                     ? "text-brand-accent"
//                     : "text-text-secondary"
//                 }`}
//               >
//                 <FaFire />
//               </button>
//               <span className="text-xs text-text-secondary">
//                 {votes?.excitement || 0}
//               </span>
//             </div>
//           )}
//           {type === "live_now" && (
//             <div className="flex items-center space-x-1">
//               <button
//                 onClick={() => handleVote("quality", "good")}
//                 title="It's a hit!"
//                 className={`p-1 rounded-full hover:bg-brand-accent/20 ${
//                   userVote?.quality === "good"
//                     ? "text-brand-accent"
//                     : "text-text-secondary"
//                 }`}
//               >
//                 <FaThumbsUp />
//               </button>
//               <span className="text-xs text-text-secondary">
//                 {votes?.quality || 0}
//               </span>
//             </div>
//           )}
//           {/* Add dislike/not-excited buttons if desired */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SongCard;









import React, { useState, useEffect } from "react";
import { FaFire, FaFireAlt } from "react-icons/fa";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { formatDateWithDay } from "../helpers/formatDateWithDay";
import { voteService } from "../utils/voteService";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

function SongCard({ release, type }) {
  const { profile } = useAuth();
  // const userId = profile?.uid || profile?.id; 
  const userId = profile?.uid; 
  
  const {
    id,
    title,
    artist,
    releaseDate,
    announcedDate,
    artworkUrl,
    artistId,
    releaseType,
    totalTracks,
  } = release;

  // Track local vote state
  const [votes, setVotes] = useState({
    excitement: { positive: [], negative: [] },
    quality: { positive: [], negative: [] }
  });
  const [isVoting, setIsVoting] = useState(false);

  // Load initial votes
  useEffect(() => {
    async function loadVotes() {
      const voteData = await voteService.getVotes(id);
      if (voteData) {
        setVotes({
          excitement: voteData.excitement || { positive: [], negative: [] },
          quality: voteData.quality || { positive: [], negative: [] }
        });
      }
    }
    
    if (id) {
      loadVotes();
    }
  }, [id]);

  const handleVote = async (voteType, isPositive) => {
    if (!userId) {
      // Handle unauthenticated user case
      alert("Please log in to vote!");
      return;
    }

    if (isVoting) return; // To prevent multiple rapid votes
    
    setIsVoting(true);
    
    // update UI
    const currentVotes = {...votes};
    const currentPositiveList = [...(currentVotes[voteType]?.positive || [])];
    const currentNegativeList = [...(currentVotes[voteType]?.negative || [])];
    
    const hasPositiveVote = currentPositiveList.includes(userId);
    const hasNegativeVote = currentNegativeList.includes(userId);
    
    // Handle vote change
    if (isPositive) {
      if (hasPositiveVote) {
        // Remove positive vote (toggle off)
        const index = currentPositiveList.indexOf(userId);
        if (index > -1) currentPositiveList.splice(index, 1);
      } else {
        // Add positive vote, remove negative if exists
        currentPositiveList.push(userId);
        const negIndex = currentNegativeList.indexOf(userId);
        if (negIndex > -1) currentNegativeList.splice(negIndex, 1);
      }
    } else {
      if (hasNegativeVote) {
        // Remove negative vote (toggle off)
        const index = currentNegativeList.indexOf(userId);
        if (index > -1) currentNegativeList.splice(index, 1);
      } else {
        // Add negative vote, remove positive if exists
        currentNegativeList.push(userId);
        const posIndex = currentPositiveList.indexOf(userId);
        if (posIndex > -1) currentPositiveList.splice(posIndex, 1);
      }
    }
    
    // Update local state
    setVotes({
      ...votes,
      [voteType]: {
        positive: currentPositiveList,
        negative: currentNegativeList
      }
    });
    
    // Submit to Firestore
    try {
      await voteService.castVote(id, voteType, userId, isPositive);
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error("Error submitting vote:", error);
    } finally {
      setIsVoting(false);
    }
  };

  // Calculate vote counts
  const getVoteCounts = (voteType) => {
    const positive = votes[voteType]?.positive?.length || 0;
    const negative = votes[voteType]?.negative?.length || 0;
    return { positive, negative, total: positive - negative };
  };

  // Check if user has voted
  const getUserVoteStatus = (voteType) => {
    if (!userId) return { positive: false, negative: false };
    
    const hasPositiveVote = votes[voteType]?.positive?.includes(userId) || false;
    const hasNegativeVote = votes[voteType]?.negative?.includes(userId) || false;
    
    return { positive: hasPositiveVote, negative: hasNegativeVote };
  };

  const excitementCounts = getVoteCounts('excitement');
  const qualityCounts = getVoteCounts('quality');
  const excitementVoteStatus = getUserVoteStatus('excitement');
  const qualityVoteStatus = getUserVoteStatus('quality');

  let dateInfo;
  if (type === "announced") {
    dateInfo = `Announced: ${formatDateWithDay(
      announcedDate
    )} | Releasing: ${formatDateWithDay(releaseDate)}`;
  } else if (type === "releasingTomorrow") {
    dateInfo = `Releasing: ${formatDateWithDay(releaseDate)} (Tomorrow!)`;
  } else {
    dateInfo = `Released: ${formatDateWithDay(releaseDate)}`;
  }

  return (
    <div className="bg-dark-card p-4 rounded-lg shadow-lg flex space-x-4 hover:shadow-brand-primary/20 transition-shadow duration-200">
      <img
        src={
          artworkUrl ||
          `https://via.placeholder.com/80x80.png?text=${artist.substring(0, 1)}`
        }
        alt={`${title} artwork`}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <a
          href={`https://open.spotify.com/album/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-text leading-tight hover:underline cursor-pointer"
        >
          {title}
        </a>
        <h3 className="text-xs font-light text-text">
          <span className="capitalize">{releaseType}</span>
          {totalTracks > 1 && ` (${totalTracks} tracks)`}
        </h3>
        <a
          href={`https://open.spotify.com/artist/${artistId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand-primary hover:underline cursor-pointer"
        >
          {artist}
        </a>
        <p className="text-xs text-text-secondary mt-1">{dateInfo}</p>

        <div className="mt-2 flex items-center space-x-4">
          {/* Excitement voting (for announced and releasing tomorrow) */}
          {(type === "announced" || type === "releasingTomorrow") && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <button
                  onClick={() => handleVote("excitement", true)}
                  disabled={isVoting}
                  title="Excited!"
                  className={`p-1 rounded-full hover:bg-brand-accent/20 transition-colors ${
                    excitementVoteStatus.positive
                      ? "text-brand-accent"
                      : "text-text-secondary"
                  }`}
                >
                  <FaFire className="text-lg" />
                </button>
                <span className="text-xs text-text-secondary ml-1">
                  {excitementCounts.positive}
                </span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleVote("excitement", false)}
                  disabled={isVoting}
                  title="Not excited"
                  className={`p-1 rounded-full hover:bg-red-500/20 transition-colors ${
                    excitementVoteStatus.negative
                      ? "text-red-500"
                      : "text-text-secondary"
                  }`}
                >
                  <FaFireAlt className="text-lg" />
                </button>
                <span className="text-xs text-text-secondary ml-1">
                  {excitementCounts.negative}
                </span>
              </div>
              
              {/* Total score badge */}
              <div className={`text-xs px-2 py-0.5 rounded-full ${
                excitementCounts.total > 0 
                  ? "bg-green-500/20 text-green-300" 
                  : excitementCounts.total < 0 
                    ? "bg-red-500/20 text-red-300" 
                    : "bg-gray-600/20 text-gray-400"
              }`}>
                {excitementCounts.total > 0 ? `+${excitementCounts.total}` : excitementCounts.total}
              </div>
            </div>
          )}
          
          {/* Quality voting (for live now) */}
          {type === "liveNow" && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <button
                  onClick={() => handleVote("quality", true)}
                  disabled={isVoting}
                  title="It's good!"
                  className={`p-1 rounded-full hover:bg-brand-accent/20 transition-colors ${
                    qualityVoteStatus.positive
                      ? "text-brand-accent"
                      : "text-text-secondary"
                  }`}
                >
                  <FaThumbsUp className="text-lg" />
                </button>
                <span className="text-xs text-text-secondary ml-1">
                  {qualityCounts.positive}
                </span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleVote("quality", false)}
                  disabled={isVoting}
                  title="Not good"
                  className={`p-1 rounded-full hover:bg-red-500/20 transition-colors ${
                    qualityVoteStatus.negative
                      ? "text-red-500"
                      : "text-text-secondary"
                  }`}
                >
                  <FaThumbsDown className="text-lg" />
                </button>
                <span className="text-xs text-text-secondary ml-1">
                  {qualityCounts.negative}
                </span>
              </div>
              
              {/* Total score badge */}
              <div className={`text-xs px-2 py-0.5 rounded-full ${
                qualityCounts.total > 0 
                  ? "bg-green-500/20 text-green-300" 
                  : qualityCounts.total < 0 
                    ? "bg-red-500/20 text-red-300" 
                    : "bg-gray-600/20 text-gray-400"
              }`}>
                {qualityCounts.total > 0 ? `+${qualityCounts.total}` : qualityCounts.total}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SongCard;