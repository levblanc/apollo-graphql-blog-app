import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient;

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
  };

  type PostAttr = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    authorName: string;
  };
}
