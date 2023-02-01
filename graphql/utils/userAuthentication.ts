import JWT, { Secret } from 'jsonwebtoken';

const userAuthentication = (jwt: string): string | null => {
  try {
    const signature: Secret = process.env.JWT_SIGNATURE!;
    const tokenInfo = JWT.verify(jwt, signature) as { userId: string };

    return tokenInfo.userId;
  } catch (error) {
    console.error('Error at `userAuthentication`:', error);
    return null;
  }
};

export default userAuthentication;
