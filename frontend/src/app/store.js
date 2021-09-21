import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import defaultingCustomerReducer from './reducers/defaultingCustomerSlice';
import dashboardReducer from './reducers/dashboardSlice';
import bondsReducer from './reducers/bondsSlice';
import ordersReducer from './reducers/ordersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    defaultingCustomer: defaultingCustomerReducer,
    dashboard: dashboardReducer,
    bonds: bondsReducer,
    orders: ordersReducer
  },
});

store.getState();
