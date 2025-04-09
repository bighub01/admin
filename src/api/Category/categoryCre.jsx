import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API URL
const API_URL = "https://nhom11t4sangca1.onrender.com/category";

// Async thunk để tạo danh mục mới
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryName, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, { categoryName }, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra");
    }
  }
);

// Lấy danh sách danh mục
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getAll`);
      return response.data.result;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra");
    }
  }
);

// Xóa danh mục
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      console.log("Gửi yêu cầu xóa danh mục ID:", id);
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      console.log("Phản hồi API:", response.data);
      return id;
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error.response?.data);
      return rejectWithValue(error.response?.data || "Không thể xóa danh mục");
    }
  }
);

// Cập nhật danh mục
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ idCategory, categoryName }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(`${API_URL}/update`, 
        { idCategory, categoryName }, 
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch(fetchCategories()); // Cập nhật danh sách sau khi sửa
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Không thể cập nhật danh mục");
    }
  }
);

// Tạo slice quản lý danh mục
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("fg" , action.payload)
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat.id !== action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      });
  },
});

export default categorySlice.reducer;
