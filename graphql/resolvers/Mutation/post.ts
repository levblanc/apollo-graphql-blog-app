import { intArg, mutationField, nonNull } from 'nexus';
import { errorResponse, successResponse } from '@/graphql/utils/response';
import userAuthorization from '@/graphql/utils/userAuthorization';
import { PostInput, PostResponse } from '@/graphql/typeDefs';
import { unauthenticated } from '@/graphql/utils/errorMessage';
import {
  POST_CREATE_NO_TITLE_OR_CONTENT,
  POST_ID_NOT_EXIST,
  POST_UPDATE_NO_TITLE_OR_CONTENT,
  UNAUTHENTICATED,
} from '@/utils/constants';

export const postCreate = mutationField('postCreate', {
  type: PostResponse,
  args: { post: PostInput, authorId: intArg() },
  async resolve(_parent, args, { prisma, auth }): Promise<ResolverResponse> {
    const { title, content } = args.post!;

    if (!auth.success) {
      const message = unauthenticated(auth.error.message);

      return errorResponse({
        error: Object.assign(UNAUTHENTICATED, { message }),
      });
    }

    if (!title || !content) {
      return errorResponse({
        error: POST_CREATE_NO_TITLE_OR_CONTENT,
      });
    }

    try {
      const post = await prisma.post.create({
        data: { title, content, authorId: auth.userId },
      });

      return successResponse({
        data: { post },
      });
    } catch (error: any) {
      return errorResponse({ error });
    }
  },
});

export const postUpdate = mutationField('postUpdate', {
  type: PostResponse,
  args: {
    post: PostInput,
    postId: nonNull(intArg()),
  },
  async resolve(_parent, args, { prisma, auth }): Promise<ResolverResponse> {
    const { content, title } = args.post!;

    if (!auth.success) {
      const message = unauthenticated(auth.error.message);

      return errorResponse({
        error: Object.assign(UNAUTHENTICATED, { message }),
      });
    }

    const authorizationRes = await userAuthorization({
      userId: auth.userId,
      postId: args.postId,
      prisma,
    });

    if (!authorizationRes.success) {
      return authorizationRes;
    }

    if (!title && !content) {
      return errorResponse({
        error: POST_UPDATE_NO_TITLE_OR_CONTENT,
      });
    }

    try {
      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(args.postId),
        },
      });

      if (!existingPost) {
        return errorResponse({
          error: POST_ID_NOT_EXIST,
        });
      }

      const updatePayload = {
        title,
        content,
      };

      if (!title) delete updatePayload.title;
      if (!content) delete updatePayload.content;

      const updatedPost = await prisma.post.update({
        data: updatePayload,
        where: {
          id: Number(args.postId),
        },
      });

      return successResponse({
        data: { post: updatedPost },
      });
    } catch (error) {
      return errorResponse({ error });
    }
  },
});

export const postDelete = mutationField('postDelete', {
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
      if (!auth.success) {
        const message = unauthenticated(auth.error.message);

        return errorResponse({
          error: Object.assign(UNAUTHENTICATED, { message }),
        });
      }

      const authorizationRes = await userAuthorization({
        userId: auth.userId,
        postId,
        prisma,
      });

      if (!authorizationRes.success) {
        return authorizationRes;
      }

      const existingPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!existingPost) {
        return errorResponse({
          error: POST_ID_NOT_EXIST,
        });
      }

      await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return successResponse({
        data: { post: existingPost },
      });
    } catch (error) {
      return errorResponse({ error });
    }
  },
});

export const postPublish = mutationField('postPublish', {
  type: PostResponse,
  args: {
    postId: nonNull(intArg()),
  },
  async resolve(
    _parent,
    { postId },
    { prisma, auth }
  ): Promise<ResolverResponse> {
    if (!auth.success) {
      const message = unauthenticated(auth.error.message);

      return errorResponse({
        error: Object.assign(UNAUTHENTICATED, { message }),
      });
    }

    const authorizationRes = await userAuthorization({
      userId: auth.userId,
      postId,
      prisma,
    });

    if (!authorizationRes.success) {
      return authorizationRes;
    }

    try {
      const existingPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!existingPost) {
        return errorResponse({
          error: POST_ID_NOT_EXIST,
        });
      }

      const publishedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          published: true,
        },
      });

      return successResponse({
        data: { post: publishedPost },
      });
    } catch (error) {
      return errorResponse({
        error,
      });
    }
  },
});

export const postUnpublish = mutationField('postUnpublish', {
  type: PostResponse,
  args: {
    postId: nonNull(intArg()),
  },
  async resolve(
    _parent,
    { postId },
    { prisma, auth }
  ): Promise<ResolverResponse> {
    if (!auth.success) {
      const message = unauthenticated(auth.error.message);

      return errorResponse({
        error: Object.assign(UNAUTHENTICATED, { message }),
      });
    }

    const authorizationRes = await userAuthorization({
      userId: auth.userId,
      postId,
      prisma,
    });

    if (!authorizationRes.success) {
      return authorizationRes;
    }

    try {
      const existingPost = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (!existingPost) {
        return errorResponse({
          error: POST_ID_NOT_EXIST,
        });
      }

      const publishedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          published: false,
        },
      });

      return successResponse({
        data: { post: publishedPost },
      });
    } catch (error) {
      return errorResponse({
        error,
      });
    }
  },
});
