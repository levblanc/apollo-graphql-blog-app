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
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import Error from '@/components/Error';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { SIGN_UP } from '@/pages/api/signUp';

export default function SignUp() {
  const router = useRouter();
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);
  const { updateAuthStatus } = useAuth();

  const handleSubmit = async (values: typeof form.values) => {
    const { email, password, bio, name } = values;

    await signUp({
      variables: {
        credentials: { email, password },
        name,
        bio,
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.signUp.token) {
        updateAuthStatus({
          userId: data.signUp.user.id,
          username: data.signUp.user.name,
          email: data.signUp.user.email,
          token: data.signUp.token,
        });

        let path = '/posts';

        if (router.query.redirect) {
          path = router.query.redirect as string;
        }

        router.push(path);
      }
    }
  }, [data]);

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

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container size={500} my={40}>
        {error && <Error message={error.message} />}

        {data?.signUp?.error && (
          <Error
            code={data.signUp.error.errorCode || data.signUp.error.code}
            message={data.signUp.error.message}
          />
        )}

        <Title
          order={2}
          align="center"
          color="cyan.4"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome to {'{ Blogify }'} !
        </Title>

        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor<'a'> href="/login" size="sm" color="cyan.4">
            Log In
          </Anchor>
        </Text>

        <Paper shadow="md" p={20} mt={30} radius="sm">
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

          <Button
            fullWidth
            mt="xl"
            size="md"
            color="cyan.4"
            type="submit"
            loading={loading}
            disabled={!form.isValid()}
          >
            Sign Up
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
