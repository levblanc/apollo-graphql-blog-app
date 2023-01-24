import {
  booleanArg,
  intArg,
  mutationField,
  nonNull,
  objectType,
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
    t.nonNull.boolean('published');
    t.nonNull.field('author', { type: User });
  },
});

export const PostResopnse = objectType({
  name: 'PostResponse',
  definition(t) {
    t.implements('Response');
    t.field('post', { type: Post });
  },
});

export const postCreate = mutationField('postCreate', {
  type: PostResopnse,
  args: {
    title: nonNull(stringArg()),
    content: nonNull(stringArg()),
    // authorId: nonNull(intArg()),
  },
  async resolve(_parent, { title, content }, ctx) {
    if (!title || !content) {
      const error = createResponse({
        success: false,
        error: new Error('You must provide title and content to create a post'),
      });

      return error;
    }

    try {
      const post = await ctx.prisma.post.create({
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
