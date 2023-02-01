import { UserResponse } from '@/graphql/typeDefs';
import { errorResponse, successResponse } from '@/graphql/utils/response';
import { queryField } from 'nexus';

export const me = queryField('me', {
  type: UserResponse,
  async resolve(_parent, __args, { prisma, userId }) {
    if (!userId) {
      return errorResponse({
        error: new Error('Forbidden access (unauthenticated)'),
      });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      return successResponse({
        message: 'User found',
        data: { user },
      });
    } catch (error) {
      return errorResponse({ error });
    }
  },
});
