import { interfaceType, objectType } from 'nexus';

export const ResponseError = objectType({
  name: 'ResponseError',
  definition(t) {
    t.string('name');
    t.string('message');
    t.string('errorCode');
    t.string('code');
  },
});

export const Response = interfaceType({
  name: 'Response',
  definition(t) {
    t.nonNull.int('code');
    t.string('message');
    t.nonNull.boolean('success');
    t.field('error', { type: ResponseError });
  },
});
