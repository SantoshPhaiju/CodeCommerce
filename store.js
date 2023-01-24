import { configureStore } from "@reduxjs/toolkit";
import productReducer from './pages/slices/productSlice'
import userReducer from './pages/slices/userSlice'
import orderReducer from './pages/slices/orderSlice'
import categoryReducer from './pages/slices/categorySlice'
import variantsReducer from './pages/slices/categorySlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer,
        category: categoryReducer,
        variants: variantsReducer
    },
})