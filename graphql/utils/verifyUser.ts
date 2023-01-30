import JWT from 'jsonwebtoken';

const verifyUser = (jwt: string) => {
  try {
    const tokenInfo = JWT.verify(jwt, process.env.JWT_SIGNATURE);
    return tokenInfo.userId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default verifyUser;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImVtYWlsIjoibmFtZTNAYmxvZy1hcHAuY29tIiwiaWF0IjoxNjc1MDQ1NzA2LCJleHAiOjE2NzUwODE3MDZ9.S6ndT1tcsMCsJIBeEu0muUKVtYLyXJSY-Zm_W2QkFHk
