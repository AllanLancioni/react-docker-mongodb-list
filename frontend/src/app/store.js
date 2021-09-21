import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import defaultingCustomerReducer from './reducers/defaultingCustomer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    defaultingCustomer: defaultingCustomerReducer,
  },
});

store.getState();
