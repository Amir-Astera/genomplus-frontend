// src/features/redux/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface AuthState {
  idNumber: string | null;   // ИИН / идентификатор
  phoneNumber: string | null;
  isAuth: boolean;
  userInfo: { email: string } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  // Мы не храним token (так как используем HTTP-only cookie),
  // но если хотите - можете добавить
}

const initialState: AuthState = {
  idNumber: null,
  phoneNumber: null,
  isAuth: false,
  userInfo: null,
  status: "idle",
  error: null,
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/me", { withCredentials: true });
      console.log(response.data);
      
      return response.data; // Ожидаем: { нужно uid: string, но сейчас email возвращается }
    } catch (error: any) {
      return rejectWithValue("Unauthorized");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIdNumber(state, action: PayloadAction<string>) {
      state.idNumber = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    clearAuth(state) {
      state.idNumber = null;
      state.phoneNumber = null;
      state.isAuth = false;
      state.userInfo = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<{ email: string }>) => {
        state.status = "succeeded";
        state.isAuth = true;
        console.log("my tut")
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.isAuth = false;
        state.userInfo = null;
        console.log("zdes tozhe byli")
        state.error = action.payload as string;
      });
  },
});2

export const { setIdNumber, setPhoneNumber, clearAuth } = authSlice.actions;
export default authSlice.reducer;
