import { gql } from '@apollo/client';

export const CREATE_NEW_POST = gql`
  mutation postCreate($post: PostInput) {
    postCreate(post: $post) {
      code
      message
      success
      error {
        name
        message
        errorCode
        code
      }
      post {
        id
        title
        content
        createdAt
        published
      }
    }
  }
`;
