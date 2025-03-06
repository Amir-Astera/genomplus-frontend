import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from "./slices/topicsSlice";
import authReducer from "./slices/authSlice";
import patientReducer from './slices/patientSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    topics: topicsReducer,
    auth: authReducer,
    patient: patientReducer,
    order: orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;