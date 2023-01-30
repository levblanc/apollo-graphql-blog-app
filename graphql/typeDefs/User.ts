import { inputObjectType, objectType } from 'nexus';
import { Post } from './Post';
import { Profile } from './Profile';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('name');
    t.string('email');
    t.field('profile', { type: Profile });
    t.list.field('posts', {
      type: Post,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
          .posts();
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
  },
});
