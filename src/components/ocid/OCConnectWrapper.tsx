"use client";

import { OCConnect } from "@opencampus/ocid-connect-js";
import type { ReactNode } from "react";

interface OCConnectWrapperProps {
  children: ReactNode;
  opts: {
    redirectUri: string;
    referralCode: string;
    [key: string]: any; // Allow for additional properties in opts
  };
  sandboxMode: boolean;
}

export function OCConnectWrapper({
  children,
  opts,
  sandboxMode,
}: OCConnectWrapperProps) {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}