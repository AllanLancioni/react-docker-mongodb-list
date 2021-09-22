import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { config } from '../../config/environment.dev';
import { STATUS } from '../../shared/const/promiseStatus';

const DEFAULTING_CUSTOMER = 'customer';

const initialState = {
  search: '',
  status: STATUS.idle,
  customerType: 'ALL',
  data: []
};

export const getCustomers = createAsyncThunk(
  `${DEFAULTING_CUSTOMER}/get`,
  async (payload, meta) => {
    console.log({ aaaa: meta.getState().customer })
    const { search, customerType } = meta.getState().customer;
    const { data } = await fetch(`${config.apiBase}/customers?type=${customerType}&search=${search}`).then(x => x.json());
    data.forEach((x, i) => x.id = i + 1);
    return data;
  }
);

export const counterSlice = createSlice({
  name: DEFAULTING_CUSTOMER,
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload;      
    },
    updateType: (state, action) => {
      console.log({ action })
      state.customerType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => void(state.status = STATUS.loading))
      .addCase(getCustomers.rejected, (state) => void(state.status = STATUS.fail))
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.status = STATUS.idle;
        state.data = action.payload;
      });
  },
})

export const { updateSearch, extraReducers, updateType } = counterSlice.actions

export default counterSlice.reducer
