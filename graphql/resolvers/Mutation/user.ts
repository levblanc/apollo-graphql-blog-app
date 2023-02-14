import { mutationField, nonNull, stringArg } from 'nexus';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import JWT, { Secret } from 'jsonwebtoken';
import { errorResponse, successResponse } from '@/graphql/utils/response';
import { UserResponse, CredentialsInput } from '@/graphql/typeDefs/User';

const createToken = async ({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) => {
  const signature: Secret = process.env.JWT_SIGNATURE!;

  return await JWT.sign({ userId, email }, signature, {
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
  async resolve(
    _parent,
    { credentials, name, bio },
    { prisma }
  ): Promise<ResolverResponse> {
    const { email, password } = credentials;
    try {
      const isEmail = validator.isEmail(email);

      if (!isEmail) {
        return errorResponse({
          error: new Error('Invalid email'),
        });
      }

      const isValidPassword = validator.isLength(password, { min: 5 });

      if (!isValidPassword) {
        return errorResponse({
          error: new Error('Invalid password, length less than 5'),
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      if (!bio) {
        return errorResponse({
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

      return successResponse({
        token,
        data: { user },
      });
    } catch (error) {
      return errorResponse({ error });
    }
  },
});

export const signin = mutationField('signin', {
  type: UserResponse,
  args: {
    credentials: nonNull(CredentialsInput),
  },
  async resolve(
    _parent,
    { credentials },
    { prisma }
  ): Promise<ResolverResponse> {
    const { email, password } = credentials;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return errorResponse({
          error: new Error('Invalid credentials'),
        });
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return errorResponse({
          error: new Error('Invalid credentials'),
        });
      }

      const token = await createToken({ userId: user.id, email });

      return successResponse({
        token,
        data: { user },
      });
    } catch (error) {
      return errorResponse({ error });
    }
  },
});
