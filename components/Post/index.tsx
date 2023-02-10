import { Card, Text, Group } from '@mantine/core';
import useStyles from './styles';

export default function Post({ id, title, content, createdAt, author }: Post) {
  const { classes } = useStyles();

  return (
    <Card
      key={id}
      px="md"
      radius="sm"
      withBorder
      component="a"
      href="#"
      className={classes.card}
    >
      <Text weight={800} fz={22} mb="xs" color="blue">
        {title}
      </Text>
      <Group position="apart" mb="xs">
        <Text color="dimmed" size="sm" italic>
          By {author.name}
        </Text>
        <Text color="dimmed" size="sm" italic>
          Created At {createdAt}
        </Text>
      </Group>
      <Text>{content}</Text>
    </Card>
  );
}
