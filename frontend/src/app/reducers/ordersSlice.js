import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { config } from '../../config/environment.dev';
import { STATUS } from '../../shared/const/promiseStatus';

const BONDS = 'bonds';

const initialState = {
  search: '',
  status: STATUS.idle,
  data: []
};

export const getOrders = createAsyncThunk(
  `${BONDS}/get`,
  async (search = '') => {
    const data = await fetch(`${config.apiBase}/orders?search=${search}`).then(x => x.json());
    data.forEach((x, i) => {
      x.id = i + 1;
      x.price = x.bond.price;
    });
    return data;
  }
);

export const counterSlice = createSlice({
  name: BONDS,
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload;      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => void(state.status = STATUS.loading))
      .addCase(getOrders.rejected, (state) => void(state.status = STATUS.fail))
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = STATUS.idle;
        state.data = action.payload;
      });
  },
})

export const { updateSearch, extraReducers  } = counterSlice.actions

export default counterSlice.reducer
