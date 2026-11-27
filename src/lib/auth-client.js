"use client";
import { createAuthClient } from "better-auth/react";

// No baseURL: uses the current origin (/api/auth/* is proxied to Express).
export const authClient = createAuthClient();
export const { useSession, signIn, signUp, signOut } = authClient;
