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
      <h1>Welcome to My App</h1>
      {authState.isAuthenticated ? (
        <p>You are logged in! {JSON.stringify(ocAuth.getAuthInfo())}</p>
      ) : (
        <OCIDLoginButton />
      )}
    </div>
  );
}
