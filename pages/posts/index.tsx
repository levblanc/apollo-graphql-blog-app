import Post from '@/components/Post';
import Error from '@/components/Error';
import { gql, useQuery } from '@apollo/client';
import { Container, Loader } from '@mantine/core';

const GET_POSTS = gql`
  query Posts {
    posts {
      code
      success
      error {
        name
        message
        errorCode
        code
      }
      message
      data {
        author {
          name
        }
        title
        content
        createdAt
      }
    }
  }
`;

export default function Posts() {
  const { data, error, loading } = useQuery(GET_POSTS);
  const posts = data && data.posts && data.posts.data;

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : (
        posts &&
        posts.length &&
        posts.map((post: PostData) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            authorName={post.author.name!}
          />
        ))
      )}
    </Container>
  );
}
