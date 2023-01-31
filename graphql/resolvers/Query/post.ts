import { queryField } from 'nexus';
import { createResponse } from '../../utils/response';
import { PostListResponse } from '@/graphql/typeDefs';

export const posts = queryField('posts', {
  type: PostListResponse,
  async resolve(_parent, __args, { prisma }) {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: [{ createdAt: 'desc' }],
      });

      const res = createResponse({
        success: true,
        message: 'Retreive posts success',
        data: { posts },
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
