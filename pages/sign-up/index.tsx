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
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import Error from '@/components/Error';
import { useRouter } from 'next/router';
import { TOKEN } from '@/utils/constants';

const SIGN_UP = gql`
  mutation Signup(
    $credentials: CredentialsInput!
    $bio: String!
    $name: String
  ) {
    signup(credentials: $credentials, bio: $bio, name: $name) {
      code
      message
      success
      token
      error {
        name
        message
        errorCode
        code
      }
    }
  }
`;

export default function SignUp() {
  const router = useRouter();
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP);

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
      if (data.signup.token) {
        localStorage.setItem(TOKEN, data.signup.token);
        router.push('/posts');
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
        {data?.signup?.error && <Error message={data.signup.error.message} />}

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

          <Button
            fullWidth
            mt="xl"
            size="md"
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
