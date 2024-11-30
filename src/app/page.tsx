"use client";

import { signInWithGoogle, signOutUser } from "./lib/firebase";
import { useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  const handleSignIn = async () => {
    const userData = await signInWithGoogle();
    setUser(userData);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-fg">
      <h1 className="text-4xl font-bold text-blue">Canary-Chat</h1>
      {user ? (
        <div className="mt-8 text-center">
          <p className="text-lg">Welcome, {user.displayName}!</p>
          <button
            onClick={handleSignOut}
            className="mt-4 px-4 py-2 bg-red text-fg rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="mt-8 px-4 py-2 bg-green text-bg rounded"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
}
