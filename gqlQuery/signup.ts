import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation Signup(
    $credentials: CredentialsInput!
    $bio: String!
    $name: String
  ) {
    signup(credentials: $credentials, bio: $bio, name: $name) {
      code
      message
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
