import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const DEFAULTING_CUSTOMER = 'defaultingCustomer';
const STATUS = {
  idle: 'idle',
  loading: 'loading',
  fail: 'fail',
}

const initialState = {
  search: '',
  status: STATUS.idle,
  columns: [],
  data: []
};

export const getDefaultingCustomers = createAsyncThunk(
  `${DEFAULTING_CUSTOMER}/get`,
  async (customerState) => {
    console.log('search...', customerState);
    const data = [
      { id: 1, name: 'Allan', value: 1800, since: (new Date()).toJSON() },
      { id: 2, name: 'Fafsdfaf', value: 21800, since: (new Date()).toJSON() },
      { id: 3, name: 'Qadfasf', value: 158020, since: (new Date()).toJSON() },
      { id: 4, name: 'Lorem', value: 18050, since: (new Date()).toJSON() },
      { id: 5, name: 'Inpus', value: 1500, since: (new Date()).toJSON() },
      { id: 6, name: 'Lararara', value: 1800, since: (new Date()).toJSON() },
    ];
    data.forEach(x => {
      x.value = ''
    })
    return {...customerState, data};
  }
);

function handlePayloadData(customerState) {
  const data = customerState.data.map(x => ({...x}));
  return data
    .filter(x => x.name.toLowerCase().includes(customerState.search.toLowerCase()))
}

export const counterSlice = createSlice({
  name: DEFAULTING_CUSTOMER,
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      console.log({ state, action });
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
        state.data = handlePayloadData(action.payload);
      });
  },
})

// Action creators are generated for each case reducer function
export const { updateSearch, extraReducers  } = counterSlice.actions

export default counterSlice.reducer
