import React from "react";
import { FaFire } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa6";

function SongCard({ release, type }) {
  // type can be 'announced', 'releasing_tomorrow', 'live_now'
  const {
    title,
    artist,
    releaseDate,
    announcedDate,
    artworkUrl,
    votes,
    userVote,
    releaseType,
    totalTracks,
  } = release;

  const handleVote = (voteType, value) => {
    // Placeholder for actual vote submission logic
    console.log(`Voted for ${release.id}: ${voteType} - ${value}`);
    // This would typically involve:
    // 1. Getting the current user's ID.
    // 2. Updating the vote count in Firestore for the specific release.
    // 3. Storing/updating the user's specific vote to prevent re-voting or allow changing vote.
    // 4. Potentially re-fetching or locally updating the UI to reflect the new vote count/status.
  };

  let dateInfo;
  if (type === "announced") {
    dateInfo = `Announced: ${announcedDate} | Releasing: ${releaseDate}`;
  } else if (type === "releasing_tomorrow") {
    dateInfo = `Releasing: ${releaseDate} (Tomorrow!)`;
  } else {
    // live_now
    dateInfo = `Released: ${releaseDate}`;
  }

  return (
    <div
      // onClick={() =>
      //     window.open(
      //       `https://open.spotify.com/album/${release.id}`,
      //       '_blank',
      //       'noopener,noreferrer'
      //     )
      //   }
      className="bg-dark-card p-4 rounded-lg shadow-lg flex space-x-4 hover:shadow-brand-primary/20 transition-shadow duration-200"
    >
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
          href={`https://open.spotify.com/album/${release.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-text leading-tight hover:underline cursor-pointer"
        >
          {title}
        </a>
        <h3 className="text-xs font-light text-text">
          {/* {release.releaseType} */}
          <span className="capitalize">{release.releaseType}</span>
          {release.totalTracks > 1 && ` (${release.totalTracks} tracks)`}
        </h3>
        <a
          href={`https://open.spotify.com/artist/${release.artistId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand-primary hover:underline cursor-pointer"
        >
          {artist}
        </a>
        <p className="text-xs text-text-secondary mt-1">{dateInfo}</p>

        <div className="mt-2 flex items-center space-x-3">
          {type !== "live_now" && (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleVote("excitement", "excited")}
                title="Excited!"
                className={`p-1 rounded-full hover:bg-brand-accent/20 ${
                  userVote?.excitement === "excited"
                    ? "text-brand-accent"
                    : "text-text-secondary"
                }`}
              >
                <FaFire />
              </button>
              <span className="text-xs text-text-secondary">
                {votes?.excitement || 0}
              </span>
            </div>
          )}
          {type === "live_now" && (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleVote("quality", "good")}
                title="It's a hit!"
                className={`p-1 rounded-full hover:bg-brand-accent/20 ${
                  userVote?.quality === "good"
                    ? "text-brand-accent"
                    : "text-text-secondary"
                }`}
              >
                <FaThumbsUp />
              </button>
              <span className="text-xs text-text-secondary">
                {votes?.quality || 0}
              </span>
            </div>
          )}
          {/* Add dislike/not-excited buttons if desired */}
        </div>
      </div>
    </div>
  );
}

export default SongCard;
