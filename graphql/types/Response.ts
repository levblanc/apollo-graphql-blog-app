import { interfaceType, objectType } from 'nexus';

export type ResponseErrorType = {
  code?: string;
  name?: string;
  message?: string;
  errorCode?: string;
};
export interface ResponseType {
  code: number;
  success: boolean;
  message: string;
  error?: ResponseErrorType;
  data?: any;
}

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
    t.nonNull.string('message');
    t.nonNull.boolean('success');
    t.field('error', { type: ResponseError });
  },
});
