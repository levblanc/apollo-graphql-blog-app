import { Container, SimpleGrid } from '@mantine/core';

export default function Posts() {
  const cards = [<></>];

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
