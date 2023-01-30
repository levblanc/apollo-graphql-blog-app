import { ProfileResponse } from '@/graphql/typeDefs';
import { createResponse } from '@/graphql/utils/response';
import { intArg, nonNull, queryField } from 'nexus';

export const profile = queryField('profile', {
  type: ProfileResponse,
  args: { userId: nonNull(intArg()) },
  async resolve(_parent, { userId }, { prisma }) {
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          userId,
        },
      });

      const res = createResponse({
        success: true,
        data: { profile },
      });

      return res;
    } catch (error) {
      const err = createResponse({
        success: false,
        error,
      });

      return err;
    }
  },
});
