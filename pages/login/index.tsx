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
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import emailValidator from '@/utils/emailValidator';
import Error from '@/components/Error';
import { useRouter } from 'next/router';
import { TOKEN } from '@/utils/constants';

const SIGN_IN = gql`
  mutation Signin($credentials: CredentialsInput!) {
    signin(credentials: $credentials) {
      token
      code
      success
      error {
        name
        message
        errorCode
        code
      }
    }
  }
`;

export default function SignIn() {
  const router = useRouter();
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
        localStorage.setItem(TOKEN, data.signin.token);
        router.push('/posts');
      }
    }
  }, [data]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Container size={500} my={40}>
        {error && <Error message={error.message} />}
        {data?.signin?.error && <Error message={data.signin.error.message} />}
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

          <Button
            fullWidth
            mt="xl"
            size="md"
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
