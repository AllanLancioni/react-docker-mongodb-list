import { DataGrid } from '@material-ui/data-grid';
import { Container, Card, FormControl, TextField, Button } from '@material-ui/core';
import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOrders, updateSearch } from '../../app/reducers/ordersSlice';
const parseCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const columns = [
  { field: 'id', headerName: '#', width: 9 },
  { field: 'customer', headerName: 'Cliente', width: 200, valueFormatter: x => x.value?.name  },
  { field: 'bond', headerName: 'Título', flex: 1, valueFormatter: x => x.value?.title },
  { field: 'price', headerName: 'Preço', width: 100, valueFormatter: x => parseCurrency.format(x.value || 0)  },
  { field: 'boughtAt', headerName: 'Comprado em', width: 175, valueFormatter: x => new Date(x.value).toLocaleString('pt-BR')  },
  { field: 'paidAt', headerName: 'Pago em', width: 175, valueFormatter: x => x.value ? new Date(x.value).toLocaleString('pt-BR') : '-' },
];

export default function OrdersList() {

  const orders = useSelector(({ orders }) => orders)
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getOrders(orders.search)), []);

  return (
    <div>
      <PageTitle>Pedidos</PageTitle>

      <Container maxWidth="md">
        <Card>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={orders.data}
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