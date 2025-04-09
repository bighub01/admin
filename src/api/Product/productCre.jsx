import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Định nghĩa API base URL
const API_BASE_URL = "https://nhom11t4sangca1.onrender.com/product";

// ✅ API: Lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      return response.data.result; // Chỉ lấy danh sách sản phẩm
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Có lỗi xảy ra khi tải danh sách sản phẩm"
      );
    }
  }
);

// ✅ API: Tạo sản phẩm
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", newProduct.file); // file là ảnh
      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              idProduct : newProduct.idProduct,
              productName: newProduct.productName,
              price: newProduct.price,
              idCategory: newProduct.idCategory,
            }),
          ],
          { type: "application/json" }
        )
      );

      // Gửi formData mà KHÔNG thêm headers
      const response = await axios.post(`${API_BASE_URL}/create`, formData);

      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra");
    }
  }
);


// ✅ API: Xóa sản phẩm
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      return id; // Trả về ID để cập nhật Redux Store
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Có lỗi xảy ra khi xóa sản phẩm"
      );
    }
  }
);

// ✅ API: Cập nhật sản phẩm
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (newProduct, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", newProduct.file); // file là ảnh
      formData.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              productName: newProduct.productName,
              price: newProduct.price,
              idCategory: newProduct.idCategory,
            }),
          ],
          { type: "application/json" }
        )
      );

      // Gửi formData mà KHÔNG thêm headers
      const response = await axios.put(`${API_BASE_URL}/update`, formData);

      return response.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Create product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload); // Thêm sản phẩm vào danh sách mà không cần fetch lại
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ✅ Update product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload; // Cập nhật sản phẩm trong danh sách
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
