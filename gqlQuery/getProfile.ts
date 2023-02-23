import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query Profile($userId: Int!) {
    getProfile(userId: $userId) {
      code
      success
      error {
        name
        message
        errorCode
        code
      }
      profile {
        bio
        isMyProfile
        user {
          id
          name
          email
          posts {
            id
            title
            content
            createdAt
            published
          }
        }
      }
    }
  }
`;
