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
  let errMsg = 'Authentication Error';

  switch (auth.error.name) {
    case 'TokenExpiredError':
      errMsg = 'Login session expired. Please login again.';
      break;

    default:
      break;
  }

  return errorResponse({
    error: { code: '100', name: 'Session Expired', message: errMsg },
  });
};
