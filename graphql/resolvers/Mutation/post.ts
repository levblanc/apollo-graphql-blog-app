import { intArg, mutationField, nonNull } from 'nexus';
import { errorResponse, successResponse } from '@/graphql/utils/response';
import userAuthorization from '@/graphql/utils/userAuthorization';
import { PostInput, PostResponse } from '@/graphql/typeDefs';

export const postCreate = mutationField('postCreate', {
  type: PostResponse,
  args: { post: PostInput, authorId: intArg() },
  async resolve(_parent, args, { prisma, userId }) {
    const { title, content } = args.post!;

    if (!userId) {
      return errorResponse({
        error: new Error('Forbidden access (unauthenticated)'),
      });
    }

    if (!title || !content) {
      return errorResponse({
        error: new Error('You must provide title and content to create a post'),
      });
    }

    try {
      const post = await prisma.post.create({
        data: { title, content, authorId: userId },
      });

      return successResponse({
        message: 'Post create success',
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
  async resolve(_parent, args, { prisma, userId }) {
    const { content, title } = args.post!;

    if (!userId) {
      return errorResponse({
        error: new Error('Forbidden access (unauthenticated)'),
      });
    }

    const authorizationRes = await userAuthorization({
      userId,
      postId: args.postId,
      prisma,
    });

    if (!authorizationRes.success) {
      return authorizationRes;
    }

    if (!title && !content) {
      return errorResponse({
        error: new Error('You must provide title or content to update a post'),
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
          error: new Error(`Post with id ${args.postId} not exist`),
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
  async resolve(_parent, { postId }, { prisma, userId }) {
    try {
      if (!userId) {
        return errorResponse({
          error: new Error('Forbidden access (unauthenticated)'),
        });
      }

      const authorizationRes = await userAuthorization({
        userId,
        postId: postId,
        prisma,
      });

      if (!authorizationRes.success) {
        return authorizationRes;
      }

      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });

      if (!existingPost) {
        return errorResponse({
          error: new Error(`Post with id ${postId} not exist`),
        });
      }

      await prisma.post.delete({
        where: {
          id: Number(postId),
        },
      });

      return successResponse({
        message: `Post (ID: ${postId}) deleted`,
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
  async resolve(_parent, { postId }, { prisma, userId }) {
    if (!userId) {
      return errorResponse({
        error: new Error('Forbidden access (unauthenticated)'),
      });
    }

    const authorizationRes = await userAuthorization({
      userId,
      postId,
      prisma,
    });

    if (!authorizationRes.success) {
      return authorizationRes;
    }

    try {
      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });

      if (!existingPost) {
        return errorResponse({
          error: new Error(`Post with id ${postId} not exist`),
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
  async resolve(_parent, { postId }, { prisma, userId }) {
    if (!userId) {
      return errorResponse({
        error: new Error('Forbidden access (unauthenticated)'),
      });
    }

    const authorizationRes = await userAuthorization({
      userId,
      postId,
      prisma,
    });

    if (!authorizationRes.success) {
      return authorizationRes;
    }

    try {
      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });

      if (!existingPost) {
        return errorResponse({
          error: new Error(`Post with id ${postId} not exist`),
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
