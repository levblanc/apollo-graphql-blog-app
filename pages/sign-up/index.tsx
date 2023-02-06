import {
  Anchor,
  Container,
  Button,
  Paper,
  Title,
  Text,
  TextInput,
  Textarea,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import emailValidator from '@/utils/emailValidator';

export default function SignUp() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      bio: '',
    },

    validate: {
      email: emailValidator,
      password: (value) => (value ? null : 'Password is required'),
    },
  });

  const handleSubmit = (values: typeof form.values) => console.log(values);
  const handleError = (errors: typeof form.errors) => console.log(errors);

  return (
    <Container size="md" my={40} sx={{ minWidth: '380px' }}>
      <Title
        order={2}
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome to Blog App!
      </Title>

      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor<'a'> href="/login" size="sm">
          Log In
        </Anchor>
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
        <Paper withBorder shadow="md" p={20} mt={30} radius="md">
          <TextInput
            label="Email address"
            placeholder="you@gmail.com"
            size="md"
            required
            {...form.getInputProps('email')}
          />

          <TextInput
            label="Username"
            placeholder="Input your username"
            size="md"
            mt="md"
            {...form.getInputProps('name')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            size="md"
            mt="md"
            required
            {...form.getInputProps('password')}
          />

          <Textarea
            label="Bio"
            placeholder="Introduce yourself"
            autosize
            minRows={2}
            mt="md"
            {...form.getInputProps('bio')}
          />

          <Button fullWidth mt="xl" size="md" type="submit">
            Sign Up
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
