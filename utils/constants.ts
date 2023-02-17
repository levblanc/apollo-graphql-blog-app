export const TOKEN = 'blog-app-auth-token';

// Authentication Errors
export const SESSION_EXPIRED = {
  name: 'LoginSessionExpired',
  errorCode: 'A100',
  message: 'Login session expired. Please login again.',
};

export const UNAUTHENTICATED = {
  name: 'Unauthenticated',
  errorCode: 'A102',
  message: 'Forbidden access (unauthenticated).',
};

export const NO_AUTHORIZATION_HEADER = {
  name: 'NoAuthenticationHeader',
  errorCode: 'A103',
  message: '`Authorization` header not exist.',
};

// User Error
export const USER_NOT_FOUND = {
  name: 'UserNotFound',
  errorCode: 'U101',
  message: 'User not found.',
};

export const INVALID_CREDENTIIALS = {
  name: 'InvalidCredentials',
  errorCode: 'U102',
  message: 'Invalid credentials.',
};

export const INVALID_EMAIL = {
  name: 'InvalidEmail',
  errorCode: 'U103',
  message: 'Invalid email.',
};

export const INVALID_PASSWORD = {
  name: 'InvalidPassword',
  errorCode: 'U104',
  message: 'Invalid password, length less than 5.',
};

export const INVALID_USER_BIO = {
  name: 'InvalidUserBio',
  errorCode: 'U105',
  message: 'Invalid user bio. Can not be empty.',
};

// Post Error
export const POST_NOT_FOUND = {
  name: 'PostNotFound',
  errorCode: 'P101',
  message: 'Post not found.',
};

export const POST_NOT_OWNED_BY_USER = {
  name: 'PostNotOwnedByUser',
  errorCode: 'P102',
  message: 'Post not owned by this user.',
};

export const POST_CREATE_NO_TITLE_OR_CONTENT = {
  name: 'PostCreateNoTitleOrContent',
  errorCode: 'P103',
  message: 'You must provide title and content to create a post.',
};

export const POST_UPDATE_NO_TITLE_OR_CONTENT = {
  name: 'PostUpdateNoTitleOrContent',
  errorCode: 'P104',
  message: 'You must provide title and content to update a post.',
};

export const POST_ID_NOT_EXIST = {
  name: 'PostIdNotExist',
  errorCode: 'P105',
  message: 'Post ID not exist.',
};
