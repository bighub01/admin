import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://nhom11t4sangca1dotnet.onrender.com/api/GHN";

// Async thunk để gọi API
export const calculate = createAsyncThunk(
  "calculate/calculate-fee",
  async (calcu, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/calculate-fee`,
        calcu, // ✅ Gửi trực tiếp object
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra");
    }
  }
);


// Khởi tạo state
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Slice
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculate.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(calculate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export reducer
export default orderSlice.reducer;
