// src/features/redux/slices/patientSlice.ts
import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';

export interface PatientData {
  id: string;
  iin: string;
  firstName: string;
  secondName: string;
  lastName?: string;
  birthDay: string;
  sex: string;         // "0" (мужчина) или "1" (женщина)
  email: string;
  phone: string;
  numDoc: string;
  // ... другие поля, если нужны
}

export interface PatientDataReg {
  iin: string;
  firstName: string;
  secondName: string;
  lastName?: string;
  birthDay: string;
  sex: string;         // "0" (мужчина) или "1" (женщина)
  email: string;
  phone: string;
  numDoc: string;
  // ... другие поля, если нужны
}

interface PatientState {
  loading: boolean;
  success: boolean;
  phone: string | null;
  iinExists: boolean | null;
  error: string | null;
  patientData: PatientData | null;
}

const initialState: PatientState = {
  loading: false,
  success: false,
  error: null,
  iinExists: null,
  phone: null,
  patientData: null,
};

export const fetchPatientInfoThunk = createAsyncThunk(
  'patient/fetchPatientInfo',
  async ( _,{ rejectWithValue }) => {
    try {
      // передаём iin в теле POST
      const response = await axiosInstance.post<PatientData>('/api/patient/iin');
      // response.data содержит всю информацию о пациенте
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при получении данных пациента');
    }
  }
);

// Thunk для создания пациента
export const createPatientThunk = createAsyncThunk(
  'patient/createPatient',
  async (payload: PatientDataReg, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/patient/save', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);

export const checkIinThunk = createAsyncThunk(
  'patient/checkIin',
  async (iin: string, { rejectWithValue }) => {
    try {
      // Передаём iin в теле запроса POST
      const response = await axiosInstance.post<boolean>('/api/patient/check/iin', { iin });
      // response.data - true/false
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Ошибка при проверке ИИН');
    }
  }
);

// 2) getPhoneThunk -> POST /api/patient/phone
export const getPhoneThunk = createAsyncThunk(
  'patient/getPhone',
  async (iin: string, { rejectWithValue }) => {
    try {
      // Тоже передаём iin в body
      const response = await axiosInstance.post<{ phone: string }>('/api/patient/phone', { iin });
      return response.data.phone;
    } catch (error: any) {
      return rejectWithValue('Ошибка при получении телефона');
    }
  }
);

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    resetPatientState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.iinExists = null;
      state.phone = null;
      state.patientData = null;
    },
    setPhoneTemporary(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPatientThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createPatientThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createPatientThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });

      builder
      .addCase(checkIinThunk.pending, (state) => {
        state.loading = true;
        state.iinExists = null;
        state.error = null;
      })
      .addCase(checkIinThunk.fulfilled, (state, action: PayloadAction<boolean>) => {
        state.loading = false;
        state.iinExists = action.payload;
      })
      .addCase(checkIinThunk.rejected, (state, action) => {
        state.loading = false;
        state.iinExists = null;
        state.error = action.payload as string;
      });

      builder
      .addCase(getPhoneThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPhoneThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.phone = action.payload; // сохраняем номер в стейте
      })
      .addCase(getPhoneThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      builder
      .addCase(fetchPatientInfoThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        // Можно обнулить patientData, если хотим
        // state.patientData = null;
      })
      .addCase(fetchPatientInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // сохраняем данные пациента
        state.patientData = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchPatientInfoThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetPatientState, setPhoneTemporary } = patientSlice.actions;
export default patientSlice.reducer;