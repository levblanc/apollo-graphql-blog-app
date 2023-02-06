import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from '@mantine/core';

export default function SignIn() {
  return (
    <Container size="md" my={40}>
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
        <Anchor<'a'>
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={20} mt={30} radius="md">
        <TextInput
          label="Email address"
          placeholder="you@gmail.com"
          size="md"
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          required
        />

        <Button fullWidth mt="xl" size="md">
          Log In
        </Button>
      </Paper>
    </Container>
  );
}
