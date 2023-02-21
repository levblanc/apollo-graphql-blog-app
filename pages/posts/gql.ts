import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
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
