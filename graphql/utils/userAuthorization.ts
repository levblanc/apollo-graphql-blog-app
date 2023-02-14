import { PrismaClient } from '@prisma/client';
import { errorResponse, successResponse } from '@/graphql/utils/response';

const userAuthorization = async ({
  userId,
  postId,
  prisma,
}: {
  userId: number;
  postId: number;
  prisma: PrismaClient;
}): Promise<ResolverResponse> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return errorResponse({
        error: new Error('User not found.'),
      });
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return errorResponse({
        error: new Error('Post not found'),
      });
    }

    if (post?.authorId !== user.id) {
      return errorResponse({
        error: new Error('Post not owned by this user'),
      });
    }

    return successResponse({});
  } catch (error) {
    return errorResponse({
      error,
    });
  }
};

export default userAuthorization;
