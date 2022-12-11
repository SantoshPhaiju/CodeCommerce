import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async() =>{
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_HOST}/api/getproducts`
    );
    return response.data.products;
})

const initialState = {
    products: [],
    status: "idle",
    error: null
}


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers(builder){
        builder
          .addCase(fetchProducts.pending, (state, action) => {
            state.status = "loading";
            state.products = [];
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "succeded";
            state.products = action.payload;
            // console.log(action.payload);
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            // console.log(action);
          });
    }
})


export default productSlice.reducer;