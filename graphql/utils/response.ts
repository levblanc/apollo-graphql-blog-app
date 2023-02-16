import { SESSION_EXPIRED } from '@/utils/constants';

type ResponseParam = {
  success: boolean;
  data?: any;
  error?: any;
  token?: string;
};

export const createResponse = ({
  success,
  data = null,
  error = null,
  token,
}: ResponseParam): ResolverResponse => {
  let response: ResolverResponse = {
    code: 200,
    success,
    ...data,
    error,
  };

  if (!success) {
    response.code = 400;

    response.error = {
      code: error.code,
      errorCode: error.errorCode,
      message: error.message,
      name: error.name,
    };

    if (!error) {
      response.error.message = `error is ${JSON.stringify(error)}`;
    }
  }

  if (token) {
    response.token = token;
  }

  return response;
};

export const successResponse = ({
  data,
  token,
}: {
  data?: any;
  token?: string;
}): ResolverResponse => {
  return createResponse({ success: true, data, token });
};

export const errorResponse = ({ error }: { error: any }): ResolverResponse => {
  return createResponse({ success: false, error });
};

export const authError = (auth: AuthResponse): ResolverResponse => {
  let error = {
    name: 'Authentication Error',
    message: 'Authentication Error',
    errorCode: 'A000',
  };

  switch (auth.error.name) {
    case 'TokenExpiredError':
      error = SESSION_EXPIRED;
      break;

    default:
      console.error('Unknown auth error in `authError` function.');
      break;
  }

  return errorResponse({ error });
};
