import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  footer: {
    padding: '30px 15px',
  },

  builder: {
    color: theme.colors.cyan[4],
    padding: '2px 3px',
    borderRadius: '2px',
    transition: 'all 0.5s ease',
    '&:hover': {
      backgroundColor: theme.colors.cyan[3],
      color: theme.colors.dark,
      zoom: 1.1,
    },
  },
}));
