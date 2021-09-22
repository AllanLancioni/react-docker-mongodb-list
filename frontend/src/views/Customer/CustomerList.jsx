import { DataGrid } from '@material-ui/data-grid';
import { Container, Card, FormControl, TextField, Button, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, updateSearch, updateType } from '../../app/reducers/customerSlice';
import { useEffect } from 'react';
import { useLocation } from "react-router-dom";
const parseCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const columns = [
  { field: 'id', headerName: '#', width: 9 },
  { field: 'name', headerName: 'Nome Completo', width: 200 },
  { field: 'orders', headerName: 'Pedidos', width: 125 },
  { field: 'total', headerName: 'Total', width: 125, valueFormatter: x => parseCurrency.format(x.value) },
  { field: 'debt', headerName: 'Valor da Dívida', width: 125, valueFormatter: x => x.value ? parseCurrency.format(x.value) : '-' },
  // { field: 'isDefaulting', headerName: 'Inadimplente', width: 125, valueFormatter: x => x ? 'SIM' : 'NÃO' },
  { field: 'since', headerName: 'Desde', width: 200, valueFormatter: x => new Date(x.value).toLocaleString('pt-BR') },
  { field: 'email', headerName: 'Email', width: 250 },
];

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export default function CustomersList() {


  const query = useQueryParams();
  const customers = useSelector(({ customer }) => customer)
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.get('defaulting'))
      dispatch(updateType('DEFAULTING'));
    dispatch(getCustomers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchKeyDown = e => {
    if (e.key !== 'Enter')
      return;
    dispatch(getCustomers(customers.search, customers.customerType));
  };

  const clear = () => {
    dispatch(updateSearch(''));
    dispatch(getCustomers());
  }

  const changeType = type => {
    dispatch(updateType(type));   
    dispatch(getCustomers());
  }

  return (
    <div>
      <PageTitle>Clientes</PageTitle>

      <Container maxWidth="md">

        <Grid container spacing={2} style={{ marginBottom: '1rem' }}>
          <Grid item xs={12} md={9} style={{ display: 'flex' }}>
            <FormControl fullWidth style={{ marginRight: '1rem' }}>
              <TextField
                label="Buscar clientes..."
                value={customers.search}
                onKeyDown={e => handleSearchKeyDown(e)}
                onChange={e => dispatch(updateSearch(e.target.value))}
              />
            </FormControl>
            <Button variant="text" color="primary" style={{ margin: '0 .5rem' }}
              onClick={e => dispatch(getCustomers())}>
              Buscar
            </Button>
            <Button variant="text" color="secondary" disabled={ !customers.search } onClick={() => clear()}>
              Limpar
            </Button>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-standard-label">Tipo</InputLabel>
              <Select value={customers.customerType} onChange={e => changeType(e.target.value)} label="Age" >
                <MenuItem value="ALL">Todos</MenuItem>
                <MenuItem value="DEFAULTING">Inadimplentes</MenuItem>
                <MenuItem value="NOT_DEFAULTING">Não Inadimplentes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* <div style={{ marginBottom: '1rem', display: 'flex' }}>


        </div> */}
        <Card>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={customers.data}
              columns={columns}
              pageSize={5}
              disableColumnFilter
              disableColumnMenu
              disableColumnSelector
              disableSelectionOnClick
              isCellEditable={false}
              isRowSelectable={false}
            />
          </div>
        </Card>
      </Container>


    </div>
  )
}