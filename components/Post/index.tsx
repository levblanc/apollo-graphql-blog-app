import { gql, useMutation } from '@apollo/client';
import { Card, Text, Group, Button, Box } from '@mantine/core';
import Error from '@/components/Error';
import { useState } from 'react';

const POST_PUBLISH = gql`
  mutation PostPublish($postId: Int!) {
    postPublish(postId: $postId) {
      code
      error {
        name
        message
        errorCode
        code
      }
      success
      post {
        author {
          id
          name
        }
        title
        content
        published
      }
    }
  }
`;

const POST_UNPUBLISH = gql`
  mutation PostUnpublish($postId: Int!) {
    postUnpublish(postId: $postId) {
      code
      post {
        author {
          id
          name
        }
        id
        title
        content
        published
      }
    }
  }
`;

export default function Post({
  id,
  title,
  content,
  createdAt,
  authorName,
  published,
  isMyProfile,
}: PostAttr) {
  const dateFormatter = (date: string): string => {
    return `${new Date(Number(date))}`.split(' ').splice(1, 4).join(' ');
  };

  const [
    postPublish,
    { data: publishData, loading: publishLoading, error: publishError },
  ] = useMutation(POST_PUBLISH);
  const [
    postUnpublish,
    { data: unpublishData, loading: unpublishLoading, error: unpublishError },
  ] = useMutation(POST_UNPUBLISH);

  const [isPublished, setIsPublished] = useState(published);

  const handlePublish = async (postId: number) => {
    await postPublish({
      variables: { postId },
    });

    setIsPublished(true);
  };

  const handleUnpublish = async (postId: number) => {
    await postUnpublish({
      variables: { postId },
    });

    setIsPublished(false);
  };

  return (
    <Box>
      <Card key={id} withBorder px="md" radius="md" mb="md">
        <Group position="apart" mb="md">
          <Text weight={800} fz={22} color="blue">
            {title}
          </Text>
          {isMyProfile && isPublished && (
            <Button
              color="red"
              onClick={() => handleUnpublish(Number(id))}
              loading={unpublishLoading}
            >
              Unpublish
            </Button>
          )}
          {isMyProfile && !isPublished && (
            <Button
              onClick={() => handlePublish(Number(id))}
              loading={publishLoading}
            >
              Publish
            </Button>
          )}
        </Group>
        <Group position="apart" mb="xs">
          <Text color="dimmed" size="sm" italic>
            By {authorName}
          </Text>
          <Text color="dimmed" size="sm" italic>
            Created At {dateFormatter(createdAt)}
          </Text>
        </Group>
        <Text>{content}</Text>
      </Card>

      {publishError && <Error message={publishError.message} />}

      {publishData?.postPublish.error && (
        <Error
          code={
            publishData.postPublish.error.errorCode ||
            publishData.postPublish.error.code
          }
          message={publishData.postPublish.error.message}
        />
      )}

      {unpublishError && <Error message={unpublishError.message} />}

      {unpublishData?.postUnpublish.error && (
        <Error
          code={
            unpublishData.postPublish.error.errorCode ||
            unpublishData.postPublish.error.code
          }
          message={unpublishData.postUnpublish.error.message}
        />
      )}
    </Box>
  );
}
