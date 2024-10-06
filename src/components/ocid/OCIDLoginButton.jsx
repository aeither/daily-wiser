"use client";

import { useOCAuth } from "@opencampus/ocid-connect-js";

export function OCIDLoginButton() {
  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: "opencampus" });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <button type="button" onClick={handleLogin}>
      Login
    </button>
  );
}
