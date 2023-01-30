import { objectType } from 'nexus';
import { User } from './User';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.int('id');
    t.string('bio');
    t.string('userId');
    t.field('user', {
      type: User,
      async resolve({ userId }, _args, { prisma }) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              id: userId,
            },
          });

          return user;
        } catch (error) {
          console.error(error);
          return error;
        }
      },
    });
  },
});

export const ProfileResponse = objectType({
  name: 'ProfileResponse',
  definition(t) {
    t.implements('Response');
    t.field('profile', { type: Profile });
  },
});
