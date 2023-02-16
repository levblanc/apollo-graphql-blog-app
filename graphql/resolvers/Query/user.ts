import { UserResponse } from '@/graphql/typeDefs';
import { unauthenticated } from '@/graphql/utils/errorMessage';
import { errorResponse, successResponse } from '@/graphql/utils/response';
import { queryField } from 'nexus';
import { GraphqlContext } from '@/graphql/context';
import { UNAUTHENTICATED } from '@/utils/constants';

export const me = queryField('me', {
  type: UserResponse,
  async resolve(_parent, __args, { prisma, auth }: GraphqlContext) {
    if (!auth.success) {
      const message = unauthenticated(auth.error.message);

      return errorResponse({
        error: Object.assign(UNAUTHENTICATED, { message }),
      });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: auth?.userId,
        },
      });

      return successResponse({
        data: { user },
      });
    } catch (error) {
      return errorResponse({ error });
    }
  },
});
