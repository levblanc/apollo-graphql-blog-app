import useStyles from './footer.styles';

export default function AppFooter() {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <span>Built by </span>
      <a
        className={classes.builder}
        href="https://github.com/levblanc"
        target="_blank"
        rel="noreferrer"
      >
        @levblanc
      </a>
    </footer>
  );
}
