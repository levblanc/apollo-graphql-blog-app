import Error from '@/components/Error';
import { useMutation } from '@apollo/client';
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
import { CREATE_NEW_POST } from './gql';

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
        router.back();
      }
    }
  }, [data]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container>
        {error && <Error message={error.message} />}

        {data?.postCreate?.error && (
          <Error
            code={data.postCreate.error.errorCode || data.postCreate.error.code}
            message={data.postCreate.error.message}
          />
        )}

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
