import {
  Anchor,
  Container,
  Button,
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import emailValidator from '@/utils/emailValidator';

export default function SignIn() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: emailValidator,
      password: (value) => (value ? null : 'Password is required'),
    },
  });

  const handleSubmit = (values: typeof form.values) => console.log(values);
  const handleError = (errors: typeof form.errors) => console.log(errors);

  return (
    <form onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Container size={500} my={40}>
        <Title
          order={2}
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back to Blog App!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor<'a'> href="/sign-up" size="sm">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={20} mt={30} radius="md">
          <TextInput
            label="Email address"
            placeholder="you@gmail.com"
            size="md"
            required
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            size="md"
            mt="md"
            required
            {...form.getInputProps('password')}
          />

          <Button fullWidth mt="xl" size="md" type="submit">
            Log In
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
