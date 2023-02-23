import {
  Avatar,
  UnstyledButton,
  Menu,
  Header,
  Title,
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  Text,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useStyles from './styles';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export default function AppHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const darkScheme = colorScheme === 'dark';
  const { userId, username, email, clearAuthStatus, isAuthenticated } =
    useAuth();
  const router = useRouter();

  const pathRedirect = (action: string): void => {
    let encodedPath = encodeURIComponent(router.asPath);

    if (router.query.redirect) {
      const basePath = router.asPath.split('?')[0];
      encodedPath = encodeURIComponent(basePath);

      if (basePath === '/sign-up' || basePath === '/login') {
        encodedPath = encodeURIComponent(router.query.redirect as string);
      }
    }

    let path = '/posts';
    let query = `?redirect=${encodedPath}`;

    if (router.asPath === '/sign-up' || router.asPath === '/login') {
      query = '';
    }

    switch (action) {
      case 'login':
        path = `/login${query}`;
        break;
      case 'signup':
        path = `/sign-up${query}`;
        break;
      default:
        console.error('ERROR: Unknown action in `pathRedirect` function');
        break;
    }

    router.push(path);
  };

  const goToProfile = (userId: string): void => {
    router.push(`/profile/${userId}`);
  };

  const logout = () => {
    clearAuthStatus();

    const loginPath = `/login?redirect=${encodeURIComponent(router.asPath)}`;
    router.push(loginPath);
  };

  return (
    <Box mb={50}>
      <Header height={90} p="lg">
        <Group position="apart">
          <Title
            order={1}
            color="cyan.5"
            italic
            sx={{
              '&:hover': { cursor: 'pointer' },
            }}
            onClick={() => router.push('/')}
          >
            {'{ Blogify }'}
          </Title>

          <Group position="right">
            {isAuthenticated ? (
              <Box className={classes.hiddenMobile}>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <UnstyledButton>
                      <Group>
                        <Avatar size={40} color="cyan.4">
                          {username.slice(0, 1).toUpperCase()}
                        </Avatar>
                        <div>
                          <Text>{username}</Text>
                          <Text size="xs" color="dimmed">
                            {email}
                          </Text>
                        </div>
                      </Group>
                    </UnstyledButton>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item onClick={() => goToProfile(userId)}>
                      Profile
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item color="red" onClick={logout}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Box>
            ) : (
              <Group className={classes.hiddenMobile}>
                <Button
                  component="a"
                  variant="default"
                  onClick={() => pathRedirect('login')}
                >
                  Log in
                </Button>
                <Button
                  component="a"
                  color="cyan.4"
                  onClick={() => pathRedirect('signup')}
                >
                  Sign up
                </Button>
              </Group>
            )}
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
            <ActionIcon
              color={darkScheme ? 'dark' : 'cyan.4'}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {darkScheme ? <IconSun size={22} /> : <IconMoonStars size={22} />}
            </ActionIcon>
          </Group>
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        {isAuthenticated ? (
          <Menu>
            <Group>
              <Avatar size={40} color="cyan.4">
                {username.slice(0, 1).toUpperCase()}
              </Avatar>
              <div>
                <Text>{username}</Text>
                <Text size="xs" color="dimmed">
                  {email}
                </Text>
              </div>
            </Group>
            <Button
              fullWidth
              mt="md"
              mb="md"
              variant="light"
              onClick={() => goToProfile(userId)}
            >
              Profile
            </Button>

            <Button color="red" fullWidth variant="light" onClick={logout}>
              Logout
            </Button>
          </Menu>
        ) : (
          <Group position="center" grow pb="xl" px="md">
            <Button
              component="a"
              variant="default"
              onClick={() => pathRedirect('login')}
            >
              Log in
            </Button>
            <Button
              component="a"
              color="cyan.4"
              onClick={() => pathRedirect('signup')}
            >
              Sign up
            </Button>
          </Group>
        )}
      </Drawer>
    </Box>
  );
}
