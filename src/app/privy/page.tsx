"use client";

import { usePrivy } from "@privy-io/react-auth";
import { UserPill } from "@privy-io/react-auth/ui";

export default function LoginButton() {
  const { login, ready, authenticated, logout } = usePrivy();

  if (!ready) return null;

  if (authenticated) {
    return (
      <div>
        <h1>Dashboard</h1>
        <UserPill />
        <p>You're logged in!</p>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <UserPill />
      </div>
      <button type="button" onClick={login}>
        Login with Privy
      </button>
    </>
  );
}
