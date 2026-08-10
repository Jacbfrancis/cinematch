// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
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
 * Signs the user in with Google.
 *
 * Dev (localhost): uses the popup flow with session-backed persistence, which
 * avoids the IndexedDB "Database is closing/hidden" errors on local dev.
 *
 * Prod (e.g. Netlify): hosts send a Cross-Origin-Opener-Policy header that
 * breaks popups, so we use the redirect flow instead. The result is picked up
 * on the way back by AuthContext via getRedirectResult.
 */
export async function signInWithGoogle(): Promise<void> {
  const provider = new GoogleAuthProvider();

  if (import.meta.env.DEV) {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithPopup(auth, provider);
  } else {
    await signInWithRedirect(auth, provider, browserPopupRedirectResolver);
  }
}
