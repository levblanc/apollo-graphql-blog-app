import { Paper, Text, Title } from '@mantine/core';

export default function Error({ message }: { message: string }) {
  return (
    <Paper withBorder shadow="md" p="md" radius="md" mb="md">
      <Title order={4} color="red">
        ERROR:
      </Title>
      <Text fz="lg" c="red">
        {message}
      </Text>
    </Paper>
  );
}
