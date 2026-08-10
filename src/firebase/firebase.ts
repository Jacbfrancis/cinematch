// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";

// Your web app's Firebase configuration (values loaded from .env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Signs the user in with a Google popup.
 *
 * We use the popup flow (reliable on localhost, where the COOP header that
 * breaks popups on some production hosts is absent) and session-backed
 * persistence instead of IndexedDB. This specifically avoids the
 * "Database is closing/hidden" IndexedDB errors seen on local development.
 *
 * The user stays signed in across page refreshes in the same tab/session.
 */
export async function signInWithGoogle(): Promise<UserCredential> {
  await setPersistence(auth, browserSessionPersistence);
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}
