import { PrismaClient } from '@prisma/client';
import { errorResponse, successResponse } from '@/graphql/utils/response';
import {
  POST_NOT_FOUND,
  POST_NOT_OWNED_BY_USER,
  USER_NOT_FOUND,
} from '@/utils/constants';

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
        error: USER_NOT_FOUND,
      });
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      return errorResponse({
        error: POST_NOT_FOUND,
      });
    }

    if (post?.authorId !== user.id) {
      return errorResponse({
        error: POST_NOT_OWNED_BY_USER,
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
