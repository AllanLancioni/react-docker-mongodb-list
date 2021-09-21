import { DataGrid } from '@material-ui/data-grid';
import { Container, Card, FormControl, TextField, Button } from '@material-ui/core';
import PageTitle from '../../components/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBonds, updateSearch } from '../../app/reducers/bondsSlice';
const parseCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const columns = [
  { field: 'id', headerName: '#', width: 9 },
  { field: 'title', headerName: 'Título', width: 200 },
  { field: 'description', headerName: 'Descrição', flex: 1 },
  { field: 'price', headerName: 'Preço', width: 150, valueFormatter: x => parseCurrency.format(x.value)  },
];

export default function BondsList() {

  const bonds = useSelector(({ bonds }) => bonds)
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => dispatch(getBonds(bonds.search)), []);

  const handleSearchKeyDown = e => {
    if (e.key !== 'Enter')
      return;
    dispatch(getBonds(bonds.search));
  }

  return (
    <div>
      <PageTitle>Títulos</PageTitle>

      <Container maxWidth="md">
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
          <FormControl fullWidth style={{ marginRight: '1rem' }}>
            <TextField
              label="Buscar títulos..."
              value={bonds.search}
              onKeyDown={e => handleSearchKeyDown(e)}
              onChange={e => dispatch(updateSearch(e.target.value))}
            />
          </FormControl>
          <Button variant="text" onClick={e => dispatch(getBonds(bonds.search))}>
            Buscar
          </Button>
        </div>
        <Card>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={bonds.data}
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