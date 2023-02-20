import { gql, useMutation } from '@apollo/client';
import { Paper, Text, Group, Button, Box, Divider, Title } from '@mantine/core';
import Error from '@/components/Error';
import { useState } from 'react';
import { useRouter } from 'next/router';
import dateFormatter from '@/utils/dateFormatter';

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

const POST_DELETE = gql`
  mutation PostDelete($postId: Int!) {
    postDelete(postId: $postId) {
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
  showActionButtons = false,
}: PostAttr) {
  const router = useRouter();

  const [
    postPublish,
    { data: publishData, loading: publishLoading, error: publishError },
  ] = useMutation(POST_PUBLISH);

  const [
    postUnpublish,
    { data: unpublishData, loading: unpublishLoading, error: unpublishError },
  ] = useMutation(POST_UNPUBLISH);

  const [
    postDelete,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation(POST_DELETE);

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

  const handleEdit = (postId: number) => {
    const type = isMyProfile ? 'edit' : 'view';
    const path = `/post/${type}/${postId}`;

    router.push(path);
  };

  const handleDelete = async (postId: number) => {
    await postDelete({
      variables: { postId },
    });
  };

  return (
    <Box mx="auto">
      <Paper mb="md" p="md" withBorder radius="md" shadow="md">
        <Title
          order={2}
          color="blue"
          mb="sm"
          sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }}
          onClick={() => handleEdit(Number(id))}
        >
          {title}
        </Title>
        <Group position="apart" mb="xs">
          <Text color="dimmed" size="sm" italic>
            By {authorName}
          </Text>
          <Text color="dimmed" size="sm" italic>
            Created At {dateFormatter(createdAt)}
          </Text>
        </Group>
        <Text>{content}</Text>
        {showActionButtons && (
          <>
            <Divider mt="lg" mb="md" />
            <Group position="right">
              <Button color="teal" onClick={() => handleEdit(Number(id))}>
                Edit
              </Button>
              {isMyProfile && isPublished && (
                <Button
                  color="yellow"
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
              <Button
                color="red"
                onClick={() => handleDelete(Number(id))}
                loading={deleteLoading}
              >
                Delete
              </Button>
            </Group>
          </>
        )}
      </Paper>

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
