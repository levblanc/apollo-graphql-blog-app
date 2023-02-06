import useStyles from './footer.styles';

const AppFooter = () => {
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
};
export default AppFooter;
