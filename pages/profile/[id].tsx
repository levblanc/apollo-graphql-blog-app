import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Group,
  Title,
  Text,
  Loader,
  Divider,
} from '@mantine/core';
import Error from '@/components/Error';
import Post from '@/components/Post';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { GET_PROFILE } from './gql';
import { IconFileDescription } from '@tabler/icons-react';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  const { updateAuthStatus, clearAuthStatus } = useAuth();
  const { data, error, loading } = useQuery(GET_PROFILE, {
    variables: {
      userId: Number(id),
    },
    fetchPolicy: 'network-only',
  });

  const profile = data?.getProfile?.profile;

  useEffect(() => {
    if (profile) {
      if (profile.isMyProfile) {
        const { id, name, email } = profile.user;
        updateAuthStatus({ userId: id, username: name, email });
      } else {
        clearAuthStatus();
      }
    }
  }, [profile]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : data?.getProfile?.error ? (
        <Error
          code={data.getProfile.error.errorCode || data.getProfile.error.code}
          message={data.getProfile.error.message}
        />
      ) : (
        profile && (
          <>
            <Group position="apart">
              <Box mb="sm" p="md">
                <Title order={2} mb="sm" color="gray.8">
                  {profile.user.name}
                </Title>
                <Text color="dimmed">{profile.bio}</Text>
              </Box>
              {profile.isMyProfile ? (
                <Button
                  color="cyan.4"
                  leftIcon={<IconFileDescription size={16} />}
                  onClick={() => router.push('/write')}
                >
                  Create New Post
                </Button>
              ) : null}
            </Group>

            <Divider mb="md" />

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
                  showActionButtons
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
