import { Card, Text, Group } from '@mantine/core';
import useStyles from './styles';

export default function Post({
  id,
  title,
  content,
  createdAt,
  authorName,
}: PostAttr) {
  const { classes } = useStyles();

  const dateFormatter = (date: string): string => {
    return `${new Date(Number(date))}`.split(' ').splice(1, 4).join(' ');
  };

  return (
    <Card
      key={id}
      px="md"
      radius="md"
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
