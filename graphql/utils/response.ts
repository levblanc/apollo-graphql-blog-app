type ResponseParam = {
  success: boolean;
  message?: string;
  data?: any | null;
  error?: any | null;
};

export const createResponse = ({
  success,
  message,
  data = null,
  error = null,
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
    ...data,
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
}: {
  message?: string;
  data?: any;
}) => {
  return createResponse({ success: true, message, data });
};

export const errorResponse = ({ error }: { error: any }) => {
  return createResponse({ success: false, error });
};
