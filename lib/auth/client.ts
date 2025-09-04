// lib/auth/client.ts
import { createAuthClient } from "better-auth/react";
import type { auth } from "./config";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3050/",
});

// Export hook types
export const {
  useSession,
  signIn,
  signOut,
  signUp,
} = authClient;

// Custom hooks for OAuth providers
export const useGoogleSignIn = () => {
  const signInWithGoogle = () => {
    return signIn.social({
      provider: "google",
      callbackURL: "/dashboard", // Redirect after successful login
    });
  };

  return { signInWithGoogle };
};

export const useGitHubSignIn = () => {
  const signInWithGitHub = () => {
    return signIn.social({
      provider: "github",
      callbackURL: "/dashboard", // Redirect after successful login
    });
  };

  return { signInWithGitHub };
};

// Types
export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session;