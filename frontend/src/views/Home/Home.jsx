import { Paper, Container, Grid, styled, CircularProgress, Box } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../app/reducers/dashboardSlice";
import PageTitle from "../../components/PageTitle";
import { STATUS } from "../../shared/const/promiseStatus";
import { ErrorOutlined as ErrorOutlinedIcon } from '@material-ui/icons'
import { useHistory } from "react-router";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer'
}));

const CardTitle = styled('h4')(() => ({
  letterSpacing: '2px',
  opacity: '.75',
  textTransform: 'uppercase',
  fontSize: '.9rem',
}));

const CardInfo = styled('h2')(() => ({
  fontSize: '2.5rem',
  fontWeight: 200,
  color: '#333',
  margin: '1rem 0 1.5rem'
}));

function getCardInfo(data, status) {
  if (status === STATUS.loading)
    return <Box sx={{ display: 'flex', fontSize: '3rem', margin: '1.9rem 0', justifyContent: 'center' }}><CircularProgress /></Box>
  return <CardInfo>{ data }</CardInfo>
}

export default function Home() {
  const dashboard = useSelector(({ dashboard }) => dashboard)
  const dispatch = useDispatch();
  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getDashboard()), []);

  const navigate = (pathname, search) => _ => history.push({ pathname, search });

  return (
    <section>
      <PageTitle>Dashboard</PageTitle>

      <Container maxWidth="md">

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Item onClick={ navigate('customers') }>
              <CardTitle >Clientes</CardTitle>
              { getCardInfo(dashboard.data.customers, dashboard.status) }
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item onClick={ navigate('orders') }>
              <CardTitle >Pedidos</CardTitle>
              { getCardInfo(dashboard.data.orders, dashboard.status) }
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item onClick={ navigate('bonds') }>
              <CardTitle >Títulos</CardTitle>
              { getCardInfo(dashboard.data.bonds, dashboard.status) }
            </Item>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Item onClick={ navigate('customers', '?defaulting=true') }>
              <CardTitle>
                Inadimplentes 
                <ErrorOutlinedIcon style={{ position: 'relative', margin: '-5px 0', color: '#EF5350' }}/>
              </CardTitle>
              { getCardInfo(dashboard.data.defaultingCustomers, dashboard.status) }
            </Item>
          </Grid>
        </Grid>

      </Container>

    </section>
  )
}