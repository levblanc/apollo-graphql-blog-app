import { intArg, mutationField, nonNull } from 'nexus';
import { createResponse } from '../../utils/response';
import userAuthorization from '../../utils/userAuthorization';
import { PostInput, PostResponse } from '@/graphql/typeDefs';

export const postCreate = mutationField('postCreate', {
  type: PostResponse,
  args: { post: PostInput, authorId: intArg() },
  async resolve(_parent, args, { prisma, userId }) {
    const { title, content } = args.post!;

    if (!userId) {
      const error = createResponse({
        success: false,
        error: new Error('Forbidden access (unauthenticated)'),
      });

      return error;
    }

    if (!title || !content) {
      const error = createResponse({
        success: false,
        error: new Error('You must provide title and content to create a post'),
      });

      return error;
    }

    try {
      const post = await prisma.post.create({
        data: { title, content, authorId: userId },
      });

      const res = createResponse({
        success: true,
        message: 'Post create success.',
        data: { post },
      });

      return res;
    } catch (error: any) {
      const err = createResponse({
        success: false,
        error,
      });

      return err;
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
      const error = createResponse({
        success: false,
        error: new Error('Forbidden access (unauthenticated)'),
      });

      return error;
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
      const error = createResponse({
        success: false,
        error: new Error('You must provide title or content to update a post'),
      });

      return error;
    }

    try {
      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(args.postId),
        },
      });

      if (!existingPost) {
        const error = createResponse({
          success: false,
          error: new Error(`Post with id ${args.postId} not exist`),
        });

        return error;
      }

      const updatePayload = {
        title,
        content,
      };

      if (!title) delete updatePayload.title;
      if (!content) delete updatePayload.content;

      const updatedPost = prisma.post.update({
        data: updatePayload,
        where: {
          id: Number(args.postId),
        },
      });

      const res = createResponse({
        success: true,
        data: { post: updatedPost },
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

export const postDelete = mutationField('postDelete', {
  type: PostResponse,
  args: {
    postId: nonNull(intArg()),
  },
  async resolve(_parent, { postId }, { prisma, userId }) {
    try {
      if (!userId) {
        const error = createResponse({
          success: false,
          error: new Error('Forbidden access (unauthenticated)'),
        });

        return error;
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
        const error = createResponse({
          success: false,
          error: new Error(`Post with id ${postId} not exist`),
        });

        return error;
      }

      await prisma.post.delete({
        where: {
          id: Number(postId),
        },
      });

      const res = createResponse({
        success: true,
        message: `Post (ID: ${postId}) deleted`,
        data: { post: existingPost },
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

export const postPublish = mutationField('postPublish', {
  type: PostResponse,
  args: {
    postId: nonNull(intArg()),
  },
  async resolve(_parent, { postId }, { prisma, userId }) {
    if (!userId) {
      const error = createResponse({
        success: false,
        error: new Error('Forbidden access (unauthenticated)'),
      });

      return error;
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
        const error = createResponse({
          success: false,
          error: new Error(`Post with id ${postId} not exist`),
        });

        return error;
      }

      const publishedPost = prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          published: true,
        },
      });

      const res = createResponse({
        success: true,
        data: { post: publishedPost },
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

export const postUnpublish = mutationField('postUnpublish', {
  type: PostResponse,
  args: {
    postId: nonNull(intArg()),
  },
  async resolve(_parent, { postId }, { prisma, userId }) {
    if (!userId) {
      const error = createResponse({
        success: false,
        error: new Error('Forbidden access (unauthenticated)'),
      });

      return error;
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
        const error = createResponse({
          success: false,
          error: new Error(`Post with id ${postId} not exist`),
        });

        return error;
      }

      const publishedPost = prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          published: false,
        },
      });

      const res = createResponse({
        success: true,
        data: { post: publishedPost },
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
