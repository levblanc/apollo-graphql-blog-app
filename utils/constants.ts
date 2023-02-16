export const TOKEN = 'blog-app-auth-token';

// Authentication Errors
export const SESSION_EXPIRED = {
  name: 'Authentication Error',
  errorCode: 'A100',
  message: 'Login session expired. Please login again.',
};

export const UNAUTHENTICATED = {
  name: 'Authentication Error',
  errorCode: 'A102',
  message: 'Forbidden access (unauthenticated).',
};

// User Error
export const USER_NOT_FOUND = {
  name: 'User Error',
  errorCode: 'U101',
  message: 'User not found.',
};

export const INVALID_CREDENTIIALS = {
  name: 'User Error',
  errorCode: 'U102',
  message: 'Invalid credentials.',
};

export const INVALID_EMAIL = {
  name: 'User Error',
  errorCode: 'U103',
  message: 'Invalid email.',
};

export const INVALID_PASSWORD = {
  name: 'User Error',
  errorCode: 'U104',
  message: 'Invalid password, length less than 5.',
};

export const INVALID_USER_BIO = {
  name: 'User Error',
  errorCode: 'U105',
  message: 'Invalid user bio. Can not be empty.',
};

// Post Error
export const POST_NOT_FOUND = {
  name: 'Post Error',
  errorCode: 'P101',
  message: 'Post not found.',
};

export const POST_NOT_OWNED_BY_USER = {
  name: 'Post Error',
  errorCode: 'P102',
  message: 'Post not owned by this user.',
};
