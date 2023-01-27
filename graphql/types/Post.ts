import {
  booleanArg,
  inputObjectType,
  intArg,
  mutationField,
  nonNull,
  objectType,
  queryField,
  stringArg,
} from 'nexus';
import { createResponse } from '../utils';
import { User } from './User';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.nonNull.string('content');
    t.nonNull.string('createdAt');
    t.nonNull.string('updatedAt');
    t.nonNull.boolean('published');
    t.nonNull.field('author', { type: User });
  },
});

export const PostInput = inputObjectType({
  name: 'PostInput',
  definition(t) {
    t.string('title');
    t.string('content');
  },
});

export const PostResponse = objectType({
  name: 'PostResponse',
  definition(t) {
    t.implements('Response');
    t.field('post', { type: Post });
  },
});

export const PostListResponse = objectType({
  name: 'PostListResponse',
  definition(t) {
    t.implements('Response');
    t.list.field('posts', { type: Post });
  },
});

export const posts = queryField('posts', {
  type: PostListResponse,
  async resolve(_parent, __args, { prisma }) {
    try {
      const posts = await prisma.post.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
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

export const postCreate = mutationField('postCreate', {
  type: PostResponse,
  args: { post: PostInput, authorId: stringArg() },
  async resolve(_parent, args, { prisma }) {
    const { title, content } = args.post!;

    if (!title || !content) {
      const error = createResponse({
        success: false,
        error: new Error('You must provide title and content to create a post'),
      });

      return error;
    }

    try {
      const post = await prisma.post.create({
        data: { title, content, authorId: 1 },
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
  async resolve(_parent, args, { prisma }) {
    const { content, title } = args.post!;

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
          error: new Error(`Post with id ${args.postId} not exist.`),
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
  async resolve(_parent, { postId }, { prisma }) {
    try {
      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(postId),
        },
      });

      if (!existingPost) {
        const error = createResponse({
          success: false,
          error: new Error(`Post with id ${postId} not exist.`),
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
