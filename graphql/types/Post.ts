import { objectType } from 'nexus';
import { User } from './User';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id');
    t.string('title');
    t.string('content');
    t.string('createdAt');
    t.boolean('published');
    t.field('author', { type: User });
  },
});
