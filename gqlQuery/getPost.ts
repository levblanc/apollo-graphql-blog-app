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

export const POST_UPDATE = gql`
  mutation PostUpdate($postId: Int!, $post: PostInput) {
    postUpdate(postId: $postId, post: $post) {
      code
      success
      error {
        code
        errorCode
        message
        name
      }
    }
  }
`;
