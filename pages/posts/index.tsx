import Post from '@/components/Post';
import Error from '@/components/Error';
import { gql, useQuery } from '@apollo/client';
import { Container, Loader } from '@mantine/core';

const GET_POSTS = gql`
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

export default function Posts() {
  const { data, error, loading } = useQuery(GET_POSTS);
  const posts = data?.getPosts?.posts;

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : data?.getPosts?.error ? (
        <Error
          code={data.getPosts.error.errorCode || data.getPosts.error.code}
          message={data.getPosts.error.message}
        />
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
            published={post.published}
          />
        ))
      )}
    </Container>
  );
}
