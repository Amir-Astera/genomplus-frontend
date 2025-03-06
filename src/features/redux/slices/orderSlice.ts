import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';
import { GetAllDto, GetAllOrdersDto, Order } from '../../../components/orders/orderTypes';

interface OrderState {
  ordersData: GetAllDto | null;
  processingOrdersData: GetAllDto | null;
  orderAnalyses: GetOrderAnalysesDto | null;
  orderAnalysesWithResult: GetOrderAnalysesResultDto | null;
  loadingAnalyses: boolean;
  errorAnalyses: string | null;
  loading: boolean;
  error: string | null;
  resultsPdf: {
    fileUrl: string;
    fileName: string;
  } | null;
  loadingPdf: boolean;
  errorPdf: string | null;
}

const initialState: OrderState = {
  ordersData: null,
  processingOrdersData: null,
  orderAnalyses: null,
  orderAnalysesWithResult: null,
  loadingAnalyses: false,
  errorAnalyses: null,
  loading: false,
  error: null,
  resultsPdf: null,
  loadingPdf: false,
  errorPdf: null
};

export interface Analysis {
  id: string;
  code: string;
  name: string;
  material: string;
  materialKeyId: string;
  materialId: string;
  deadline: string;
  price: number;
  description: string;
  version?: number;
}

export interface Results {
  id: string;
  orderAnalysis: OrderAnalyses;
  srvDepId: string;
  unit: string;
  norm: string;
  text: string;
  value?: string;
  resultNote?: string;
  normNote?: string;
  countResults: number;
  version?: number;
  updatedAt?: string;
  createdAt: string;
}

export interface OrderAnalyses {
  id: string;
  order: Order;
  analysis: Analysis;
  ids?: string;
  price: number;
  status: OrderAnalysisStatus;
  version?: number;
  createdAt: string;
  updatedAt: string;
}

export enum OrderAnalysisStatus {
  ORDERED = 'ORDERED',
  PENDING = 'PENDING',
  PARTLY = 'PARTLY',
  DONE = 'DONE',
  CANCELED = 'CANCELED'
}

export interface GetAllOrderAnalysesDto {
  orderId: string;
  page: number;
  size: number;
}

export interface GetOrderAnalysesDto {
  content: Analysis[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface GetOrderAnalysesResultDto {
  content: Record<string, Results>; // Используем Record, т.к. в TypeScript нельзя Map<Analysis, Results>
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export const fetchOrderResultsPdfThunk = createAsyncThunk(
  'orders/fetchOrderResultsPdf',
  async ({ orderId, internalId }: { orderId: string; internalId: string }, { rejectWithValue }) => {
    try {
      // Просто формируем URL для доступа к PDF на сервере
      const baseUrl = axiosInstance.defaults.baseURL || '';
      const fileUrl = `${baseUrl}/api/files/PDF/${orderId}-${internalId}.pdf`;
      
      return {
        fileUrl,
        fileName: `результаты-${internalId}.pdf`
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка при подготовке URL PDF результатов'
      );
    }
  }
);

// export const fetchOrderResultsPdfThunk = createAsyncThunk(
//   'orders/fetchOrderResultsPdf',
//   async ({ orderId, internalId }: { orderId: string; internalId: string }, { rejectWithValue }) => {
//     try {
//       // Формируем URL с параметрами
//       const response = await axiosInstance({
//         url: `/api/files/PDF/${orderId}-${internalId}.pdf`,
//         method: 'GET',
//         responseType: 'blob', // Важно указать responseType 'blob' для получения бинарных данных
//       });
      
//       // Создаем ссылку на полученный файл, но НЕ сохраняем blob в состоянии Redux
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const fileUrl = URL.createObjectURL(blob);
      
//       // Возвращаем только URL и имя файла, без blob объекта
//       return {
//         fileUrl,
//         fileName: `результаты-${internalId}.pdf`
//       };
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || 'Ошибка при получении PDF результатов'
//       );
//     }
//   }
// );


export const fetchOrderAnalysesThunk = createAsyncThunk(
  'orders/fetchOrderAnalyses',
  async (payload: GetAllOrderAnalysesDto, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<GetOrderAnalysesDto>(
        '/api/orders/orderAnalyses',
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка при получении анализов заказа'
      );
    }
  }
);

export const fetchOrderAnalysesWithResultThunk = createAsyncThunk(
  'orders/fetchOrderAnalysesWithResult',
  async (payload: GetAllOrderAnalysesDto, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<GetOrderAnalysesResultDto>(
        '/api/orders/orderAnalysesWithResult',
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Ошибка при получении анализов с результатами'
      );
    }
  }
);

// Thunk для завершенных заказов (результаты)
export const fetchCompletedOrdersThunk = createAsyncThunk(
  'orders/fetchCompletedOrders',
  async (payload: GetAllOrdersDto, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<GetAllDto>('/api/orders/completed', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при получении результатов заказов');
    }
  }
);

// Thunk для текущих заказов (в обработке)
export const fetchProcessingOrdersThunk = createAsyncThunk(
  'orders/fetchProcessingOrders',
  async (payload: GetAllOrdersDto, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<GetAllDto>('/api/orders/processing', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при получении текущих заказов');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.ordersData = null;
      state.processingOrdersData = null;
      state.loading = false;
      state.error = null;
      state.orderAnalyses = null;
      state.orderAnalysesWithResult = null;
      state.loadingAnalyses = false;
      state.errorAnalyses = null;
    },
    clearOrderResultsPdf(state) {
      state.resultsPdf = null;
      state.loadingPdf = false;
      state.errorPdf = null;
    }
  },
  extraReducers: (builder) => {
    // Обработчики для завершенных заказов
    builder
      .addCase(fetchCompletedOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedOrdersThunk.fulfilled, (state, action: PayloadAction<GetAllDto>) => {
        state.loading = false;
        state.ordersData = action.payload;
        state.error = null;
      })
      .addCase(fetchCompletedOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Обработчики для текущих заказов
    builder
      .addCase(fetchProcessingOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProcessingOrdersThunk.fulfilled, (state, action: PayloadAction<GetAllDto>) => {
        state.loading = false;
        state.processingOrdersData = action.payload;
        state.error = null;
      })
      .addCase(fetchProcessingOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

      builder
      .addCase(fetchOrderAnalysesThunk.pending, (state) => {
        state.loadingAnalyses = true;
        state.errorAnalyses = null;
      })
      .addCase(fetchOrderAnalysesThunk.fulfilled, (state, action: PayloadAction<GetOrderAnalysesDto>) => {
        state.loadingAnalyses = false;
        state.orderAnalyses = action.payload;
      })
      .addCase(fetchOrderAnalysesThunk.rejected, (state, action) => {
        state.loadingAnalyses = false;
        state.errorAnalyses = action.payload as string;
      });

    // Обработчики для fetchOrderAnalysesWithResultThunk
    builder
      .addCase(fetchOrderAnalysesWithResultThunk.pending, (state) => {
        state.loadingAnalyses = true;
        state.errorAnalyses = null;
      })
      .addCase(fetchOrderAnalysesWithResultThunk.fulfilled, (state, action: PayloadAction<GetOrderAnalysesResultDto>) => {
        state.loadingAnalyses = false;
        state.orderAnalysesWithResult = action.payload;
      })
      .addCase(fetchOrderAnalysesWithResultThunk.rejected, (state, action) => {
        state.loadingAnalyses = false;
        state.errorAnalyses = action.payload as string;
      });

      builder
      .addCase(fetchOrderResultsPdfThunk.pending, (state) => {
        state.loadingPdf = true;
        state.errorPdf = null;
      })
      .addCase(fetchOrderResultsPdfThunk.fulfilled, (state, action) => {
        state.loadingPdf = false;
        state.resultsPdf = action.payload;
      })
      .addCase(fetchOrderResultsPdfThunk.rejected, (state, action) => {
        state.loadingPdf = false;
        state.errorPdf = action.payload as string;
      });
  },
});

export const { resetOrderState, clearOrderResultsPdf } = orderSlice.actions;
export default orderSlice.reducer;