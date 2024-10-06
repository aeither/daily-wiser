"use client";

import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useEffect } from "react";
import { OCIDLoginButton } from "./OCIDLoginButton";

export function OCIDComponent() {
  const { authState, ocAuth } = useOCAuth();

  useEffect(() => {
    console.log(authState);
  }, [authState]); // Now it will log whenever authState changes

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  // Add a loading state
  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {authState.isAuthenticated ? (
        <p>You are logged in! {JSON.stringify(ocAuth.getAuthInfo())}</p>
      ) : (
        <div className="w-full rounded-md bg-gradient-to-r from-blue-200 to-green-300">
          <OCIDLoginButton />
        </div>
      )}
    </div>
  );
}
