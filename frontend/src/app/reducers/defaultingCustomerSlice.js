import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { config } from '../../config/environment.dev';
import { STATUS } from '../../shared/const/promiseStatus';

const DEFAULTING_CUSTOMER = 'defaultingCustomer';

const initialState = {
  search: '',
  status: STATUS.idle,
  columns: [],
  data: []
};


export const getDefaultingCustomers = createAsyncThunk(
  `${DEFAULTING_CUSTOMER}/get`,
  async (search = '') => {
    const { data } = await fetch(`${config.apiBase}/customers?defaulting=1&search=${search}`).then(x => x.json());
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDefaultingCustomers.pending, (state) => void(state.status = STATUS.loading))
      .addCase(getDefaultingCustomers.rejected, (state) => void(state.status = STATUS.fail))
      .addCase(getDefaultingCustomers.fulfilled, (state, action) => {
        console.log({ state, action });
        state.status = STATUS.idle;
        state.data = action.payload;
        // state.data = handlePayloadData(action.payload);
        // state.data = handlePayloadData(action.payload);
      });
  },
})

// Action creators are generated for each case reducer function
export const { updateSearch, extraReducers  } = counterSlice.actions

export default counterSlice.reducer
