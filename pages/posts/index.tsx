import Post from '@/components/Post';
import Error from '@/components/Error';
import { useQuery } from '@apollo/client';
import { Container, Divider, Loader, Text, Title } from '@mantine/core';
import { useEffect } from 'react';
import { GET_POST_LIST } from '@/gqlQuery/getPostList';

export default function Posts() {
  const { data, error, loading, refetch } = useQuery(GET_POST_LIST);
  const posts = data?.getPostList?.posts;

  useEffect(() => {
    refetch();
  });

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : data?.getPostList?.error ? (
        <Error
          code={data.getPostList.error.errorCode || data.getPostList.error.code}
          message={data.getPostList.error.message}
        />
      ) : (
        <>
          <Title order={1} color="gray.7" size={60} mb="md">
            Latest
          </Title>
          <Text color="dimmed" mb="xl">
            A blog created with Next.js (Typescript), Apollo GraphQL Server,
            Prisma, Nexus, PostgreSQL and Mantine UI
          </Text>

          <Divider mb="xl" />

          {posts && !!posts.length ? (
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
          ) : (
            <Text align="center" color="dimmed">
              No posts created yet.
            </Text>
          )}
        </>
      )}
    </Container>
  );
}
