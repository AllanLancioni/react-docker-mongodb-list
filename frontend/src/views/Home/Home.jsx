import { Box, Paper, Container } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";

export default function Home() {
  return (
    <section>
      <PageTitle>Dashboard</PageTitle>

      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128,
            },
            justifyContent: 'space-between'
          }}
        >
          <Paper elevation={0} />
          <Paper />
          <Paper elevation={3} />
        </Box>
      </Container>

    </section>
  )
}