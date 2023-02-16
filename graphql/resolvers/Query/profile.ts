import { ProfileResponse } from '@/graphql/typeDefs';
import {
  authError,
  errorResponse,
  successResponse,
} from '@/graphql/utils/response';
import { intArg, nonNull, queryField } from 'nexus';

export const profile = queryField('getProfile', {
  type: ProfileResponse,
  args: { userId: nonNull(intArg()) },
  async resolve(
    _parent,
    { userId },
    { prisma, auth }
  ): Promise<ResolverResponse> {
    if (auth && !auth.success) {
      return authError(auth);
    }

    try {
      const profile = await prisma.profile.findUnique({
        where: {
          userId,
        },
      });

      return successResponse({
        data: { profile },
      });
    } catch (error) {
      return errorResponse({
        error,
      });
    }
  },
});
