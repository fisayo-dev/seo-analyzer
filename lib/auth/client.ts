import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Export hook types
export const {
  useSession,
  signIn,
  signOut,
  signUp,
} = authClient;

// Custom hooks for OAuth providers
export const signInWithGoogle = () => {
    return signIn.social({
        provider: "google",
        callbackURL: "/dashboard", 
    });
};


export const signInWithGitHub = () => {
    return signIn.social({
        provider: "github",
        callbackURL: "/dashboard", 
    });
};
