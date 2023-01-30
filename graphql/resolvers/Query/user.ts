import { UserResponse } from '@/graphql/typeDefs';
import { createResponse } from '@/graphql/utils/response';
import { intArg, nonNull, queryField } from 'nexus';

export const me = queryField('me', {
  type: UserResponse,
  args: { id: nonNull(intArg()) },
  async resolve(_parent, { id }, { prisma, userId }) {
    if (!userId) {
      const error = createResponse({
        success: false,
        error: new Error('Forbidden access (unauthenticated)'),
      });

      return error;
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      const res = createResponse({
        success: true,
        message: 'User found',
        data: { user },
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
