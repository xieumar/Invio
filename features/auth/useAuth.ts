"use client";

import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/context/AuthContext";

export interface UseAuthReturn extends AuthContextType {
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return {
    ...context,
    isAuthenticated: Boolean(context.user || context.isDemoUser),
  };
}
