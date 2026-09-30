"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  type User,
  type UserCredential,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isDemoUser: boolean;
  signInWithEmail: (email: string, password: string) => Promise<UserCredential>;
  signUpWithEmail: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  sendPasswordReset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  enableDemoMode: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

function mapFirebaseError(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Invalid email or password. Please try again.";
      case "auth/email-already-in-use":
        return "An account with this email address already exists.";
      case "auth/weak-password":
        return "Password is too weak. Please use at least 6 characters.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/popup-closed-by-user":
        return "Google sign-in was closed before completion.";
      case "auth/popup-blocked":
        return "Sign-in popup was blocked by browser. Please allow popups.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please wait a moment and try again.";
      default:
        return (
          (error as { message?: string }).message ??
          "An unexpected authentication error occurred."
        );
    }
  }
  return error instanceof Error
    ? error.message
    : "An unexpected authentication error occurred.";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);
  const [, startTransition] = useTransition();

  const clearError = () => setError(null);

  const syncUserProfile = async (firebaseUser: User): Promise<UserProfile> => {
    try {
      const userRef = doc(db, "users", firebaseUser.uid);
      const snapshot = await getDoc(userRef);

      const nowIso = new Date().toISOString();

      if (snapshot.exists()) {
        const data = snapshot.data();
        const profile: UserProfile = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          displayName: data.displayName || firebaseUser.displayName || "",
          photoURL: data.photoURL || firebaseUser.photoURL || null,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : data.createdAt || nowIso,
          updatedAt: data.updatedAt?.toDate
            ? data.updatedAt.toDate().toISOString()
            : data.updatedAt || nowIso,
        };
        return profile;
      } else {
        const newProfile: UserProfile = {
          id: firebaseUser.uid,
          email: firebaseUser.email ?? "",
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL || null,
          createdAt: nowIso,
          updatedAt: nowIso,
        };
        await setDoc(userRef, {
          email: newProfile.email,
          displayName: newProfile.displayName,
          photoURL: newProfile.photoURL,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        return newProfile;
      }
    } catch {
      // Graceful fallback if Firestore is unreachable or rules are strict
      return {
        id: firebaseUser.uid,
        email: firebaseUser.email ?? "",
        displayName: firebaseUser.displayName || "",
        photoURL: firebaseUser.photoURL || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        startTransition(() => {
          setError(null);
        });

        if (firebaseUser) {
          setIsDemoUser(false);
          setUser(firebaseUser);
          try {
            const profile = await syncUserProfile(firebaseUser);
            startTransition(() => {
              setUserProfile(profile);
              setLoading(false);
            });
          } catch {
            startTransition(() => {
              setLoading(false);
            });
          }
        } else {
          startTransition(() => {
            setUser(null);
            setUserProfile(null);
            setLoading(false);
          });
        }
      },
      (authError) => {
        startTransition(() => {
          setError(mapFirebaseError(authError));
          setLoading(false);
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (
    email: string,
    password: string
  ): Promise<UserCredential> => {
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setIsDemoUser(false);
      return cred;
    } catch (err) {
      const msg = mapFirebaseError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<UserCredential> => {
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      setIsDemoUser(false);
      if (displayName && cred.user) {
        await updateProfile(cred.user, { displayName });
      }
      return cred;
    } catch (err) {
      const msg = mapFirebaseError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const signInWithGoogle = async (): Promise<UserCredential> => {
    setError(null);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      setIsDemoUser(false);
      return cred;
    } catch (err) {
      const msg = mapFirebaseError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const msg = mapFirebaseError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const signOut = async (): Promise<void> => {
    setError(null);
    try {
      setIsDemoUser(false);
      await firebaseSignOut(auth);
    } catch (err) {
      const msg = mapFirebaseError(err);
      setError(msg);
      throw new Error(msg);
    }
  };

  const enableDemoMode = () => {
    setIsDemoUser(true);
    setUser(null);
    setUserProfile({
      id: "demo-user",
      email: "demo@invio.app",
      displayName: "Demo Workspace",
      photoURL: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        error,
        isDemoUser,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        sendPasswordReset,
        signOut,
        enableDemoMode,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
