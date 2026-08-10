import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  getRedirectResult,
  type User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../firebase/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  authError: string;
  clearAuthError: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  // Guard so the redirect result is only processed once even though React
  // StrictMode mounts this effect twice in development.
  const processedRedirect = useRef(false);

  useEffect(() => {
    // Subscribe to Firebase auth state so the user persists across refreshes
    // and is restored after page reloads.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Complete a pending Google redirect sign-in. The browser only returns
    // the OAuth credential to the first listener, so handle it here at the
    // app root (this provider mounts exactly once, above the router).
    if (!processedRedirect.current) {
      processedRedirect.current = true;
      getRedirectResult(auth)
        .then((result) => {
          if (result?.user) setUser(result.user);
        })
        .catch((error: unknown) => {
          console.error(error);
          if (error instanceof FirebaseError) {
            switch (error.code) {
              case "auth/account-exists-with-different-credential":
                setAuthError(
                  "An account already exists with this email using a different sign-in method. Try signing in with that method instead.",
                );
                break;
              case "auth/operation-not-allowed":
                setAuthError(
                  "Google sign-in is not enabled for this app yet. Please enable it in Firebase.",
                );
                break;
              case "auth/network-request-failed":
                setAuthError(
                  "Network error. Please check your internet connection and try again.",
                );
                break;
              default:
                setAuthError("Google sign-in failed. Please try again.");
            }
          } else {
            setAuthError("Google sign-in failed. Please try again.");
          }
        });
    }

    // Clean up the listener on unmount.
    return unsubscribe;
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  const clearAuthError = () => setAuthError("");

  return (
    <AuthContext.Provider
      value={{ user, loading, authError, clearAuthError, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
