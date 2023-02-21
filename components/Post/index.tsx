import { gql, useMutation } from '@apollo/client';
import {
  Paper,
  Text,
  Group,
  Button,
  Box,
  Divider,
  Title,
  Modal,
} from '@mantine/core';
import Error from '@/components/Error';
import { useState } from 'react';
import { useRouter } from 'next/router';
import dateFormatter from '@/utils/dateFormatter';
import { POST_PUBLISH, POST_UNPUBLISH, POST_DELETE } from './gql';
import {
  IconEyeFilled,
  IconEyeOff,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';

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
  const [deletePostConfirmationOpened, setDeletePostConfirmationOpened] =
    useState(false);
  const [_deletePostResultOpened, setDeletePostResultOpened] = useState(false);

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

    setDeletePostConfirmationOpened(false);
  };

  const handleDeleteConfirmationClose = () => {
    setDeletePostResultOpened(false);
    router.reload();
  };

  return (
    <Box mx="auto">
      <Modal
        opened={deletePostConfirmationOpened}
        onClose={() => setDeletePostConfirmationOpened(false)}
        title="Post Delete Confirmation"
        centered
      >
        <Text mt="xl" mb="xl">
          {`Are you sure to delete post '${title}'?`}{' '}
        </Text>
        <Divider mt="md" mb="md" />
        <Group position="right">
          <Button
            color="cyan.4"
            variant="outline"
            onClick={() => setDeletePostConfirmationOpened(false)}
          >
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDelete(Number(id))}>
            Delete
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={deleteData?.postDelete?.success}
        onClose={() => setDeletePostResultOpened(false)}
        centered
        title="Post Deleted"
      >
        <Text mt="xl" mb="xl">
          {`Post '${title}' delete successfully.`}{' '}
        </Text>
        <Divider mt="md" mb="md" />
        <Group position="right">
          <Button
            color="cyan.4"
            onClick={() => handleDeleteConfirmationClose()}
          >
            OK
          </Button>
        </Group>
      </Modal>

      <Paper mb="lg" p="xl" shadow="sm">
        <Title
          order={2}
          color="cyan.4"
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
            Created At: {dateFormatter(createdAt)}
          </Text>
        </Group>
        <Text>{content}</Text>
        {showActionButtons && (
          <>
            <Divider mt="xl" mb="md" />
            <Group position="right">
              <Button
                color="teal"
                leftIcon={<IconPencil size={16} />}
                onClick={() => handleEdit(Number(id))}
              >
                Edit
              </Button>
              {isMyProfile && isPublished && (
                <Button
                  color="yellow"
                  leftIcon={<IconEyeOff size={16} />}
                  onClick={() => handleUnpublish(Number(id))}
                  loading={unpublishLoading}
                >
                  Unpublish
                </Button>
              )}
              {isMyProfile && !isPublished && (
                <Button
                  leftIcon={<IconEyeFilled size={16} />}
                  onClick={() => handlePublish(Number(id))}
                  loading={publishLoading}
                >
                  Publish
                </Button>
              )}
              <Button
                color="red"
                leftIcon={<IconTrash size={16} />}
                onClick={() => setDeletePostConfirmationOpened(true)}
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
