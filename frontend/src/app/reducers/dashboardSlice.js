import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { STATUS } from '../../shared/const/promiseStatus.js';
import { config } from '../../config/environment.dev'

const DASHBOARD = 'dashboard';

const initialState = {
  status: STATUS.idle,
  data: []
};

export const getDashboard = createAsyncThunk(
  `${DASHBOARD}/get`,
  async () => {
    const data = await fetch(config.apiBase + '/dashboard').then(x => x.json());
    return data;
  }
);

export const counterSlice = createSlice({
  name: DASHBOARD,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getDashboard.pending, (state) => void(state.status = STATUS.loading))
      .addCase(getDashboard.rejected, (state) => void(state.status = STATUS.fail))
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.status = STATUS.idle;
        state.data = action.payload;
      });
  },
})

export const { updateSearch, extraReducers  } = counterSlice.actions

export default counterSlice.reducer
