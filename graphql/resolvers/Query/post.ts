import { intArg, nonNull, queryField } from 'nexus';
import { errorResponse, successResponse } from '@/graphql/utils/response';
import { PostListResponse, PostResponse } from '@/graphql/typeDefs';

export const post = queryField('getPost', {
  type: PostResponse,
  args: {
    postId: nonNull(intArg()),
  },
  async resolve(
    _parent,
    { postId },
    { prisma, auth }
  ): Promise<ResolverResponse> {
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      return successResponse({
        data: {
          post,
          isAuthenticated: auth.success,
        },
      });
    } catch (error) {
      return errorResponse({ error });
    }
  },
});

export const posts = queryField('getPostList', {
  type: PostListResponse,
  async resolve(_parent, __args, { prisma }): Promise<ResolverResponse> {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
      });

      return successResponse({
        data: { posts },
      });
    } catch (error) {
      return errorResponse({
        error,
      });
    }
  },
});
