import {
  Header,
  Title,
  Group,
  Button,
  Box,
  Burger,
  Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useStyles from './styles';
import { TOKEN } from '@/utils/constants';
import { useEffect, useState } from 'react';

export default function AppHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem(TOKEN));
  }, []);

  return (
    <Box pb={120}>
      <Header height={80} p="md">
        <Group position="apart">
          <Title order={1}>Blog App</Title>
          {!isAuthenticated && (
            <>
              <Group className={classes.hiddenMobile}>
                <Button component="a" variant="default" href="/login">
                  Log in
                </Button>
                <Button component="a" href="/sign-up">
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
