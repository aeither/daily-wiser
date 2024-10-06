"use client";

import { OCConnect } from "@opencampus/ocid-connect-js";

export function OCConnectWrapper({ children, opts, sandboxMode }) {
  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}
