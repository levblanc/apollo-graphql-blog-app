import { Alert } from '@mantine/core';

export default function Error({ message }: { message: string }) {
  return (
    <Alert title="ERROR" color="red" mb="md">
      {message}
    </Alert>
  );
}
