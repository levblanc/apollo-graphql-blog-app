import { ActionIcon, Group, Text } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconHeartFilled,
  IconMail,
} from '@tabler/icons-react';
import useStyles from './styles';

export default function AppFooter() {
  const { classes } = useStyles();

  const footerLinks = [
    {
      href: 'mailto://levblanc@gmail.com',
      icon: <IconMail />,
    },
    {
      href: 'https://github.com/levblanc',
      icon: <IconBrandGithub />,
    },
    {
      href: 'https://twitter.com/levblanc',
      icon: <IconBrandTwitter />,
    },
  ];

  return (
    <footer className={classes.footer}>
      <Group position="center" mb="sm">
        {footerLinks.map(({ href, icon }, index) => (
          <ActionIcon
            key={index}
            variant="filled"
            radius="lg"
            size="lg"
            component="a"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            {icon}
          </ActionIcon>
        ))}
      </Group>
      <Group position="center">
        <Text color="dimmed">Built with</Text>
        <Text color="dimmed" ml={-6} mt={4}>
          <IconHeartFilled size={16} />
        </Text>
        <Text color="dimmed"> • </Text>
        <Text color="dimmed">
          by
          <Text
            className={classes.builder}
            component="a"
            href="https://github.com/levblanc"
            target="_blank"
            rel="noreferrer"
          >
            @levblanc
          </Text>
        </Text>
        <Text color="dimmed"> • </Text>
        <Text color="dimmed">@2023</Text>
      </Group>
    </footer>
  );
}
