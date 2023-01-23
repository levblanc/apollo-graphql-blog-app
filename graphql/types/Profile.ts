import { objectType } from 'nexus';
import { User } from './User';

export const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.int('id');
    t.string('bio');
    t.field('user', { type: User });
  },
});
