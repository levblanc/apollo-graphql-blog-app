import {
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from '@mantine/core';
import useStyles from './styles';

export default function Post({ post }) {
  const { classes } = useStyles();

  return (
    <Card
      key={post.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={post.image} alt="post image" />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {post.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {post.title}
      </Text>
    </Card>
  );
}
