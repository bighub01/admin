import { configureStore } from "@reduxjs/toolkit";
import productReducer from "/src/api/product/productCre"; 
import categoryReducer from "/src/api/Category/categoryCre";
import orderReducer from "/src/api/order/order";
import provincesReducer from "/src/api/provinces/provinces"; // đúng reducer

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    order: orderReducer,
    provinces: provincesReducer, 
  },
});

export default store;
