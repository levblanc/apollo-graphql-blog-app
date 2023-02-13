import Error from '@/components/Error';
import { gql, useMutation } from '@apollo/client';
import {
  Container,
  Button,
  Title,
  TextInput,
  Textarea,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CREATE_NEW_POST = gql`
  mutation postCreate($post: PostInput) {
    postCreate(post: $post) {
      code
      message
      success
      error {
        name
        message
        errorCode
        code
      }
      data {
        id
        title
        content
        createdAt
        published
      }
    }
  }
`;

export default function Write() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: '',
      content: '',
    },

    validate: {
      title: (value) => (value ? null : 'Title can not be empty'),
      content: (value) => (value ? null : 'Content can not be empty'),
    },
  });

  const [createNewPost, { data, loading, error }] =
    useMutation(CREATE_NEW_POST);

  const handleSubmit = async (values: typeof form.values) => {
    await createNewPost({
      variables: {
        post: values,
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.postCreate.success) {
        router.push('/posts');
      }
    }
  }, [data]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container>
        {data?.postCreate?.error && (
          <Error message={data.postCreate.error.message} />
        )}

        {error && <Error message={error.message} />}

        <Title
          order={2}
          align="center"
          mb={20}
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Create New Post
        </Title>
        <TextInput
          label="Title"
          placeholder="Your post title"
          size="lg"
          required
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Content"
          placeholder="Your post content"
          size="lg"
          mt="md"
          minRows={15}
          required
          {...form.getInputProps('content')}
        />

        <Group position="right" mt={20}>
          <Button
            mt="md"
            size="md"
            variant="default"
            type="button"
            onClick={() => router.back()}
          >
            Discard
          </Button>
          <Button
            mt="md"
            size="md"
            type="submit"
            disabled={!form.isValid()}
            loading={loading}
          >
            Add Post
          </Button>
        </Group>
      </Container>
    </form>
  );
}
