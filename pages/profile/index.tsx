import { Box, Button, Container, Group, Title, Text } from '@mantine/core';

export default function Profile() {
  const profile = {
    user: { name: 'Test Profile', posts: [] },
    bio: 'Awesome person!',
    isMyProfile: true,
  };

  return (
    <Container>
      <Group position="apart">
        <Box>
          <Title order={2} mr={10}>
            {profile.user.name}
          </Title>
          <Text>{profile.bio}</Text>
        </Box>
        {profile.isMyProfile ? <Button>Create New Post</Button> : null}
      </Group>
      {/* <div>
        {profile.user.posts.map((post) => {
          return (
            <Post
              title={post.title}
              content={post.content}
              date={post.createdAt}
              user={profile.user.name}
              published={post.published}
              isMyProfile={profile.isMyProfile}
              id={post.id}
            />
          );
        })}
      </div> */}
    </Container>
  );
}
