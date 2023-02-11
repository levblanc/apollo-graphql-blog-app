import Post from '@/components/Post';
import { gql, useQuery } from '@apollo/client';
import { Container, Loader, Paper, Text, Title } from '@mantine/core';

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

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Paper withBorder shadow="md" p="md" radius="md">
          <Title order={4} color="red">
            ERROR:
          </Title>
          <Text fz="lg" c="red">
            {error.message}
          </Text>
        </Paper>
      ) : (
        data &&
        data.posts &&
        data.posts.data &&
        data.posts.data.length &&
        data.posts.data.map((post: PostData) => (
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
