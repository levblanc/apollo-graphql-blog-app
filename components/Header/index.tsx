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
import useStyles from './header.styles';

const AppHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Box pb={120}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Title order={1}>Blog App</Title>
          <Group className={classes.hiddenMobile}>
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>

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
        <Group position="center" grow pb="xl" px="md">
          <Button variant="default">Log in</Button>
          <Button>Sign up</Button>
        </Group>
      </Drawer>
    </Box>
  );
};

export default AppHeader;
