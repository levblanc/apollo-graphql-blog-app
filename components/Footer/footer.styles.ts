import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  footer: {
    padding: '15px',
    textAlign: 'center',
  },

  builder: {
    color: 'cyan',
    padding: '2px 3px',
    borderRadius: '2px',
    transition: 'all 0.5s ease',
    '&:hover': {
      backgroundColor: 'cyan',
      color: 'indigo',
      zoom: 1.1,
    },
  },
}));
