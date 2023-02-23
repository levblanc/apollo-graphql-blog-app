import { gql } from '@apollo/client';

export const GET_POST_LIST = gql`
  query GetPostList {
    getPostList {
      code
      success
      error {
        name
        message
        errorCode
        code
      }
      message
      posts {
        author {
          name
        }
        id
        title
        content
        createdAt
        published
      }
    }
  }
`;
