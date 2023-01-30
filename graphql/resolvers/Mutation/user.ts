import { mutationField, nonNull, stringArg } from 'nexus';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { createResponse } from '../../utils/response';
import { UserResponse, CredentialsInput } from '../../typeDefs/User';

const createToken = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  return await JWT.sign({ userId, email }, process.env.JWT_SIGNATURE, {
    expiresIn: 36000,
  });
};

export const signup = mutationField('signup', {
  type: UserResponse,
  args: {
    credentials: nonNull(CredentialsInput),
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

      const token = await createToken({ userId: user.id, email });

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
    credentials: nonNull(CredentialsInput),
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

      const token = await createToken({ userId: user.id, email });
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
