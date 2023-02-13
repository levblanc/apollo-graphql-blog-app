import { Card, Text, Group, Button } from '@mantine/core';

export default function Post({
  id,
  title,
  content,
  createdAt,
  authorName,
  published,
  isMyProfile,
}: PostAttr) {
  const dateFormatter = (date: string): string => {
    return `${new Date(Number(date))}`.split(' ').splice(1, 4).join(' ');
  };

  return (
    <Card key={id} withBorder px="md" radius="md" mb="md">
      <Group position="apart" mb="md">
        <Text weight={800} fz={22} color="blue">
          {title}
        </Text>
        {isMyProfile && published && <Button>Unpublish</Button>}
        {isMyProfile && !published && <Button>Publish</Button>}
      </Group>
      <Group position="apart" mb="xs">
        <Text color="dimmed" size="sm" italic>
          By {authorName}
        </Text>
        <Text color="dimmed" size="sm" italic>
          Created At {dateFormatter(createdAt)}
        </Text>
      </Group>
      <Text>{content}</Text>
    </Card>
  );
}
