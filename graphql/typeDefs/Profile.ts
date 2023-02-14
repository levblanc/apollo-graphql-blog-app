import { objectType } from 'nexus';
import { User } from './User';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.int('id');
    t.string('bio');
    t.int('userId');
    t.boolean('isMyProfile', {
      resolve({ userId: id }, _args, { userId }) {
        return id === userId;
      },
    });
    t.field('user', {
      type: User,
      async resolve({ userId: id }, _args, { prisma }) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              id,
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
