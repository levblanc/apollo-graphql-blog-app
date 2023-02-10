import Post from '@/components/Post';
import { gql, useQuery } from '@apollo/client';
import {
  Container,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

const GET_POSTS = gql`
  query {
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
  console.log(data);

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
        data.posts.data.map((post: Post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            author={post.author}
          />
        ))
      )}
    </Container>
  );
}
