import { queryField } from 'nexus';
import { errorResponse, successResponse } from '@/graphql/utils/response';
import { PostListResponse } from '@/graphql/typeDefs';

export const posts = queryField('posts', {
  type: PostListResponse,
  async resolve(_parent, __args, { prisma }): Promise<ResolverResponse> {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
      });

      return successResponse({
        data: posts,
      });
    } catch (error) {
      return errorResponse({
        error,
      });
    }
  },
});
