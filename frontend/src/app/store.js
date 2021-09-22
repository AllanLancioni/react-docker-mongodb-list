import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import customerReducer from './reducers/customerSlice';
import dashboardReducer from './reducers/dashboardSlice';
import bondsReducer from './reducers/bondsSlice';
import ordersReducer from './reducers/ordersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customer: customerReducer,
    dashboard: dashboardReducer,
    bonds: bondsReducer,
    orders: ordersReducer
  },
});

store.getState();
