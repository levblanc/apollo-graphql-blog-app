import { Box, Button, Title } from '@mantine/core';

export default function Profile() {
  const profile = {
    user: { name: '', posts: [] },
    bio: '',
    isMyProfile: false,
  };

  return (
    <Box>
      <Box
        sx={{
          marginBottom: '2rem',
          display: 'flex ',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Title order={2}>{profile.user.name}</Title>
          <p>{profile.bio}</p>
        </Box>
        <div>
          {profile.isMyProfile ? <Button>Create New Post</Button> : null}
        </div>
      </Box>
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
    </Box>
  );
}
