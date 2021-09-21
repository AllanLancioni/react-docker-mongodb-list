import { DataGrid } from '@material-ui/data-grid';
import { Container, Card, FormControl, TextField, Button } from '@material-ui/core';
import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getDefaultingCustomers, updateSearch } from '../../app/reducers/defaultingCustomer';
import { useEffect } from 'react';

const columns = [
  { field: 'id', headerName: '#', width: 90 },
  {
    field: 'name',
    headerName: 'Nome Completo',
    width: 250,
    editable: true,
  },
  {
    field: 'value',
    headerName: 'Valor',
    width: 150,
    editable: true,
  },
  {
    field: 'since',
    headerName: 'Desde',
    width: 200,
    editable: true,
  },
];

export default function Clients() {

  const customers = useSelector(({ defaultingCustomer }) => defaultingCustomer)
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getDefaultingCustomers(customers)), []);
  
  const handleSearchKeyDown = e => {
    if (e.key !== 'Enter')
      return;
    dispatch(getDefaultingCustomers(customers));
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
          <Button variant="text" onClick={e =>  dispatch(getDefaultingCustomers(customers))}>
            Buscar
          </Button>
        </div>
        <Card>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={customers.data}
              columns={columns}
              pageSize={5}
            />
          </div>
        </Card>
      </Container>


    </div>
  )
}