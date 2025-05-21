'use strict'

import { toast } from "sonner";
import { db } from "../firebaseConfig";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  serverTimestamp 
} from "firebase/firestore";


export const voteService = {
  /**
   * Cast a vote for a release
   * @param {string} releaseId - The ID of the release
   * @param {string} voteType - The type of vote (excitement or quality)
   * @param {string} userId - The ID of the user casting the vote
   * @param {boolean} isPositive - Whether the vote is positive or negative
   * @returns {Promise} - A promise that resolves when the vote is cast
   */
  async castVote(releaseId, voteType, userId, isPositive) {
    try {
      const voteRef = doc(db, "votes", releaseId);
      const voteDoc = await getDoc(voteRef);
      
      if (!voteDoc.exists()) {
        // Create new vote document if it doesn't exist
        const initialVote = {
          releaseId,
          [voteType]: {
            positive: isPositive ? [userId] : [],
            negative: isPositive ? [] : [userId]
          },
          updatedAt: serverTimestamp()
        };
        await setDoc(voteRef, initialVote);
        return true;
      } else {
        // Update existing vote document
        const voteData = voteDoc.data();
        
        // Initialize vote type fields if they don't exist
        if (!voteData[voteType]) {
          voteData[voteType] = { positive: [], negative: [] };
        }
        
        const positiveList = voteData[voteType].positive || [];
        const negativeList = voteData[voteType].negative || [];
        
        // Check if user already voted
        const votedPositive = positiveList.includes(userId);
        const votedNegative = negativeList.includes(userId);
        
        // Handle vote changes
        if (isPositive) {
          if (votedPositive) {
            // Remove positive vote (toggle off)
            await updateDoc(voteRef, {
              [`${voteType}.positive`]: arrayRemove(userId),
              updatedAt: serverTimestamp()
            });
          } else {
            // Add positive vote, remove negative if exists
            await updateDoc(voteRef, {
              [`${voteType}.positive`]: arrayUnion(userId),
              [`${voteType}.negative`]: arrayRemove(userId),
              updatedAt: serverTimestamp()
            });
          }
        } else {
          if (votedNegative) {
            // Remove negative vote (toggle off)
            await updateDoc(voteRef, {
              [`${voteType}.negative`]: arrayRemove(userId),
              updatedAt: serverTimestamp()
            });
          } else {
            // Add negative vote, remove positive if exists
            await updateDoc(voteRef, {
              [`${voteType}.negative`]: arrayUnion(userId),
              [`${voteType}.positive`]: arrayRemove(userId),
              updatedAt: serverTimestamp()
            });
          }
        }
        return true;
      }
    } catch (error) {
      console.error("Error casting vote:", error);
      return false;
    }
  },

  /**
   * Get votes for a release
   * @param {string} releaseId - The ID of the release
   * @returns {Promise<Object|null>} - The vote data or null if there are no votes
   */
  async getVotes(releaseId) {
    try {
      const voteRef = doc(db, "votes", releaseId);
      const voteDoc = await getDoc(voteRef);
      
      if (voteDoc.exists()) {
        return voteDoc.data();
      }
      return null;
    } catch (error) {
      console.error("Error getting votes:", error);
      toast.error("Error getting votes:", error);
      return null;
    }
  }
};