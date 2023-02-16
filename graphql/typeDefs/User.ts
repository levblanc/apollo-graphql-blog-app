import { inputObjectType, objectType } from 'nexus';
import { Post } from './Post';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('email');
    t.list.field('posts', {
      type: Post,
      async resolve({ id }, _args, { prisma, auth }) {
        const isMe = id === auth?.userId;

        let whereInputs: {
          authorId: number | null | undefined;
          published?: boolean;
        } = {
          authorId: id,
        };

        let findOptions = {
          where: whereInputs,
          orderBy: { createdAt: 'desc' },
        };

        // Show published posts only
        // if requested by other users
        if (!isMe) {
          findOptions.where.published = true;
        }

        return await prisma.post.findMany(findOptions);
      },
    });
  },
});

export const CredentialsInput = inputObjectType({
  name: 'CredentialsInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const UserResponse = objectType({
  name: 'UserResponse',
  definition(t) {
    t.implements('Response');
    t.string('token');
    t.field('user', { type: User });
  },
});
