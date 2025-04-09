import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL = "https://provinces.open-api.vn/api/";

// AsyncThunk để lấy thông tin 1 tỉnh/thành theo ID (depth = 3)
export const fetchProvinces = createAsyncThunk(
  "provinces/fetchProvinces",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}p/${id}?depth=3`);
      return response.data; // Trả về dữ liệu tỉnh có chứa quận và phường
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi lấy dữ liệu");
    }
  }
);

export const fetchP = createAsyncThunk(
  "p/fetchP",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}p/search/?q=${id}`);
      return response.data; // Trả về dữ liệu thành phố
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi lấy dữ liệu");
    }
  }
);
// Slice
const provincesSlice = createSlice({
  name: "provinces",
  initialState: {
    province: null,
    districts: [],
    wards: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProvincesData: (state) => {
      state.province = null;
      state.districts = [];
      state.wards = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.loading = false;
        const { name, districts } = action.payload;
        state.province = name;
        state.districts = districts;
        state.wards = districts.flatMap((d) => d.wards || []);
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { clearProvincesData } = provincesSlice.actions;

// Export selector
export const selectProvinces = (state) => state.provinces;

// Export reducer
export default provincesSlice.reducer;
