import { gql } from '@apollo/client';

export const GET_POST = gql`
  query Post($postId: Int!) {
    getPost(postId: $postId) {
      code
      success
      isAuthenticated
      post {
        author {
          name
        }
        title
        content
        updatedAt
      }
    }
  }
`;
