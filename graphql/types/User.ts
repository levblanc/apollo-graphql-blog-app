import { mutationField, nonNull, objectType, stringArg } from 'nexus';
import validator from 'validator';
import { createResponse } from '../utils';
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

export const UserResponse = objectType({
  name: 'UserResponse',
  definition(t) {
    t.implements('Response');
    t.field('user', { type: User });
  },
});

export const signup = mutationField('signup', {
  type: UserResponse,
  args: {
    email: nonNull(stringArg()),
    name: stringArg(),
    password: nonNull(stringArg()),
  },
  async resolve(_parent, { email, name, password }, { prisma }) {
    try {
      const isEmail = validator.isEmail(email);

      if (!isEmail) {
        return createResponse({
          success: false,
          error: new Error('Invalid email'),
        });
      }

      const isValidPassword = validator.isLength(password, { min: 5 });

      if (!isValidPassword) {
        return createResponse({
          success: false,
          error: new Error('Invalid password, length less than 5'),
        });
      }

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password,
        },
      });

      const res = createResponse({
        success: true,
        message: 'User create success',
        data: { user },
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
