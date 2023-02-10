import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    margin: '20px 0',
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: theme.shadows.md,
    },
  },
}));

export default useStyles;
