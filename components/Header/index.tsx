import {
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
  const { username, updateAuthStatus, isAuthenticated } = useAuth();
  const router = useRouter();

  const pathRedirect = (action: string): void => {
    const encodedPath = encodeURIComponent(router.asPath);
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

  const logout = () => {
    // TODO: invalidate token at server side also
    updateAuthStatus({ username: '', token: '' });
  };

  return (
    <Box pb={80}>
      <Header height={80} p="md">
        <Group position="apart">
          <Title order={1}>Blog App</Title>
          {isAuthenticated && (
            <Group>
              <Text>User: {username}</Text>
              <Button onClick={logout}>Logout</Button>
            </Group>
          )}
          {!isAuthenticated && (
            <>
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
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                className={classes.hiddenDesktop}
              />
            </>
          )}
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
        <Group position="center" grow pb="xl" px="md">
          <Button component="a" variant="default" href="/login">
            Log in
          </Button>
          <Button component="a" href="/sign-up">
            Sign up
          </Button>
        </Group>
      </Drawer>
    </Box>
  );
}
