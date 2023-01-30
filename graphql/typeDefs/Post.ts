import { inputObjectType, objectType } from 'nexus';
import { User } from './User';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('title');
    t.nonNull.string('content');
    t.nonNull.string('createdAt');
    t.nonNull.string('updatedAt');
    t.nonNull.boolean('published');
    t.nonNull.field('author', { type: User });
  },
});

export const PostInput = inputObjectType({
  name: 'PostInput',
  definition(t) {
    t.string('title');
    t.string('content');
  },
});

export const PostResponse = objectType({
  name: 'PostResponse',
  definition(t) {
    t.implements('Response');
    t.field('post', { type: Post });
  },
});

export const PostListResponse = objectType({
  name: 'PostListResponse',
  definition(t) {
    t.implements('Response');
    t.list.field('posts', { type: Post });
  },
});
