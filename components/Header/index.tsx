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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useStyles from './styles';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export default function AppHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();
  const { userId, username, email, clearAuthStatus, isAuthenticated } =
    useAuth();
  const router = useRouter();

  const pathRedirect = (action: string): void => {
    let encodedPath = encodeURIComponent(router.asPath);

    if (router.query.redirect) {
      const basePath = router.asPath.split('?')[0];
      encodedPath = encodeURIComponent(basePath);
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
    router.push('/login');
  };

  return (
    <Box pb={80}>
      <Header height={80} p="md">
        <Group position="apart">
          <Title order={1} onClick={() => router.push('/')}>
            Blog App
          </Title>

          {isAuthenticated ? (
            <Box className={classes.hiddenMobile}>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <Group>
                      <Avatar size={40} color="blue">
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
              <Button component="a" onClick={() => pathRedirect('signup')}>
                Sign up
              </Button>
            </Group>
          )}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
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
              <Avatar size={40} color="blue">
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
            <Button component="a" onClick={() => pathRedirect('signup')}>
              Sign up
            </Button>
          </Group>
        )}
      </Drawer>
    </Box>
  );
}
