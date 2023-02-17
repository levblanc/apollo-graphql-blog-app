import { Alert } from '@mantine/core';

export default function Error({
  code,
  message,
}: {
  code?: string;
  message: string;
}) {
  return (
    <Alert title="ERROR" color="red" mb="md">
      {message} {code && `(${code})`}
    </Alert>
  );
}
