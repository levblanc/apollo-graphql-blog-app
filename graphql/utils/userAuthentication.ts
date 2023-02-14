import JWT, { Secret } from 'jsonwebtoken';

type JwtError = {
  name: string;
  message: string;
  expiredAt?: string;
};

const userAuthentication = (jwt: string): AuthResponse | null => {
  try {
    const signature: Secret = process.env.JWT_SIGNATURE!;
    const tokenInfo = JWT.verify(jwt, signature);
    console.log('>>>>>> tokenInfo in userAuthentication', tokenInfo);

    return {
      success: true,
      userId: tokenInfo.userId,
    };
  } catch (error: JwtError | any) {
    console.error('Error at `userAuthentication`:', JSON.stringify(error));

    return {
      success: false,
      error,
    };
  }
};

export default userAuthentication;
