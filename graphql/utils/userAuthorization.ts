import { PrismaClient } from '@prisma/client';
import { createResponse, ResponseType } from './response';

const userAuthorization = async ({
  userId,
  postId,
  prisma,
}: {
  userId: string;
  postId: number;
  prisma: PrismaClient;
}): ResponseType => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    const error = createResponse({
      success: false,
      error: new Error('User not found.'),
    });

    return error;
  }

  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post) {
    const error = createResponse({
      success: false,
      error: new Error('Post not found.'),
    });

    return error;
  }

  if (post?.authorId !== user.id) {
    const error = createResponse({
      success: false,
      error: new Error('Post not owned by this user.'),
    });

    return error;
  }

  const res = createResponse({
    success: true,
    message: 'Authorized user',
  });

  return res;
};

export default userAuthorization;
