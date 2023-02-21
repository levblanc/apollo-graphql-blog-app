import Post from '@/components/Post';
import Error from '@/components/Error';
import { useQuery } from '@apollo/client';
import { Container, Loader } from '@mantine/core';
import { useEffect } from 'react';
import { GET_POSTS } from './gql';

export default function Posts() {
  const { data, error, loading, refetch } = useQuery(GET_POSTS);
  const posts = data?.getPosts?.posts;

  useEffect(() => {
    refetch();
  });

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
