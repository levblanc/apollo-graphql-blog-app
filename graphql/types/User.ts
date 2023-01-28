import {
  inputObjectType,
  mutationField,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
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

export const credentialsInput = inputObjectType({
  name: 'credentialsInput',
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

const createToken = async (userId: string) => {
  return await JWT.sign({ userId }, process.env.JWT_SIGNATURE, {
    expiresIn: 36000,
  });
};

export const signup = mutationField('signup', {
  type: UserResponse,
  args: {
    credentials: nonNull(credentialsInput),
    name: stringArg(),
    bio: nonNull(stringArg()),
  },
  async resolve(_parent, { credentials, name, bio }, { prisma }) {
    const { email, password } = credentials;
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

      const hashedPassword = bcrypt.hashSync(password, 10);

      if (!bio) {
        return createResponse({
          success: false,
          error: new Error(`Invalid user bio: ${bio}`),
        });
      }

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const token = await createToken(user.id);

      await prisma.profile.create({
        data: { bio, userId: user.id },
      });

      const res = createResponse({
        success: true,
        message: 'User create success',
        data: { token },
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

export const signin = mutationField('signin', {
  type: UserResponse,
  args: {
    credentials: nonNull(credentialsInput),
  },
  async resolve(_parent, { credentials }, { prisma }) {
    const { email, password } = credentials;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        const err = createResponse({
          success: false,
          error: new Error('Invalid credentials'),
        });

        return err;
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        const err = createResponse({
          success: false,
          error: new Error('Invalid credentials'),
        });

        return err;
      }

      const token = await createToken(user.id);
      const res = createResponse({
        success: true,
        message: 'User sign in success',
        data: { token },
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
