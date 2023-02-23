import { gql } from '@apollo/client';

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

export const POST_PUBLISH = gql`
  mutation PostPublish($postId: Int!) {
    postPublish(postId: $postId) {
      code
      error {
        name
        message
        errorCode
        code
      }
      post {
        author {
          id
          name
        }
        title
        content
        published
      }
    }
  }
`;

export const POST_UNPUBLISH = gql`
  mutation PostUnpublish($postId: Int!) {
    postUnpublish(postId: $postId) {
      code
      success
      error {
        name
        message
        errorCode
        code
      }
      post {
        author {
          id
          name
        }
        id
        title
        content
        published
      }
    }
  }
`;

export const POST_DELETE = gql`
  mutation PostDelete($postId: Int!) {
    postDelete(postId: $postId) {
      code
      success
      error {
        name
        message
        errorCode
        code
      }
      post {
        author {
          id
          name
        }
        id
        title
        content
        published
      }
    }
  }
`;
