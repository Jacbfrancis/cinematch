// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  signInWithPopup,
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
 * Signs the user in with Google via a popup.
 *
 * We intentionally use the popup flow in every environment. On localhost a
 * Cross-Origin-Opener-Policy warning appears but sign-in still succeeds, so
 * that message is not fatal. The actual cause of the earlier production
 * failures was Firebase's IndexedDB "Database is closing/hidden" error, which
 * we avoid here with session-backed persistence.
 *
 * The user stays signed in across page refreshes in the same tab/session.
 */
export async function signInWithGoogle(): Promise<void> {
  const provider = new GoogleAuthProvider();
  await setPersistence(auth, browserSessionPersistence);
  await signInWithPopup(auth, provider);
}
