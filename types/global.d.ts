import { PrismaClient } from '@prisma/client';
import { ReactNode } from 'react';

declare global {
  var prisma: PrismaClient;

  interface IProviderProps {
    children: ReactNode;
  }

  type AuthResponse = {
    success: boolean;
    userId?: string;
    error?: JwtError;
  };

  type ResolverError = {
    code?: string;
    name?: string;
    message?: string;
    errorCode?: string;
  };

  type ResolverResponse = {
    code: number;
    success: boolean;
    token?: string;
    data: any | null;
    error: ResolverError | null;
  };

  type User = {
    name?: string;
    email: string;
    bio?: string;
  };

  type PostData = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: User;
    published?: boolean;
    isAuthenticated?: boolean;
  };

  type PostAttr = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    authorName: string;
    published?: boolean;
    isMyProfile?: boolean;
    showActionButtons?: boolean;
  };
}
