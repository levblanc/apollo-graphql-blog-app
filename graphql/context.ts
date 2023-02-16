import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import userAuthentication from '@/graphql/utils/userAuthentication';
import { NO_AUTHORIZATION_HEADER } from '@/utils/constants';
import { errorResponse } from './utils/response';

export type GraphqlContext = {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  auth: AuthResponse;
};

export const createGraphqlContext = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GraphqlContext> => {
  const { authorization } = req.headers;
  let auth: AuthResponse = errorResponse({ error: NO_AUTHORIZATION_HEADER });

  if (authorization && authorization !== 'null') {
    auth = userAuthentication(authorization);
  }

  return { req, res, prisma, auth };
};
