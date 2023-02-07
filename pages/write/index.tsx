import {
  Container,
  Button,
  Title,
  TextInput,
  Textarea,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function Write() {
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

  const handleSubmit = (values: typeof form.values) => console.log(values);
  const handleError = (errors: typeof form.errors) => console.log(errors);

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Container>
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
          <Button mt="md" size="md" variant="default" type="button">
            Discard
          </Button>
          <Button mt="md" size="md" type="submit">
            Add Post
          </Button>
        </Group>
      </Container>
    </form>
  );
}
