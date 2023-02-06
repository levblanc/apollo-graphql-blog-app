import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
} from '@mantine/core';

export default function SignUp() {
  return (
    <Container size="md" my={40} sx={{ minWidth: '380px' }}>
      <Title
        order={2}
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
        mb={30}
      >
        Welcome to Blog App!
      </Title>

      <Paper withBorder radius="md" p={20}>
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
          Sign Up
        </Button>
      </Paper>
    </Container>
  );
}
