import { Container, Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  pageTitle: {
    margin: '1rem 0',
    borderBottom: '2px solid blue' //+ theme.palette.primary
  }
}));

export default function PageTitle({ children }) {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" className={ classes.pageTitle }>
        { children }
      </Typography>
    </Container>
  )           
}