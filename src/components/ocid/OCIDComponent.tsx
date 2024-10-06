"use client";

import { shortenEthAddress } from "@/utils";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useEffect, useState } from "react";
import { OCIDLoginButton } from "./OCIDLoginButton";

export function OCIDComponent() {
  const { authState, ocAuth } = useOCAuth();
  const [userInfo, setUserInfo] = useState({
    edu_username: "",
    eth_address: "",
  });

  useEffect(() => {
    if (authState.isAuthenticated) {
      console.log(ocAuth.getAuthInfo());
      const authInfo = ocAuth.getAuthInfo();
      setUserInfo({
        edu_username: authInfo.edu_username,
        eth_address: shortenEthAddress(authInfo.eth_address),
      });
    }
  }, [authState, ocAuth]);

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {authState.isAuthenticated ? (
        <div className="w-full flex flex-row justify-center items-center gap-2 shadow-sm rounded-md bg-gradient-to-r from-blue-400 to-green-700 p-2">
          <div className="text-white font-bold">{userInfo.edu_username}</div>
          <div className="text-white">{userInfo.eth_address}</div>
        </div>
      ) : (
        <div className="w-full flex flex-row justify-center items-center gap-2 shadow-sm rounded-md bg-gradient-to-r from-blue-400 to-green-700 p-2">
          <div className="text-white font-bold">Open Campus ID</div>
          <OCIDLoginButton />
        </div>
      )}
    </div>
  );
}
