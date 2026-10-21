/**
 * lib/auth-client.ts
 * Better Auth browser-side client
 * Import this in Client Components
 */
import { createAuthClient } from "better-auth/react";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  ipAddress?: string | null;
  userAgent?: string | null;
}

export interface AuthSession {
  user: User;
  session: Session;
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const {
  signIn,
  signUp,
  getSession,
} = authClient;

export const signOut = authClient.signOut as (options?: any) => Promise<any>;

export const useSession = authClient.useSession as () => {
  data: AuthSession | null;
  isPending: boolean;
  isRefetching: boolean;
  error: any;
  refetch: (queryParams?: any) => Promise<void>;
};
