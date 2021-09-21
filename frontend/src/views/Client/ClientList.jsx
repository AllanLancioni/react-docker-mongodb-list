import { DataGrid } from '@material-ui/data-grid';
import { Container, Card, FormControl, TextField, Button } from '@material-ui/core';
import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultingCustomers, updateSearch } from '../../app/reducers/defaultingCustomerSlice';
import { useEffect } from 'react';
const parseCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const columns = [
  { field: 'id', headerName: '#', width: 9 },
  { field: 'name', headerName: 'Nome Completo', width: 200 },
  { field: 'debt', headerName: 'Valor', width: 150, valueFormatter: x => parseCurrency.format(x.value) },
  { field: 'since', headerName: 'Desde', width: 200, valueFormatter: x => new Date(x.value).toLocaleString('pt-BR') },
  { field: 'email', headerName: 'Email', width: 250 },
];

export default function ClientsList() {

  const customers = useSelector(({ defaultingCustomer }) => defaultingCustomer)
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getDefaultingCustomers(customers.search)), []);

  const handleSearchKeyDown = e => {
    if (e.key !== 'Enter')
      return;
    dispatch(getDefaultingCustomers(customers.search));
  }

  return (
    <div>
      <PageTitle>Clientes</PageTitle>

      <Container maxWidth="md">
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
          <FormControl fullWidth style={{ marginRight: '1rem' }}>
            <TextField
              label="Buscar clientes..."
              value={customers.search}
              onKeyDown={e => handleSearchKeyDown(e)}
              onChange={e => dispatch(updateSearch(e.target.value))}
            />
          </FormControl>
          <Button variant="text" onClick={e => dispatch(getDefaultingCustomers(customers.search))}>
            Buscar
          </Button>
        </div>
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