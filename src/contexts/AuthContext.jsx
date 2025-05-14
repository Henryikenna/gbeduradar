import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const AuthContext = createContext();

// Custom hook for consuming
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);         // Firebase Auth user
  const [profile, setProfile] = useState(null);   // Firestore document data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state
    const unsubscribe = onAuthStateChanged(auth, async fbUser => {
    console.log("fbUser", fbUser);
      if (fbUser) {
        setUser(fbUser);
        // Fetch extra profile from Firestore
        const docRef = doc(db, "users", fbUser.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Expose login, logout, register helpers if you want:
  const logout = () => signOut(auth);

  const value = {
    user,
    profile,
    loading,
    logout,
    // you could also expose signup, login here...
  };

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  );
}
