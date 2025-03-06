// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from "./slices/topicsSlice";
import authReducer from "./slices/authSlice";
import patientReducer from './slices/patientSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    topics: topicsReducer,
    auth: authReducer,
    patient: patientReducer,
    order: orderReducer
  },
});

// Типы для хуков
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
//В точке входа (например, main.tsx или index.tsx) обязательно оборачиваем <Provider store={store}>.