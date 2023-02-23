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
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import emailValidator from '@/utils/emailValidator';
import Error from '@/components/Error';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { SIGN_IN } from './gql';

export default function SignIn() {
  const router = useRouter();
  const { updateAuthStatus } = useAuth();

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

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN);

  const handleSubmit = async (credentials: typeof form.values) => {
    await signIn({
      variables: { credentials },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.signin.token) {
        updateAuthStatus({
          userId: data.signin.user.id,
          username: data.signin.user.name,
          email: data.signin.user.email,
          token: data.signin.token,
        });

        let path = '/posts';

        if (router.query.redirect) {
          path = router.query.redirect as string;
        }

        router.push(path);
      }
    }
  }, [data]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container size={500} my={40}>
        {error && <Error message={error.message} />}

        {data?.signin?.error && (
          <Error
            code={data.signin.error.errorCode || data.signin.error.code}
            message={data.signin.error.message}
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
          Welcome back to {'{ Blogify }'} !
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor<'a'> href="/sign-up" size="sm" color="cyan.4">
            Create account
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

          <PasswordInput
            label="Password"
            placeholder="Your password"
            size="md"
            mt="md"
            required
            {...form.getInputProps('password')}
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
            Log In
          </Button>
        </Paper>
      </Container>
    </form>
  );
}
