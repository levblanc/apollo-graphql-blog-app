import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import userAuthentication from '@/graphql/utils/userAuthentication';

export type GraphqlContext = {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  auth: AuthResponse | null;
};

export const createGraphqlContext = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GraphqlContext> => {
  const { authorization } = req.headers;
  let auth: AuthResponse | null = null;

  if (authorization && authorization !== 'null') {
    auth = userAuthentication(authorization);
  }

  return { req, res, prisma, auth };
};
