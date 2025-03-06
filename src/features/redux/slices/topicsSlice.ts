import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from '../api/axiosInstance';

const API_BASE_URL = "http://localhost:8080/api";

// Типы для темы
interface Topic {
  id: string;
  name: string;
  version: number;
}

interface TopicWithDetails {
  topic: Topic;
  totalPopularity: number;
  minPrice: number;
  totalAnalyses: number;
}

// Типы для состояния
interface TopicsState {
  topics: TopicWithDetails[];
  loading: boolean;
  error: string | null;
  lastFetchedCityId: string | null; // Для предотвращения повторных запросов
}

// Начальное состояние
const initialState: TopicsState = {
  topics: [],
  loading: false,
  error: null,
  lastFetchedCityId: null,
};

// Асинхронный thunk
export const fetchTopTopics = createAsyncThunk<
  TopicWithDetails[], // Успешный ответ
  string, // Аргумент cityId
  { rejectValue: { message: string; status?: number } } // Ошибки
>("topics/fetchTopTopics", async (cityId, { rejectWithValue, getState }) => {
  const state = getState() as { topics: TopicsState };
  if (state.topics.lastFetchedCityId === cityId) {
    // Пропускаем запрос, если данные уже загружены
    return [];
  }

  try {
    const response = await axiosInstance.get(`/api/topic/top/${cityId}`);
    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message || "Unknown error";
    return rejectWithValue({ message, status });
  }
});

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    resetTopics(state) {
      state.topics = [];
      state.loading = false;
      state.error = null;
      state.lastFetchedCityId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopTopics.fulfilled, (state, action: PayloadAction<TopicWithDetails[]>) => {
        state.loading = false;
        if (action.payload.length > 0) {
          state.topics = action.payload;
        }
        // state.lastFetchedCityId = action.meta.arg; // Сохраняем ID города
      })
      .addCase(fetchTopTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "Ошибка загрузки данных";
      });
  },
});

// Экспорт действий для использования в компонентах
export const { resetTopics } = topicsSlice.actions;

export default topicsSlice.reducer;
