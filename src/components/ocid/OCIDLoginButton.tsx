"use client";

import { useOCAuth } from "@opencampus/ocid-connect-js";
import { Button } from "../ui/button";

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
    <Button
      type="button"
      variant={"ghost"}
      className="blue-600"
      onClick={handleLogin}
    >
      Connect
    </Button>
  );
}
