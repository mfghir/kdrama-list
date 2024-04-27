"use client";

import React, { type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const SessionProviderComp = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderComp;
