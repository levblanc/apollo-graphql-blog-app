type ResponseParam = {
  success: boolean;
  message?: string;
  data?: any | null;
  error?: any | null;
  token?: string | null;
};

type ResponseData = {
  code: number;
  success: boolean;
  message?: string;
  data?: any | null;
  error?: any | null;
  token?: string | null;
};

export const createResponse = ({
  success,
  message,
  data = null,
  error = null,
  token = null,
}: ResponseParam) => {
  let statusCode = 200;

  if (!success) {
    statusCode = 400;
    message = error?.message;

    if (!error) {
      message = `error is ${error}`;
    }
  } else if (!message) {
    message = 'Operation success';
  }

  return {
    code: statusCode,
    success,
    message,
    data,
    token,
    error: error && {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      errorCode: error?.errorCode,
    },
  };
};

export const successResponse = ({
  message,
  data,
  token,
}: {
  message?: string;
  data?: any;
  token?: string;
}) => {
  return createResponse({ success: true, message, data, token });
};

export const errorResponse = ({ error }: { error: any }) => {
  return createResponse({ success: false, error });
};
