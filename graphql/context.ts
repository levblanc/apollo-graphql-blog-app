import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../lib/prisma';

export type GraphqlContext = {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
};

export const createGraphqlContext = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GraphqlContext> => {
  return { req, res, prisma };
};
