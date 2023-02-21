import Error from '@/components/Error';
import dateFormatter from '@/utils/dateFormatter';
import { useQuery } from '@apollo/client';
import { Container, Divider, Group, Title, Text, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { GET_POST } from '../gql';

export default function ViewPost() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = useQuery(GET_POST, {
    variables: {
      postId: Number(id),
    },
  });

  const post = data?.getPost?.post;

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : data?.getPost?.error ? (
        <Error
          code={data.getPost.error.errorCode || data.getPost.error.code}
          message={data.getPost.error.message}
        />
      ) : (
        post && (
          <>
            <Title color="blue" align="center">
              {post.title}
            </Title>
            <Divider mt="md" mb="md" />
            <Group position="apart" mb="lg">
              <Text color="dimmed" size="sm" italic>
                By {post.author.name}
              </Text>
              <Text color="dimmed" size="sm" italic>
                Last Updated At {dateFormatter(post.updatedAt)}
              </Text>
            </Group>
            <Text>{post.content}</Text>
          </>
        )
      )}
    </Container>
  );
}
