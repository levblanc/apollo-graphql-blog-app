import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Group,
  Title,
  Text,
  Loader,
} from '@mantine/core';
import Error from '@/components/Error';
import Post from '@/components/Post';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';

const GET_PROFILE = gql`
  query Profile($userId: Int!) {
    getProfile(userId: $userId) {
      code
      success
      error {
        name
        message
        errorCode
        code
      }
      profile {
        bio
        isMyProfile
        user {
          id
          name
          posts {
            id
            title
            content
            createdAt
            published
          }
        }
      }
    }
  }
`;

export default function Profile() {
  const router = useRouter();
  const { updateAuthStatus } = useAuth();
  const { id } = router.query;

  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: Number(id),
    },
  });

  const profile = data && data.getProfile && data.getProfile.profile;

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : (
        profile && (
          <>
            <Group
              position="apart"
              mb="md"
              sx={{ borderBottom: '1px solid grey' }}
            >
              <Box mb="sm" p="md">
                <Title order={2} mb="sm">
                  {profile.user.name}
                </Title>
                <Text color="dimmed">{profile.bio}</Text>
              </Box>
              {profile.isMyProfile ? (
                <Button onClick={() => router.push('/write')}>
                  Create New Post
                </Button>
              ) : null}
            </Group>
            {profile.user.posts && !!profile.user.posts.length ? (
              profile.user.posts.map((post: PostData) => (
                <Post
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  createdAt={post.createdAt}
                  authorName={profile.user.name}
                  published={post.published}
                  isMyProfile={profile.isMyProfile}
                />
              ))
            ) : (
              <Text align="center" color="dimmed">
                No posts created yet.
              </Text>
            )}
          </>
        )
      )}
    </Container>
  );
}
