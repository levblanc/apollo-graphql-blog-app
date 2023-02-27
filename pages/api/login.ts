import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation Login($credentials: CredentialsInput!) {
    login(credentials: $credentials) {
      code
      success
      token
      user {
        id
        name
        email
      }
      error {
        name
        message
        errorCode
        code
      }
    }
  }
`;
