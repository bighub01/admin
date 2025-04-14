// src/redux/locationSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://nhom11t4sangca1.onrender.com";

// Thunk gọi API
export const fetchDistrictWard = createAsyncThunk(
  "location/fetchDistrictWard",
  async ({ province, district, ward }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/getDistrictWard?province=${province}&district=${district}&ward=${ward}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra khi gọi API");
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locationData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistrictWard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistrictWard.fulfilled, (state, action) => {
        state.loading = false;
        state.locationData = action.payload;
      })
      .addCase(fetchDistrictWard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;
