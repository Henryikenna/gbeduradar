import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_GBEDU_RADAR_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_GBEDU_RADAR_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_GBEDU_RADAR_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_GBEDU_RADAR_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_GBEDU_RADAR_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_GBEDU_RADAR_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_GBEDU_RADAR_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app); // Optional: specify region e.g. getFunctions(app, 'europe-west1')
const messaging = getMessaging(app);

export { auth, db, functions, messaging, app };
