import JWT, { Secret } from 'jsonwebtoken';

type JwtError = {
  name: string;
  message: string;
  expiredAt?: string;
};

const userAuthentication = (jwt: string): AuthResponse => {
  try {
    const signature: Secret = process.env.JWT_SIGNATURE!;
    const { userId } = JWT.verify(jwt, signature) as JWT.JwtPayload;

    return {
      success: true,
      userId,
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
