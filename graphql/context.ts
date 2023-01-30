import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';
import verifyUser from './utils/verifyUser';

export type GraphqlContext = {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
};

export const createGraphqlContext = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GraphqlContext> => {
  const { authorization } = req.headers;
  let userId: string | null = null;

  if (authorization) {
    userId = verifyUser(authorization);
  }

  return { req, res, prisma, userId };
};
